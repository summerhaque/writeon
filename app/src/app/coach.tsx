import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Sparkle } from '@/components/brand/sparkle';
import { Thinking } from '@/components/coach/thinking';
import { Chip } from '@/components/ui/choice';
import { IconButton } from '@/components/ui/icon-button';
import { Missing } from '@/components/ui/missing';
import { Text } from '@/components/ui/text';
import { coachContextLabel, type CoachTurn } from '@/coach/coach-engine';
import { QUICK_REPLIES, useCoach, useConversation } from '@/coach/coach-session';
import { isStageId } from '@/domain/stages';
import type { StageId, Story } from '@/domain/types';
import { useKeyboardInset } from '@/lib/use-keyboard-inset';
import { useStory } from '@/store/selectors';
import { gutter, hairline, MAX_CONTENT_WIDTH, radius, space } from '@/theme/layout';
import { fontFamily, MAX_FONT_SCALE, type } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

export default function CoachScreen() {
  const { storyId, stage } = useLocalSearchParams<{ storyId: string; stage: string }>();
  const story = useStory(storyId);
  if (!story || !isStageId(stage)) return <Missing />;
  return <Conversation story={story} stage={stage} />;
}

function Conversation({ story, stage }: { story: Story; stage: StageId }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardInset();
  const ask = useCoach((state) => state.ask);
  const { turns, thinking } = useConversation(story.id, stage);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const send = () => {
    const text = message.trim();
    if (!text || thinking) return;
    setMessage('');
    void ask({ story, stage, message: text });
  };

  const composerStyle = useAnimatedStyle(() => ({
    paddingBottom: Math.max(keyboard.value, insets.bottom) + space.sm,
  }));

  return (
    // iOS shows this as a sheet below the status bar; Android opens it full screen.
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background, paddingTop: Platform.OS === 'ios' ? 0 : insets.top },
      ]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Sparkle size={22} />
        <View style={styles.headerText}>
          <Text variant="headline">Coach Sparkle</Text>
          <Text variant="footnote" tone="muted">
            {coachContextLabel(story, stage)} · Hints, never answers
          </Text>
        </View>
        <IconButton icon="x" label="Close" onPress={() => router.back()} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.thread}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {turns.map((turn) => (
          <Turn key={turn.id} turn={turn} />
        ))}
        {thinking && (
          <Animated.View entering={FadeIn.duration(200)} style={styles.coachTurn}>
            <Sparkle size={14} />
            <View style={styles.flex}>
              <Thinking />
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <Animated.View style={[styles.composer, { borderTopColor: colors.border }, composerStyle]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.quick}>
          {QUICK_REPLIES.map((reply) => (
            <Chip
              key={reply.label}
              label={reply.label}
              onPress={() => {
                if (!thinking) void ask({ story, stage, intent: reply.intent, label: reply.label });
              }}
            />
          ))}
        </ScrollView>
        <View style={[styles.inputRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput
            accessibilityLabel="Message Coach Sparkle"
            value={message}
            onChangeText={setMessage}
            placeholder="Ask Sparkle anything about your story"
            placeholderTextColor={colors.faint}
            selectionColor={colors.accent}
            cursorColor={colors.ink}
            maxFontSizeMultiplier={MAX_FONT_SCALE}
            multiline
            maxLength={500}
            onSubmitEditing={send}
            submitBehavior="submit"
            returnKeyType="send"
            style={[styles.input, { color: colors.ink }]}
          />
          <IconButton
            icon="arrow-up-circle"
            label="Send"
            onPress={send}
            tone={message.trim() ? 'ink' : 'muted'}
            size={26}
          />
        </View>
      </Animated.View>
    </View>
  );
}

function Turn({ turn }: { turn: CoachTurn }) {
  const { colors } = useTheme();
  if (turn.from === 'writer') {
    return (
      <Animated.View
        entering={FadeInDown.duration(220)}
        style={[styles.writerTurn, { backgroundColor: colors.fillStrong }]}>
        <Text variant="body">{turn.text}</Text>
      </Animated.View>
    );
  }
  return (
    <Animated.View entering={FadeIn.duration(320)} style={styles.coachTurn}>
      <Sparkle size={14} />
      <View style={styles.coachText}>
        {turn.kind === 'hint' && turn.tier ? (
          <Text variant="overline" tone="accent">
            Hint {turn.tier} of 3
          </Text>
        ) : null}
        <Text variant="story" style={styles.coachLine}>
          {turn.text}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingLeft: gutter,
    paddingRight: gutter - 12,
    paddingVertical: space.sm,
    borderBottomWidth: hairline,
  },
  headerText: { flex: 1 },
  thread: {
    padding: gutter,
    gap: space.lg,
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
  },
  coachTurn: { flexDirection: 'row', gap: space.sm, alignItems: 'flex-start', paddingRight: space.xl },
  coachText: { flex: 1, gap: space.xxs, marginTop: -5 },
  coachLine: { fontSize: 17, lineHeight: 26 },
  writerTurn: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.lg,
    borderBottomRightRadius: radius.sm / 2,
  },
  composer: { borderTopWidth: hairline, paddingTop: space.sm, gap: space.sm },
  quick: { gap: space.xs, paddingHorizontal: gutter },
  inputRow: {
    marginHorizontal: gutter,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: hairline * 2,
    borderRadius: radius.lg,
    paddingLeft: space.md,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: fontFamily.sans,
    fontSize: type.body.fontSize,
  },
});
