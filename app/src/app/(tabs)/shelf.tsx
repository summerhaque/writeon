import { router } from 'expo-router';
import { Fragment } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { BookCover } from '@/components/book/book-cover';
import { Screen } from '@/components/ui/screen';
import { Section } from '@/components/ui/surface';
import { Tappable } from '@/components/ui/tappable';
import { Text } from '@/components/ui/text';
import { SAMPLE_BOOKS } from '@/content/sample-books';
import { bookFromSample, bookFromStory, type Book } from '@/domain/book';
import { useStories } from '@/store/selectors';
import { gutter, MAX_CONTENT_WIDTH, space } from '@/theme/layout';
import { fontFamily } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

const PER_ROW = 3;
const GAP = space.lg;
const SAMPLES = SAMPLE_BOOKS.map(bookFromSample);

export default function ShelfScreen() {
  const stories = useStories();
  const published = stories.filter((s) => s.publishedAt !== null).map(bookFromStory);

  return (
    <Screen edges={['top']}>
      <View style={styles.head}>
        <Text variant="title1" accessibilityRole="header">
          Story Shelf
        </Text>
        <Text variant="callout" tone="muted">
          Finished books land here, right next to books by other young writers.
        </Text>
      </View>

      <Section label="Your books">
        {published.length > 0 ? (
          <Bookshelf books={published} />
        ) : (
          <Text variant="callout" tone="muted">
            Nothing here yet. When you publish a story, it lands on this shelf as a real book you can share.
          </Text>
        )}
      </Section>

      <Section label="From the sample shelf">
        <Bookshelf books={SAMPLES} />
      </Section>
    </Screen>
  );
}

function Bookshelf({ books }: { books: Book[] }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const inner = Math.min(width, MAX_CONTENT_WIDTH) - gutter * 2;
  const coverWidth = Math.floor((inner - GAP * (PER_ROW - 1)) / PER_ROW);
  const rows = Array.from({ length: Math.ceil(books.length / PER_ROW) }, (_, i) =>
    books.slice(i * PER_ROW, i * PER_ROW + PER_ROW),
  );

  return (
    <View style={styles.shelf}>
      {rows.map((row, i) => (
        <Fragment key={i}>
          <View style={styles.row}>
            {row.map((book) => (
              <Tappable
                key={book.id}
                accessibilityLabel={`${book.title}, by ${book.cover.author}. Open book.`}
                onPress={() => router.push({ pathname: '/read/[id]', params: { id: book.id } })}
                pressScale={0.96}
                style={{ width: coverWidth }}>
                <BookCover title={book.title} cover={book.cover} width={coverWidth} compact />
              </Tappable>
            ))}
          </View>
          {/* The plank the books stand on. */}
          <View style={[styles.plank, { backgroundColor: colors.borderStrong }]} />
          <View style={styles.row}>
            {row.map((book) => (
              <View key={book.id} style={[styles.label, { width: coverWidth }]}>
                <Text variant="footnote" numberOfLines={2} style={styles.title}>
                  {book.title}
                </Text>
                <Text variant="footnote" tone="muted" numberOfLines={1}>
                  {book.cover.author}
                </Text>
              </View>
            ))}
          </View>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  head: { gap: space.xxs, paddingTop: space.lg },
  shelf: { gap: 0, marginTop: space.xs },
  row: { flexDirection: 'row', gap: GAP, alignItems: 'flex-end' },
  plank: { height: 8, borderRadius: 4, marginHorizontal: -space.xs, marginTop: -2 },
  label: { gap: 1, paddingTop: space.sm, paddingBottom: space.xl },
  title: { fontFamily: fontFamily.semibold },
});
