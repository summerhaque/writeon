import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import type { Cover } from '@/domain/types';
import { coverColors, print } from '@/theme/colors';
import { fontFamily } from '@/theme/typography';

import { PlateArt } from './plate-art';

interface BookCoverProps {
  title: string;
  cover: Pick<Cover, 'template' | 'color' | 'plateId' | 'author'>;
  width: number;
  /** Small covers drop the author line. */
  compact?: boolean;
}

/**
 * A printed cover at 2:3. The same four templates are typeset again in
 * publish/book-html.ts, so the PDF matches what the writer designed.
 */
export function BookCover({ title, cover, width, compact = false }: BookCoverProps) {
  const height = width * 1.5;
  const ink = coverColors[cover.color].ink;
  const pad = width * 0.09;
  const titleSize = Math.max(9, width * (cover.template === 'minimal' ? 0.13 : 0.105));
  const authorSize = Math.max(7, width * 0.048);
  const showAuthor = !compact && cover.author.trim().length > 0;
  const plateId = cover.plateId ?? 'tower';

  const titleText = (color: string, align: 'center' | 'left') => (
    <Text
      numberOfLines={5}
      adjustsFontSizeToFit
      minimumFontScale={0.6}
      align={align}
      style={{
        color,
        fontFamily: fontFamily.serifSemibold,
        fontSize: titleSize,
        lineHeight: titleSize * 1.18,
        letterSpacing: -titleSize * 0.01,
      }}>
      {title}
    </Text>
  );

  const authorText = (color: string, align: 'center' | 'left') =>
    showAuthor ? (
      <Text
        numberOfLines={1}
        align={align}
        style={{
          color,
          fontFamily: fontFamily.sansSemibold,
          fontSize: authorSize,
          letterSpacing: authorSize * 0.14,
          textTransform: 'uppercase',
        }}>
        {cover.author}
      </Text>
    ) : null;

  const corner = Math.max(2, width * 0.025);

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Cover of ${title}${cover.author ? ` by ${cover.author}` : ''}`}
      style={[styles.shadow, { width, height, borderRadius: corner }]}>
      <View style={[styles.book, { borderRadius: corner }]}>
        {cover.template === 'classic' && (
          <View style={[styles.fill, { backgroundColor: ink, padding: width * 0.05 }]}>
            <View style={[styles.frame, { padding: pad * 0.8, borderColor: 'rgba(250, 247, 241, 0.55)' }]}>
              <View style={styles.center}>
                {titleText(print.paper, 'center')}
                <View style={[styles.rule, { width: width * 0.14, marginTop: width * 0.06 }]} />
              </View>
              {authorText(print.paper, 'center')}
            </View>
          </View>
        )}

        {cover.template === 'band' && (
          <View style={[styles.fill, { backgroundColor: print.paperDeep }]}>
            <View style={styles.spacer} />
            <View
              style={[
                styles.band,
                { backgroundColor: ink, paddingHorizontal: pad, paddingVertical: pad * 0.9 },
              ]}>
              {titleText(print.paper, 'center')}
            </View>
            <View style={[styles.spacer, styles.bottomAligned, { paddingBottom: pad }]}>
              {authorText(print.ink, 'center')}
            </View>
          </View>
        )}

        {cover.template === 'plate' && (
          <View style={[styles.fill, { backgroundColor: print.paperDeep }]}>
            <PlateArt id={plateId} radius={0} />
            <View style={{ height: width * 0.025, backgroundColor: ink }} />
            <View style={[styles.plateText, { padding: pad, gap: width * 0.04 }]}>
              {titleText(print.ink, 'left')}
              {authorText(print.muted, 'left')}
            </View>
          </View>
        )}

        {cover.template === 'minimal' && (
          <View style={[styles.fill, styles.minimal, { backgroundColor: ink, padding: pad }]}>
            {titleText(print.paper, 'left')}
            {authorText('rgba(250, 247, 241, 0.8)', 'left')}
          </View>
        )}

        {/* The spine: a crease of shadow and a line of light, so it reads as a book. */}
        <View style={[styles.spine, { width: Math.max(2, width * 0.03) }]} />
        <View style={[styles.spineLight, { left: Math.max(2, width * 0.03) }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  book: { flex: 1, overflow: 'hidden' },
  shadow: {
    shadowColor: '#1B1E2B',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  fill: { flex: 1 },
  frame: { flex: 1, borderWidth: 1, justifyContent: 'space-between', alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch' },
  rule: { height: 1.5, backgroundColor: 'rgba(250, 247, 241, 0.7)' },
  spacer: { flex: 1 },
  bottomAligned: { justifyContent: 'flex-end' },
  band: { justifyContent: 'center' },
  plateText: { flex: 1, justifyContent: 'space-between' },
  minimal: { justifyContent: 'space-between' },
  spine: { position: 'absolute', top: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.14)' },
  spineLight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
});
