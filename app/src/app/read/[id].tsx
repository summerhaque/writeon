import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookCover } from '@/components/book/book-cover';
import { PlateArt } from '@/components/book/plate-art';
import { FeatherMark } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Missing } from '@/components/ui/missing';
import { Text } from '@/components/ui/text';
import { SAMPLE_BOOKS } from '@/content/sample-books';
import { bookFromSample, bookFromStory, type Book, type BookChapter } from '@/domain/book';
import { GENRES } from '@/domain/stages';
import { useStory } from '@/store/selectors';
import { gutter, MAX_CONTENT_WIDTH, radius, space } from '@/theme/layout';
import { useTheme } from '@/theme/use-theme';

type Page =
  | { kind: 'cover' }
  | { kind: 'dedication' }
  | { kind: 'chapter'; chapter: BookChapter }
  | { kind: 'about' }
  | { kind: 'end' };

export default function ReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sample = SAMPLE_BOOKS.find((b) => b.id === id);
  const story = useStory(sample ? undefined : id);
  const book = useMemo(
    () => (sample ? bookFromSample(sample) : story ? bookFromStory(story) : null),
    [sample, story],
  );
  if (!book) return <Missing what="book" />;
  return <Reader book={book} />;
}

function Reader({ book }: { book: Book }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const list = useRef<FlatList<Page>>(null);
  const [index, setIndex] = useState(0);

  const pages: Page[] = [
    { kind: 'cover' },
    ...(book.dedication ? [{ kind: 'dedication' } as const] : []),
    ...book.chapters.map((chapter) => ({ kind: 'chapter', chapter }) as const),
    ...(book.about ? [{ kind: 'about' } as const] : []),
    { kind: 'end' },
  ];

  const go = (to: number) => {
    const target = Math.max(0, Math.min(pages.length - 1, to));
    list.current?.scrollToIndex({ index: target, animated: true });
    setIndex(target);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.bar}>
        <IconButton icon="x" label="Close book" onPress={() => router.back()} />
        <Text variant="label" numberOfLines={1} style={styles.barTitle}>
          {book.title}
        </Text>
        <View style={styles.barSide} />
      </View>

      <FlatList
        ref={list}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(page, i) => `${page.kind}-${i}`}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onMomentumScrollEnd={(event) => setIndex(Math.round(event.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <PageView page={item} book={book} />
          </View>
        )}
      />

      <View style={styles.footer}>
        <IconButton
          icon="chevron-left"
          label="Previous page"
          onPress={() => go(index - 1)}
          tone={index === 0 ? 'muted' : 'ink'}
        />
        <Text variant="footnote" tone="muted" accessibilityLiveRegion="polite">
          {index + 1} of {pages.length}
        </Text>
        <IconButton
          icon="chevron-right"
          label="Next page"
          onPress={() => go(index + 1)}
          tone={index === pages.length - 1 ? 'muted' : 'ink'}
        />
      </View>
    </SafeAreaView>
  );
}

function PageView({ page, book }: { page: Page; book: Book }) {
  const { width } = useWindowDimensions();
  const author = book.cover.author.trim();

  if (page.kind === 'cover') {
    return (
      <View style={styles.centerPage}>
        <BookCover title={book.title} cover={book.cover} width={Math.min(240, width * 0.6)} />
        <View style={styles.coverText}>
          <Text variant="overline" tone="muted" align="center">
            {GENRES[book.genre].name}
            {book.sample ? ' · From the sample shelf' : ''}
          </Text>
          <Text variant="footnote" tone="muted" align="center">
            Swipe to start reading
          </Text>
        </View>
      </View>
    );
  }

  if (page.kind === 'dedication') {
    return (
      <View style={styles.centerPage}>
        <Text variant="prompt" align="center" style={styles.dedication}>
          {book.dedication}
        </Text>
      </View>
    );
  }

  if (page.kind === 'about') {
    return (
      <ScrollView contentContainerStyle={styles.textPage}>
        <Text variant="overline" tone="accent" align="center">
          About the Author
        </Text>
        <Text variant="story" align="center" style={styles.about}>
          {book.about}
        </Text>
      </ScrollView>
    );
  }

  if (page.kind === 'end') {
    return (
      <View style={styles.centerPage}>
        <FeatherMark height={72} />
        <Text variant="title2" align="center">
          {book.chapters.length > 0 ? 'The End' : 'Nothing to read yet'}
        </Text>
        <Text variant="callout" tone="muted" align="center" style={styles.endLine}>
          {book.chapters.length === 0
            ? 'Write a few words in any chapter, and they’ll show up here as a book.'
            : book.sample
              ? 'Every writer on this shelf started with a blank page.'
              : author
                ? `Written by ${author}.`
                : 'Everyone has a story worth telling.'}
        </Text>
        {book.sample && (
          <Button
            label="Start my own story"
            variant="secondary"
            onPress={() => router.replace('/new-story')}
          />
        )}
      </View>
    );
  }

  const { chapter } = page;
  return (
    <ScrollView contentContainerStyle={styles.textPage}>
      <View style={styles.chapterHead}>
        <Text variant="overline" tone="accent" align="center">
          {chapter.heading}
        </Text>
        {chapter.title ? (
          <Text variant="title2" align="center">
            {chapter.title}
          </Text>
        ) : null}
      </View>
      {chapter.paragraphs.map((paragraph, i) => (
        <Text key={i} variant="story" style={i > 0 && styles.paragraph}>
          {paragraph}
        </Text>
      ))}
      {chapter.pictures.map((picture) => (
        <View key={picture.id} style={styles.figure}>
          {picture.plateId ? (
            <PlateArt id={picture.plateId} radius={radius.sm} />
          ) : (
            <Image source={{ uri: picture.uri ?? undefined }} style={styles.photo} contentFit="cover" />
          )}
          {picture.caption ? (
            <Text variant="footnote" tone="muted" italic align="center">
              {picture.caption}
            </Text>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  bar: { height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: gutter - 12 },
  barTitle: { flex: 1, textAlign: 'center' },
  barSide: { width: 44 },
  centerPage: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.lg, padding: gutter },
  coverText: { gap: space.xxs },
  dedication: { maxWidth: 300 },
  endLine: { maxWidth: 300 },
  textPage: {
    paddingHorizontal: gutter + 4,
    paddingTop: space.xl,
    paddingBottom: space.xxxl,
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
  },
  chapterHead: { gap: space.xs, marginBottom: space.xl },
  paragraph: { marginTop: space.sm },
  about: { marginTop: space.lg },
  figure: { marginTop: space.xl, gap: space.xs },
  photo: { width: '100%', aspectRatio: 4 / 3, borderRadius: radius.sm },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: gutter - 12,
  },
});
