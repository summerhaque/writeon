import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Missing } from '@/components/ui/missing';
import { Screen } from '@/components/ui/screen';
import { Section, Surface } from '@/components/ui/surface';
import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { goBackOr, TopBar } from '@/components/ui/top-bar';
import {
  checkRewrite,
  isLessonId,
  LESSON_BY_ID,
  ownSentences,
  replaceSentence,
  type OwnSentence,
  type Verdict,
} from '@/domain/lessons';
import { displayTitle } from '@/domain/story';
import type { Lesson } from '@/domain/types';
import { haptics } from '@/lib/haptics';
import { useAppStore } from '@/store/app-store';
import { useStories } from '@/store/selectors';
import { space } from '@/theme/layout';

type Step = 'learn' | 'pick' | 'rewrite' | 'compare';

/** A sentence to practice on: one of the writer's own, or a practice line. */
type Picked = { text: string; source: OwnSentence | null };

export default function LessonScreen() {
  const { id, storyId } = useLocalSearchParams<{ id: string; storyId?: string }>();
  if (!isLessonId(id)) return <Missing what="lesson" />;
  return <LessonFlow lesson={LESSON_BY_ID[id]} storyId={storyId} />;
}

function pickLine(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)];
}

function LessonFlow({ lesson, storyId }: { lesson: Lesson; storyId?: string }) {
  const stories = useStories();
  const updateStory = useAppStore((state) => state.updateStory);
  const completeLesson = useAppStore((state) => state.completeLesson);
  const [step, setStep] = useState<Step>('learn');
  const [picked, setPicked] = useState<Picked | null>(null);
  const [rewrite, setRewrite] = useState('');
  const [verdict, setVerdict] = useState<{ result: Verdict; line: string } | null>(null);

  // The story the writer came from goes first.
  const sentences = useMemo(() => {
    const ordered = [...stories].sort((a, b) => Number(b.id === storyId) - Number(a.id === storyId));
    return ownSentences(ordered).slice(0, 24);
  }, [stories, storyId]);

  const choose = (sentence: Picked) => {
    setPicked(sentence);
    setRewrite(sentence.text);
    setStep('rewrite');
  };

  const check = () => {
    if (!picked) return;
    const result = checkRewrite(lesson.id, picked.text, rewrite);
    const line =
      result === 'pass'
        ? pickLine(lesson.feedback.pass)
        : result === 'unchanged'
          ? lesson.feedback.unchanged
          : pickLine(lesson.feedback.tryAgain);
    if (result === 'pass') {
      haptics.success();
      completeLesson(lesson.id);
    }
    setVerdict({ result, line });
    setStep('compare');
  };

  const saveToStory = () => {
    const source = picked?.source;
    const story = source && stories.find((s) => s.id === source.storyId);
    const updated = story && replaceSentence(story, source.chapterId, source.text, rewrite.trim());
    if (!story || !updated) {
      Alert.alert(
        'That sentence has changed',
        'It was edited since you picked it, so your story is untouched. Your rewrite is still here to copy.',
      );
      return;
    }
    updateStory(story.id, () => updated);
    haptics.tap();
    Alert.alert('Saved to your story', `Your new sentence is in “${displayTitle(story)}”.`, [
      { text: 'Done', onPress: () => goBackOr() },
    ]);
  };

  const back = () => {
    if (step === 'learn') goBackOr();
    else if (step === 'pick') setStep('learn');
    else if (step === 'rewrite') setStep('pick');
    else setStep('rewrite');
  };

  return (
    <Screen header={<TopBar onLeadingPress={back} title={lesson.title} />}>
      <Animated.View key={step} entering={FadeInDown.duration(320)} style={styles.step}>
        {step === 'learn' && (
          <>
            <View style={styles.head}>
              <Text variant="overline" tone="muted">
                Lesson · {lesson.minutes} min
              </Text>
              <Text variant="title1">{lesson.title}</Text>
              <Text variant="prompt">{lesson.tagline}</Text>
            </View>
            {lesson.explain.map((paragraph, i) => (
              <Text key={i} variant="body">
                {paragraph}
              </Text>
            ))}
            <Section label="See it work">
              {lesson.examples.map((example, i) => (
                <Surface key={i} style={styles.example}>
                  <BeforeAfter before={example.before} after={example.after} />
                  <Text variant="footnote" tone="muted">
                    {example.note}
                  </Text>
                </Surface>
              ))}
            </Section>
            <Button label="Try it on your writing" onPress={() => setStep('pick')} block style={styles.cta} />
          </>
        )}

        {step === 'pick' && (
          <>
            <View style={styles.head}>
              <Text variant="title1">Pick a sentence</Text>
              <Text variant="body" tone="muted">
                {sentences.length > 0
                  ? 'Choose one of yours. Plain ones work best: they have the most room to grow.'
                  : 'You haven’t written any chapters yet, so practice on one of these. Next time, use your own.'}
              </Text>
            </View>
            {sentences.length > 0
              ? sentences.map((sentence, i) => (
                  <SentenceCard
                    key={`${sentence.chapterId}-${i}`}
                    text={sentence.text}
                    from={displayTitle(stories.find((s) => s.id === sentence.storyId) ?? { title: '' })}
                    onPress={() => choose({ text: sentence.text, source: sentence })}
                  />
                ))
              : lesson.practiceSentences.map((text) => (
                  <SentenceCard key={text} text={text} onPress={() => choose({ text, source: null })} />
                ))}
            {sentences.length > 0 && (
              <Section label="Or practice on one of these">
                {lesson.practiceSentences.slice(0, 2).map((text) => (
                  <SentenceCard key={text} text={text} onPress={() => choose({ text, source: null })} />
                ))}
              </Section>
            )}
          </>
        )}

        {step === 'rewrite' && picked && (
          <>
            <View style={styles.head}>
              <Text variant="title1">Rewrite it</Text>
              <Text variant="body" tone="muted">
                {lesson.tryPrompt}
              </Text>
            </View>
            <Surface style={styles.original}>
              <Text variant="overline" tone="muted">
                Your sentence
              </Text>
              <Text variant="story">{picked.text}</Text>
            </Surface>
            <Field
              label="Your rewrite"
              hint={lesson.tip}
              value={rewrite}
              onChangeText={setRewrite}
              story
              lines={3}
              autoFocus
              maxLength={400}
            />
            <Button
              label="Check it"
              onPress={check}
              disabled={rewrite.trim().length === 0}
              block
              style={styles.cta}
            />
          </>
        )}

        {step === 'compare' && picked && verdict && (
          <>
            <Animated.View entering={FadeIn.duration(400)} style={styles.head}>
              <Text variant="overline" tone={verdict.result === 'pass' ? 'success' : 'muted'}>
                {verdict.result === 'pass' ? 'Lesson finished' : 'Not quite yet'}
              </Text>
              <Text variant="title2">{verdict.line}</Text>
            </Animated.View>
            <Surface style={styles.example}>
              <BeforeAfter before={picked.text} after={rewrite.trim()} />
            </Surface>
            <View style={styles.actions}>
              {verdict.result !== 'pass' ? (
                <Button label="Try again" onPress={() => setStep('rewrite')} block />
              ) : picked.source ? (
                <>
                  <Button label="Put it in my story" onPress={saveToStory} block />
                  <Button
                    label="Keep my original"
                    variant="quiet"
                    onPress={() => goBackOr()}
                    style={styles.quiet}
                  />
                </>
              ) : (
                <>
                  <Button label="Done" onPress={() => goBackOr()} block />
                  <Button
                    label="Try another sentence"
                    variant="quiet"
                    onPress={() => setStep('pick')}
                    style={styles.quiet}
                  />
                </>
              )}
            </View>
          </>
        )}
      </Animated.View>
    </Screen>
  );
}

