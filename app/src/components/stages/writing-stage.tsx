import { useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';

import { Chip } from '@/components/ui/choice';
import { Field } from '@/components/ui/field';
import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';
import { chapterHeading, chapterTitle, newChapter, wordGoalPerChapter } from '@/domain/story';
import { countWords, formatCount, isBlank } from '@/domain/words';
import { hairline, radius, space } from '@/theme/layout';
import { fontFamily, MAX_FONT_SCALE, type } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { editWork, type StageProps } from './stage-props';

const MAX_CHAPTERS = 10;

interface WritingStageProps extends StageProps {
  /** Scroll the page so this view sits at the top of what's visible. */
  reveal: (view: View | TextInput | null) => void;
}

export function WritingStage({ story, edit, flush, reveal }: WritingStageProps) {
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const editorRef = useRef<TextInput>(null);
  const { chapters } = story.work;
  const goal = wordGoalPerChapter(story);
  const [activeId, setActiveId] = useState(
    () => (chapters.find((c) => countWords(c.body) < goal) ?? chapters[0])?.id ?? null,
  );
  const index = Math.max(
    0,
    chapters.findIndex((c) => c.id === activeId),
  );
  const chapter = chapters[index];
  const words = countWords(chapter?.body);

  const change = (patch: { title?: string; body?: string }) =>
    editWork(edit, 'chapters', (list) => list.map((c) => (c.id === chapter.id ? { ...c, ...patch } : c)));

  const addChapter = () => {
    const next = newChapter();
    editWork(edit, 'chapters', (list) => [...list, next]);
    setActiveId(next.id);
  };

  const removeChapter = () => {
    const drop = () => {
      editWork(edit, 'chapters', (list) => list.filter((c) => c.id !== chapter.id));
      setActiveId(chapters[index - 1]?.id ?? chapters[index + 1]?.id ?? null);
    };
    if (isBlank(chapter.body) && isBlank(chapter.title)) return drop();
    Alert.alert(
      `Delete ${chapterTitle(chapter, index)}?`,
      `Its ${formatCount(words)} words go too. This can’t be undone.`,
      [
        { text: 'Keep it', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: drop },
      ],
    );
  };

  // A story always has at least one chapter to write in.
  if (!chapter) {
    return (
      <View style={styles.wrap}>
        <Chip label="Add a chapter" onPress={addChapter} />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
        keyboardShouldPersistTaps="handled">
        {chapters.map((c, i) => (
          <Chip
            key={c.id}
            label={`${i + 1}${countWords(c.body) > 0 ? ` · ${formatCount(countWords(c.body))}` : ''}`}
            selected={c.id === chapter.id}
            onPress={() => {
              flush();
              setActiveId(c.id);
            }}
          />
        ))}
        {chapters.length < MAX_CHAPTERS && <Chip label="+ Chapter" onPress={addChapter} />}
      </ScrollView>

      <View style={styles.titleRow}>
        <View style={styles.flex}>
          <Field
            label={chapterHeading(index)}
            value={chapter.title}
            onChangeText={(title) => change({ title })}
            onBlur={flush}
            placeholder="Chapter title (optional)"
            story
            maxLength={80}
            autoCapitalize="words"
          />
        </View>
        {chapters.length > 1 && (
          <View style={styles.trash}>
            <IconButton
              icon="trash-outline"
              label={`Delete ${chapterTitle(chapter, index)}`}
              tone="muted"
              size={18}
              onPress={removeChapter}
            />
          </View>
        )}
      </View>

      <TextInput
        ref={editorRef}
        key={chapter.id}
        accessibilityLabel={`${chapterTitle(chapter, index)}, the story`}
        value={chapter.body}
        onChangeText={(body) => change({ body })}
        onFocus={() => reveal(editorRef.current)}
        onBlur={flush}
        multiline
        scrollEnabled
        textAlignVertical="top"
        placeholder="Start anywhere. The middle is fine. So is a single line of dialogue."
        placeholderTextColor={colors.inkFaint}
        selectionColor={colors.primary}
        cursorColor={colors.ink}
        autoCapitalize="sentences"
        maxFontSizeMultiplier={MAX_FONT_SCALE}
        style={[
          styles.editor,
          {
            height: Math.round(Math.max(300, height * 0.46)),
            color: colors.ink,
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      />

      <View style={styles.count}>
        <Text variant="footnote" tone="muted">
          {formatCount(words)} {words === 1 ? 'word' : 'words'}
        </Text>
        <Text variant="footnote" tone={words >= goal ? 'success' : 'muted'}>
          {words >= goal ? 'Chapter goal reached' : `Aim for about ${formatCount(goal)}`}
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.fillStrong }]}>
        <View
          style={[
            styles.trackFill,
            {
              width: `${Math.min(100, (words / goal) * 100)}%`,
              backgroundColor: words >= goal ? colors.success : colors.primary,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.md },
  tabs: { gap: space.xs, paddingRight: space.lg },
  titleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: space.xs },
  flex: { flex: 1 },
  trash: { paddingBottom: 3, marginRight: -space.sm },
  editor: {
    borderWidth: hairline * 2,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingTop: space.md,
    paddingBottom: space.md,
    fontFamily: fontFamily.regular,
    fontSize: type.story.fontSize,
    lineHeight: type.story.lineHeight,
  },
  count: { flexDirection: 'row', justifyContent: 'space-between' },
  track: { height: 3, borderRadius: 2, overflow: 'hidden', marginTop: -space.xs },
  trackFill: { height: '100%', borderRadius: 2 },
});
