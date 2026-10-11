import { router, useLocalSearchParams } from 'expo-router';
import { useRef, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type TextInput } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { CoachCard } from '@/components/coach/coach-card';
import { CharactersStage } from '@/components/stages/characters-stage';
import { IllustratingStage } from '@/components/stages/illustrating-stage';
import { PublishingStage } from '@/components/stages/publishing-stage';
import { RevisingStage } from '@/components/stages/revising-stage';
import { ConflictStage, IdeaStage, PlotStage, SettingStage } from '@/components/stages/simple-stages';
import type { StageProps } from '@/components/stages/stage-props';
import { WritingStage } from '@/components/stages/writing-stage';
import { Button } from '@/components/ui/button';
import { Missing } from '@/components/ui/missing';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { isStageId, STAGE_BY_ID } from '@/domain/stages';
import { displayTitle, stageStatus } from '@/domain/story';
import type { StageId, Story } from '@/domain/types';
import { haptics } from '@/lib/haptics';
import type { SaveState } from '@/lib/use-autosave';
import { useAppStore } from '@/store/app-store';
import { useStory } from '@/store/selectors';
import { useStoryDraft } from '@/store/use-story-draft';
import { space } from '@/theme/layout';

export default function StageScreen() {
  const { id, stage } = useLocalSearchParams<{ id: string; stage: string }>();
  const story = useStory(id);
  if (!story || !isStageId(stage)) return <Missing />;
  return <Workspace key={`${story.id}:${stage}`} story={story} stage={stage} />;
}

function Workspace({ story, stage }: { story: Story; stage: StageId }) {
  const { live, edit, flush, saveState } = useStoryDraft(story);
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(0);
  const meta = STAGE_BY_ID[stage];

  /** Bring a view to the top of the visible area, e.g. the editor when the keyboard opens. */
  const reveal = (view: View | TextInput | null) => {
    const scroll = scrollRef.current;
    if (!view || !scroll) return;
    view.measureInWindow((_x, viewY) => {
      (scroll as unknown as View).measureInWindow((_sx, scrollTop) => {
        scroll.scrollTo({ y: Math.max(0, scrollY.current + viewY - scrollTop - space.sm), animated: true });
      });
    });
  };

  const props: StageProps = { story: live, edit, flush };
  const body: Record<StageId, ReactNode> = {
    idea: <IdeaStage {...props} />,
    characters: <CharactersStage {...props} />,
    setting: <SettingStage {...props} />,
    conflict: <ConflictStage {...props} />,
    plot: <PlotStage {...props} />,
    writing: <WritingStage {...props} reveal={reveal} />,
    revising: <RevisingStage {...props} />,
    illustrating: <IllustratingStage {...props} />,
    publishing: <PublishingStage {...props} />,
  };

  return (
    <Screen
      scrollRef={scrollRef}
      scrollProps={{
        onScroll: (event) => {
          scrollY.current = event.nativeEvent.contentOffset.y;
        },
        scrollEventThrottle: 32,
      }}
      header={<TopBar title={displayTitle(live)} trailing={<SaveStatus state={saveState} />} />}>
      <View style={styles.head}>
        <Text variant="overline" tone="muted">
          Stage {meta.number} of 9
        </Text>
        <Text variant="title1" accessibilityRole="header">
          {meta.name}
        </Text>
        <Text variant="prompt" style={styles.prompt}>
          {story.roadmap.prompts[stage]}
        </Text>
      </View>

      <CoachCard story={live} stage={stage} onOpenChat={flush} />

      <View style={styles.body}>{body[stage]}</View>

      {stage !== 'publishing' && <DoneRow story={live} stage={stage} flush={flush} />}
    </Screen>
  );
}

function SaveStatus({ state }: { state: SaveState }) {
  if (state === 'idle') return null;
  return (
    <Animated.View key={state} entering={FadeIn.duration(200)} style={styles.save}>
      <Text variant="footnote" tone="faint">
        {state === 'pending' ? 'Saving…' : 'Saved'}
      </Text>
    </Animated.View>
  );
}

function DoneRow({ story, stage, flush }: { story: Story; stage: StageId; flush: () => void }) {
  const setStageDone = useAppStore((state) => state.setStageDone);
  const done = Boolean(story.completed[stage]);
  const name = STAGE_BY_ID[stage].name;
  const next = story.roadmap.order.find((s) => s !== stage && stageStatus(story, s) !== 'done');

  if (!done) {
    return (
      <View style={styles.done}>
        <Button
          label={`Mark ${name} done`}
          icon="checkmark"
          variant="secondary"
          block
          onPress={() => {
            flush();
            haptics.success();
            setStageDone(story.id, stage, true);
          }}
        />
        <Text variant="footnote" tone="muted" align="center">
          Done means done for now. You can come back and change anything.
        </Text>
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.done}>
      <View style={styles.doneLine}>
        <Text variant="headline" tone="success">
          {name} is done.
        </Text>
        <Button label="Undo" variant="quiet" size="sm" onPress={() => setStageDone(story.id, stage, false)} />
      </View>
      {next ? (
        <Button
          label={`Next: ${STAGE_BY_ID[next].name}`}
          icon="arrow-forward"
          iconPosition="end"
          block
          onPress={() =>
            router.replace({ pathname: '/story/[id]/[stage]', params: { id: story.id, stage: next } })
          }
        />
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  head: { gap: space.xxs, paddingTop: space.xs, marginBottom: space.lg },
  prompt: { marginTop: space.xs },
  body: { marginTop: space.xl },
  save: { paddingRight: space.sm },
  done: { marginTop: space.xxl, gap: space.sm },
  doneLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