function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <View style={styles.pair}>
      <View style={styles.pairItem}>
        <Text variant="overline" tone="muted">
          Before
        </Text>
        <Text variant="story" tone="muted">
          {before}
        </Text>
      </View>
      <View style={styles.pairItem}>
        <Text variant="overline" tone="accent">
          After
        </Text>
        <Text variant="story">{after}</Text>
      </View>
    </View>
  );
}

function SentenceCard({ text, from, onPress }: { text: string; from?: string; onPress: () => void }) {
  return (
    <Tappable accessibilityLabel={`Use this sentence: ${text}`} onPress={onPress} pressScale={0.985}>
      <Surface style={styles.sentence}>
        <Text variant="story">{text}</Text>
        {from ? (
          <Text variant="footnote" tone="muted">
            From {from}
          </Text>
        ) : null}
      </Surface>
    </Tappable>
  );
}

const styles = StyleSheet.create({
  step: { gap: space.md },
  head: { gap: space.xs, marginBottom: space.xs },
  example: { gap: space.md },
  pair: { gap: space.md },
  pairItem: { gap: space.xxs },
  cta: { marginTop: space.lg },
  original: { gap: space.xxs },
  sentence: { gap: space.xxs },
  actions: { gap: space.sm, marginTop: space.md },
  quiet: { alignSelf: 'center' },
});
