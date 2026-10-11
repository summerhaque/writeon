import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BookCover } from '@/components/book/book-cover';
import { PlateArt } from '@/components/book/plate-art';
import { StageMeter } from '@/components/story/stage-meter';
import { StoryRow } from '@/components/story/story-row';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Rule, Section, Surface } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { DAILY_SPARKS } from '@/content/daily-sparks';
import { currentStreak } from '@/domain/progress';
import { GENRES, LENGTHS, STAGE_BY_ID } from '@/domain/stages';
import { displayTitle, nextStage } from '@/domain/story';
import type { Story } from '@/domain/types';
import { formatLongDate, greeting } from '@/lib/dates';
import { useAppStore } from '@/store/app-store';
import { usePenName, useStories } from '@/store/selectors';
import { space } from '@/theme/layout';

const DAY = 24 * 60 * 60 * 1000;

function todaysSpark(now = new Date()) {
  const localDay = Math.floor((now.getTime() - now.getTimezoneOffset() * 60_000) / DAY);
  return DAILY_SPARKS[localDay % DAILY_SPARKS.length];
}

const startNewStory = () => router.push('/new-story');

export default function DeskScreen() {
  const stories = useStories();
  const penName = usePenName();
  const streak = useAppStore((state) => currentStreak(state.activity));
  const current = stories.find((story) => story.publishedAt === null);
  const others = stories.filter((story) => story !== current);
  const firstName = penName.split(' ')[0];

  return (
    <Screen edges={['top']}>
      <View style={styles.head}>
        <Text variant="overline" tone="muted">
          {formatLongDate(new Date())}
          {streak > 1 ? `  ·  ${streak} days in a row` : ''}
        </Text>
        <Text variant="title1" accessibilityRole="header">
          {greeting()}, {firstName}.
        </Text>
      </View>

      {current ? <ContinueCard story={current} /> : <EmptyDesk hasBooks={stories.length > 0} />}

      <Section label="Today’s spark">
        <SparkCard />
      </Section>

      {stories.length > 0 && (
        <Section
          label="Your stories"
          action={<Button label="New story" icon="plus" variant="quiet" size="sm" onPress={startNewStory} />}>
          {others.length > 0 ? (
            others.map((story, i) => (
              <View key={story.id}>
                {i > 0 && <Rule />}
                <StoryRow story={story} />
              </View>
            ))
          ) : (
            <Text variant="callout" tone="muted">
              One story on the go. Most writers have a few. Start another whenever an idea won’t leave you
              alone.
            </Text>
          )}
        </Section>
      )}
    </Screen>
  );
}

function ContinueCard({ story }: { story: Story }) {
  const next = nextStage(story);
  const title = displayTitle(story);
  const openPath = () => router.push({ pathname: '/story/[id]', params: { id: story.id } });
  const openNext = () =>
    next
      ? router.push({ pathname: '/story/[id]/[stage]', params: { id: story.id, stage: next } })
      : openPath();

  return (
    <Section label="Keep going">
      <Surface onPress={openPath} accessibilityLabel={`Open ${title}`} style={styles.continue}>
        <View style={styles.continueTop}>
          <BookCover title={title} cover={story.cover} width={84} compact />
          <View style={styles.continueText}>
            <Text variant="title2" numberOfLines={3}>
              {title}
            </Text>
            <Text variant="footnote" tone="muted">
              {GENRES[story.genre].name} · {LENGTHS[story.roadmap.length].name.replace('A ', '')}
            </Text>
          </View>
        </View>
        <StageMeter story={story} />
        <Button
          label={next ? `Continue with ${STAGE_BY_ID[next].name}` : 'Open your story'}
          icon="arrow-right"
          iconPosition="end"
          onPress={openNext}
          block
        />
      </Surface>
    </Section>
  );
}

function EmptyDesk({ hasBooks }: { hasBooks: boolean }) {
  return (
    <Section label={hasBooks ? 'Your next book' : 'Your first book'}>
      <Surface style={styles.empty}>
        <PlateArt id="forest-door" />
        <Text variant="title2">{hasBooks ? 'Ready for the next one?' : 'Every book starts somewhere.'}</Text>
        <Text variant="callout" tone="muted">
          Pick a kind of story, answer three quick questions, and you’ll get a roadmap made for you. Start
          wherever you like.
        </Text>
        <Button label="Start a new story" onPress={startNewStory} block />
      </Surface>
    </Section>
  );
}

function SparkCard() {
  const spark = todaysSpark();
  return (
    <Surface style={styles.spark}>
      <Text variant="prompt">{spark.prompt}</Text>
      <View style={styles.sparkFoot}>
        <Text variant="footnote" tone="muted">
          A {GENRES[spark.genre].name.toLowerCase()} idea
        </Text>
        <Button
          label="Write this one"
          variant="secondary"
          size="sm"
          onPress={() =>
            router.push({ pathname: '/new-story', params: { genre: spark.genre, whatIf: spark.prompt } })
          }
        />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  head: { gap: space.xxs, paddingTop: space.lg },
  continue: { gap: space.lg },
  continueTop: { flexDirection: 'row', gap: space.md },
  continueText: { flex: 1, gap: space.xxs, justifyContent: 'center' },
  empty: { gap: space.md },
  spark: { gap: space.md },
  sparkFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.sm },
});
