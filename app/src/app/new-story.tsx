import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Sparkle } from '@/components/brand/sparkle';
import { Button } from '@/components/ui/button';
import { Option } from '@/components/ui/choice';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { ROADMAP } from '@/content/roadmap';
import { buildRoadmap } from '@/domain/roadmap';
import { GENRE_IDS, GENRES, LENGTHS, STAGE_BY_ID } from '@/domain/stages';
import type { Feeling, Genre, Length, Spark } from '@/domain/types';
import { haptics } from '@/lib/haptics';
import { useAppStore } from '@/store/app-store';
import { genreColors } from '@/theme/colors';
import { hairline, radius, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

/** How the roadmap summary describes the ending the writer chose. */
const ENDINGS: Record<Feeling, string> = {
  brave: 'that ends on something brave',
  laughing: 'that ends with a laugh',
  surprised: 'with an ending nobody sees coming',
  warm: 'that ends somewhere warm',
};

type Step = 'genre' | 'spark' | 'feeling' | 'length' | 'drawing' | 'roadmap';
const QUESTIONS: Step[] = ['genre', 'spark', 'feeling', 'length'];

function isGenre(value: unknown): value is Genre {
  return typeof value === 'string' && value in GENRES;
}

export default function NewStoryScreen() {
  const params = useLocalSearchParams<{ genre?: string; whatIf?: string }>();
  const presetGenre = isGenre(params.genre) ? params.genre : null;
  const whatIf = typeof params.whatIf === 'string' ? params.whatIf : undefined;

  const [step, setStep] = useState<Step>(presetGenre ? 'spark' : 'genre');
  const [genre, setGenre] = useState<Genre | null>(presetGenre);
  const [spark, setSpark] = useState<Spark | null>(whatIf ? 'what-if' : null);
  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [length, setLength] = useState<Length | null>(null);

  // Answers advance on their own after a beat, so the tap registers before the page turns.
  const answer = <T,>(set: (value: T) => void, value: T, next: Step) => {
    set(value);
    setTimeout(() => setStep(next), 220);
  };

  const back = () => {
    const index = QUESTIONS.indexOf(step);
    if (step === 'roadmap') setStep('length');
    else if (index > 0) setStep(QUESTIONS[index - 1]);
    else router.back();
  };

  useEffect(() => {
    if (step !== 'drawing') return;
    const timer = setTimeout(() => {
      haptics.success();
      setStep('roadmap');
    }, 1300);
    return () => clearTimeout(timer);
  }, [step]);

  if (step === 'roadmap' && genre && spark && feeling && length) {
    return <RoadmapReveal answers={{ genre, spark, feeling, length }} whatIf={whatIf} onBack={back} />;
  }

  if (step === 'drawing') {
    return (
      <Screen scroll={false}>
        <View style={styles.drawing}>
          <Animated.View entering={FadeIn.duration(400)} style={styles.drawingInner}>
            <Sparkle size={34} />
            <Text variant="title2" align="center">
              Drawing your map…
            </Text>
            <Text variant="callout" tone="muted" align="center">
              Nine stops, in the order that suits you.
            </Text>
          </Animated.View>
        </View>
      </Screen>
    );
  }

  const questionNumber = QUESTIONS.indexOf(step) + 1;

  return (
    <Screen
      header={
        <TopBar
          leading={step === 'genre' || (step === 'spark' && presetGenre) ? 'close' : 'back'}
          onLeadingPress={step === 'genre' || (step === 'spark' && presetGenre) ? () => router.back() : back}
          title={`${questionNumber} of ${QUESTIONS.length}`}
        />
      }>
      <Animated.View key={step} entering={FadeInDown.duration(350)} style={styles.question}>
        {step === 'genre' && (
          <>
            <Heading
              title="What kind of story?"
              detail="Pick the one that pulls at you. You can mix things up later."
            />
            {GENRE_IDS.map((id) => (
              <Option
                key={id}
                title={GENRES[id].name}
                detail={GENRES[id].line}
                selected={genre === id}
                onPress={() => answer(setGenre, id, 'spark')}
                media={
                  <View style={[styles.genreTile, { backgroundColor: genreColors[id].soft }]}>
                    <Ionicons
                      name={genreColors[id].icon as keyof typeof Ionicons.glyphMap}
                      size={26}
                      color={genreColors[id].fg}
                    />
                  </View>
                }
              />
            ))}
          </>
        )}

        {step === 'spark' && (
          <>
            <Heading
              title="What’s already in your head?"
              detail={whatIf ? `Today’s spark: “${whatIf}”` : 'Anything counts, even a feeling.'}
            />
            {(Object.keys(ROADMAP.spark) as Spark[]).map((id) => (
              <Option
                key={id}
                title={ROADMAP.spark[id].label}
                selected={spark === id}
                onPress={() => answer(setSpark, id, 'feeling')}
              />
            ))}
          </>
        )}

        {step === 'feeling' && (
          <>
            <Heading
              title="How should readers feel on the last page?"
              detail="Your ending will aim for this."
            />
            {(Object.keys(ROADMAP.feeling) as Feeling[]).map((id) => (
              <Option
                key={id}
                title={ROADMAP.feeling[id].label}
                selected={feeling === id}
                onPress={() => answer(setFeeling, id, 'length')}
              />
            ))}
          </>
        )}

        {step === 'length' && (
          <>
            <Heading title="How long should it be?" detail="A short story is a great first book." />
            {(Object.keys(LENGTHS) as Length[]).map((id) => (
              <Option
                key={id}
                title={LENGTHS[id].name}
                detail={LENGTHS[id].detail}
                selected={length === id}
                onPress={() => answer(setLength, id, 'drawing')}
              />
            ))}
          </>
        )}
      </Animated.View>
    </Screen>
  );
}

function Heading({ title, detail }: { title: string; detail: string }) {
  return (
    <View style={styles.heading}>
      <Text variant="title1" accessibilityRole="header">
        {title}
      </Text>
      <Text variant="body" tone="muted">
        {detail}
      </Text>
    </View>
  );
}

interface RoadmapRevealProps {
  answers: { genre: Genre; spark: Spark; feeling: Feeling; length: Length };
  whatIf?: string;
  onBack: () => void;
}

function RoadmapReveal({ answers, whatIf, onBack }: RoadmapRevealProps) {
  const { colors } = useTheme();
  const createStory = useAppStore((state) => state.createStory);
  const [title, setTitle] = useState('');
  const roadmap = buildRoadmap(answers);
  const start = roadmap.order[0];
  const kind = answers.length === 'short' ? 'short story' : 'chapter book';
  const summary = `A ${GENRES[answers.genre].name.toLowerCase()} ${kind} ${ENDINGS[answers.feeling]}.`;

  const begin = () => {
    const id = createStory({ ...answers, title, whatIf });
    router.dismiss();
    router.push({ pathname: '/story/[id]', params: { id } });
    router.push({ pathname: '/story/[id]/[stage]', params: { id, stage: start } });
  };

  return (
    <Screen
      header={<TopBar onLeadingPress={onBack} title="Your roadmap" />}
      footer={<Button label={`Start with ${STAGE_BY_ID[start].name}`} onPress={begin} block />}>
      <Animated.View entering={FadeIn.duration(400)} style={styles.heading}>
        <Text variant="title1">{summary}</Text>
        <Text variant="prompt" tone="muted">
          {ROADMAP.spark[answers.spark].startLine}
        </Text>
      </Animated.View>

      <View style={styles.stops}>
        {roadmap.order.map((stage, i) => {
          const first = i === 0;
          return (
            <Animated.View
              key={stage}
              entering={FadeInDown.duration(380).delay(120 + i * 70)}
              style={[
                styles.stop,
                { borderColor: first ? colors.primary : colors.border, backgroundColor: colors.surface },
              ]}>
              <View style={styles.stopHead}>
                <View
                  style={[
                    styles.stopNumber,
                    first
                      ? { backgroundColor: colors.accent }
                      : { borderColor: colors.border, borderWidth: hairline * 2 },
                  ]}>
                  <Text variant="footnote" style={{ color: first ? colors.accentOn : colors.inkMuted }}>
                    {i + 1}
                  </Text>
                </View>
                <Text variant="headline" style={styles.stopName}>
                  {STAGE_BY_ID[stage].name}
                </Text>
                {first && (
                  <Text variant="overline" tone="accent">
                    Start here
                  </Text>
                )}
              </View>
              <Text variant="callout" tone={first ? 'ink' : 'muted'}>
                {roadmap.prompts[stage]}
              </Text>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.titleField}>
        <Field
          label="Working title"
          hint="Optional. Most writers change theirs at least once."
          value={title}
          onChangeText={setTitle}
          placeholder="Untitled story"
          story
          maxLength={80}
          autoCapitalize="words"
          returnKeyType="done"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  question: { gap: space.sm, paddingTop: space.xs },
  heading: { gap: space.xs, marginBottom: space.md },
  genreTile: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawing: { flex: 1, justifyContent: 'center' },
  drawingInner: { alignItems: 'center', gap: space.sm },
  stops: { gap: space.sm, marginTop: space.md },
  stop: { borderWidth: hairline * 2, borderRadius: radius.lg, padding: space.md, gap: space.xs },
  stopHead: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  stopNumber: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  stopName: { flex: 1 },
  titleField: { marginTop: space.xxl },
});
