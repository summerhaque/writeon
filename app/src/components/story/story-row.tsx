import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BookCover } from '@/components/book/book-cover';
import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { GENRES } from '@/domain/stages';
import { completedCount, displayTitle } from '@/domain/story';
import type { Story } from '@/domain/types';
import { formatShortDate } from '@/lib/dates';
import { space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

/** A story in a list: its cover, its title, how far along it is. */
export function StoryRow({ story }: { story: Story }) {
  const { colors } = useTheme();
  const title = displayTitle(story);
  const status = story.publishedAt
    ? `Published ${formatShortDate(story.publishedAt)}`
    : `${completedCount(story)} of 9 stages done`;

  return (
    <Tappable
      accessibilityLabel={`${title}. ${GENRES[story.genre].name}. ${status}`}
      onPress={() => router.push({ pathname: '/story/[id]', params: { id: story.id } })}
      pressScale={0.985}
      style={styles.row}>
      <BookCover title={title} cover={story.cover} width={46} compact />
      <View style={styles.text}>
        <Text variant="title3" numberOfLines={1}>
          {title}
        </Text>
        <Text variant="footnote" tone="muted" numberOfLines={1}>
          {GENRES[story.genre].name} · {status}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
    </Tappable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: space.sm },
  text: { flex: 1, gap: 2 },
});
