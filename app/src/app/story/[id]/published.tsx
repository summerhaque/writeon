import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useEffectEvent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { BookCover } from '@/components/book/book-cover';
import { PublishedStamp, useLandingBounce } from '@/components/book/published-stamp';
import { Thinking } from '@/components/coach/thinking';
import { Button } from '@/components/ui/button';
import { Missing } from '@/components/ui/missing';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { bookFromStory } from '@/domain/book';
import { displayTitle } from '@/domain/story';
import type { Story } from '@/domain/types';
import { haptics } from '@/lib/haptics';
import { exportBook, shareBook } from '@/publish/export-book';
import { useAppStore } from '@/store/app-store';
import { useStory } from '@/store/selectors';
import { space } from '@/theme/layout';

type Binding = { state: 'binding' } | { state: 'done'; uri: string; at: number } | { state: 'failed' };

export default function PublishedScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = useStory(id);
  if (!story) return <Missing />;
  return <Bindery story={story} />;
}

function Bindery({ story }: { story: Story }) {
  const publish = useAppStore((state) => state.publish);
  const [binding, setBinding] = useState<Binding>({ state: 'binding' });
  const [attempt, setAttempt] = useState(0);
  const [sharing, setSharing] = useState(false);
  const bounce = useLandingBounce();
  const title = displayTitle(story);

  const bind = useEffectEvent(async () => {
    setBinding({ state: 'binding' });
    try {
      const at = Date.now();
      const uri = await exportBook(bookFromStory({ ...story, publishedAt: at }));
      publish(story.id);
      setBinding({ state: 'done', uri, at });
    } catch (error) {
      console.warn('Publishing failed', error);
      haptics.warning();
      setBinding({ state: 'failed' });
    }
  });

  useEffect(() => {
    void bind();
  }, [attempt]);

  const share = async (uri: string) => {
    setSharing(true);
    try {
      await shareBook(uri, title);
    } finally {
      setSharing(false);
    }
  };

  const toShelf = () => {
    router.dismissAll();
    router.navigate('/shelf');
  };

  return (
    <Screen scroll={false} contentStyle={styles.center}>
      <Animated.View style={[styles.coverWrap, bounce.style]}>
        <BookCover title={title} cover={story.cover} width={200} />
        {binding.state === 'done' && (
          <PublishedStamp
            date={binding.at}
            onLand={() => {
              haptics.thump();
              bounce.land();
              setTimeout(haptics.success, 180);
            }}
          />
        )}
      </Animated.View>

      {binding.state === 'binding' && (
        <Animated.View entering={FadeIn.duration(300)} style={styles.copy}>
          <Text variant="title2" align="center">
            Binding your book…
          </Text>
          <View style={styles.thinking}>
            <Thinking />
          </View>
        </Animated.View>
      )}

      {binding.state === 'done' && (
        <Animated.View entering={FadeInDown.duration(500).delay(700)} style={styles.copy}>
          <Text variant="display" align="center">
            Published.
          </Text>
          <Text variant="body" tone="muted" align="center">
            {title} is a real book now, with a title page, your chapters and an About the Author page. Share
            it, print it, read it out loud.
          </Text>
          <View style={styles.actions}>
            <Button
              label="Share your book"
              icon="share-outline"
              onPress={() => share(binding.uri)}
              loading={sharing}
              block
            />
            <Button label="See it on your shelf" variant="secondary" onPress={toShelf} block />
            <Button
              label="Back to your story"
              variant="quiet"
              onPress={() => router.back()}
              style={styles.quiet}
            />
          </View>
        </Animated.View>
      )}

      {binding.state === 'failed' && (
        <Animated.View entering={FadeIn.duration(300)} style={styles.copy}>
          <Text variant="title2" align="center">
            The book didn’t bind this time.
          </Text>
          <Text variant="body" tone="muted" align="center">
            Nothing is lost. Your story is saved. Try again, and if it keeps happening, restart the app.
          </Text>
          <View style={styles.actions}>
            <Button label="Try again" onPress={() => setAttempt((n) => n + 1)} block />
            <Button
              label="Back to your story"
              variant="quiet"
              onPress={() => router.back()}
              style={styles.quiet}
            />
          </View>
        </Animated.View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', gap: space.xxl },
  coverWrap: { alignSelf: 'center', alignItems: 'center', justifyContent: 'center' },
  copy: { gap: space.sm, alignItems: 'stretch' },
  thinking: { width: 160, alignSelf: 'center', marginTop: space.xs },
  actions: { gap: space.sm, marginTop: space.lg },
  quiet: { alignSelf: 'center' },
});
