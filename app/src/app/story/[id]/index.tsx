import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { BookCover } from '@/components/book/book-cover';
import { StoryPath } from '@/components/story/story-path';
import { Button } from '@/components/ui/button';
import { ActionSheet, PromptDialog } from '@/components/ui/dialogs';
import { IconButton } from '@/components/ui/icon-button';
import { Missing } from '@/components/ui/missing';
import { Screen } from '@/components/ui/screen';
import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { goBackOr, TopBar } from '@/components/ui/top-bar';
import { GENRES, LENGTHS } from '@/domain/stages';
import { displayTitle, manuscriptWords, nextStage } from '@/domain/story';
import type { StageId } from '@/domain/types';
import { formatCount } from '@/domain/words';
import { discardDrawing } from '@/lib/local-files';
import { useAppStore } from '@/store/app-store';
import { useStory } from '@/store/selectors';
import { space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

export default function StoryPathScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = useStory(id);
  const { colors } = useTheme();
  const updateStory = useAppStore((state) => state.updateStory);
  const deleteStory = useAppStore((state) => state.deleteStory);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);

  if (!story) return <Missing />;

  const title = displayTitle(story);
  const words = manuscriptWords(story);
  const goal = story.roadmap.wordGoal;
  const openStage = (stage: StageId) =>
    router.push({ pathname: '/story/[id]/[stage]', params: { id: story.id, stage } });

  const confirmDelete = () =>
    Alert.alert(`Delete “${title}”?`, 'This removes the story and everything in it. It can’t be undone.', [
      { text: 'Keep it', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          goBackOr();
          story.work.illustrations.forEach((picture) => discardDrawing(picture.uri));
          deleteStory(story.id);
        },
      },
    ]);

  return (
    <Screen
      header={
        <TopBar
          trailing={
            <IconButton icon="more-horizontal" label="Story options" onPress={() => setMenuOpen(true)} />
          }
        />
      }>
      <View style={styles.head}>
        <BookCover title={title} cover={story.cover} width={92} />
        <View style={styles.headText}>
          <Tappable
            accessibilityLabel={`Title: ${title}. Tap to rename.`}
            onPress={() => setRenaming(true)}
            pressScale={0.98}>
            <Text variant="title1" numberOfLines={4} tone={story.title.trim() ? 'ink' : 'muted'}>
              {title}
            </Text>
          </Tappable>
          <Text variant="footnote" tone="muted">
            {GENRES[story.genre].name} · {LENGTHS[story.roadmap.length].name.replace('A ', '')}
          </Text>
        </View>
      </View>

      <View style={styles.words}>
        <View style={styles.wordsLine}>
          <Text variant="footnote" tone="muted">
            {formatCount(words)} of {formatCount(goal)} words
          </Text>
          {story.publishedAt ? (
            <Text variant="overline" tone="success">
              Published
            </Text>
          ) : null}
        </View>
        <View style={[styles.track, { backgroundColor: colors.fillStrong }]}>
          <View
            style={[
              styles.trackFill,
              { backgroundColor: colors.ink, width: `${Math.min(100, (words / goal) * 100)}%` },
            ]}
          />
        </View>
      </View>

      <Text variant="callout" tone="muted" style={styles.anywhere}>
        Start anywhere. Every stage is open, in any order.
      </Text>

      <StoryPath story={story} upNext={nextStage(story)} onOpen={openStage} />

      <Button
        label="Read it as a book"
        icon="book-open"
        variant="secondary"
        onPress={() => router.push({ pathname: '/read/[id]', params: { id: story.id } })}
        block
        style={styles.read}
      />

      <ActionSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        actions={[
          { label: 'Rename', icon: 'edit-3', onPress: () => setRenaming(true) },
          { label: 'Delete story', icon: 'trash-2', onPress: confirmDelete, destructive: true },
        ]}
      />
      <PromptDialog
        visible={renaming}
        title="Rename your story"
        label="Title"
        initialValue={story.title}
        placeholder="Untitled story"
        story
        onSave={(value) => updateStory(story.id, (s) => ({ ...s, title: value }))}
        onClose={() => setRenaming(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', gap: space.lg, alignItems: 'flex-end', paddingTop: space.xs },
  headText: { flex: 1, gap: space.xxs },
  words: { marginTop: space.xl, gap: space.xs },
  wordsLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  track: { height: 4, borderRadius: 2, overflow: 'hidden' },
  trackFill: { height: '100%', borderRadius: 2 },
  anywhere: { marginTop: space.xl, marginBottom: space.xs },
  read: { marginTop: space.xl },
});
