import { router } from 'expo-router';
import { useEffect, useEffectEvent } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Sparkle } from '@/components/brand/sparkle';
import { Button } from '@/components/ui/button';
import { Surface } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { useCoach, useConversation } from '@/coach/coach-session';
import type { StageId, Story } from '@/domain/types';
import { space } from '@/theme/layout';

import { Thinking } from './thinking';

interface CoachCardProps {
  story: Story;
  stage: StageId;
  /** Save the draft first, so the full conversation reads the latest words. */
  onOpenChat: () => void;
}

/** Coach Sparkle in the margin: one question at a time, hints when asked. */
export function CoachCard({ story, stage, onOpenChat }: CoachCardProps) {
  const ask = useCoach((state) => state.ask);
  const { turns, hintsGiven, thinking } = useConversation(story.id, stage);
  const latest = [...turns].reverse().find((turn) => turn.from === 'coach');

  // The coach speaks first when a stage opens, once per session. Later edits
  // to the story shouldn't make it greet again, so this reads them as an event.
  const greet = useEffectEvent(() => {
    if (turns.length === 0 && !thinking) void ask({ story, stage });
  });
  useEffect(() => greet(), [story.id, stage]);

  const hintLabel = hintsGiven === 0 ? 'Give me a hint' : hintsGiven < 3 ? 'Another hint' : 'No hints left';

  return (
    <Surface style={styles.card}>
      <View style={styles.head}>
        <Sparkle size={16} />
        <Text variant="overline" tone="muted" style={styles.name}>
          Coach Sparkle
        </Text>
        {latest?.kind === 'hint' && latest.tier ? (
          <Text variant="overline" tone="accent">
            Hint {latest.tier} of 3
          </Text>
        ) : null}
      </View>

      <View style={styles.body} accessibilityLiveRegion="polite">
        {thinking || !latest ? (
          <Thinking />
        ) : (
          <Animated.View key={latest.id} entering={FadeIn.duration(320)}>
            <Text variant="prompt" style={styles.text}>
              {latest.text}
            </Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.actions}>
        <Button
          label={hintLabel}
          variant="secondary"
          size="sm"
          disabled={thinking || hintsGiven >= 3}
          onPress={() => ask({ story, stage, intent: 'hint', label: 'Give me a hint' })}
        />
        <Button
          label="Talk it through"
          variant="quiet"
          size="sm"
          icon="arrow-right"
          iconPosition="end"
          onPress={() => {
            onOpenChat();
            router.push({ pathname: '/coach', params: { storyId: story.id, stage } });
          }}
        />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: { gap: space.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  name: { flex: 1 },
  body: { minHeight: 56, justifyContent: 'center' },
  text: { fontSize: 18, lineHeight: 26 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.sm },
});
