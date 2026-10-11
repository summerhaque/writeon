import type { TextStyle } from 'react-native';

/**
 * Fraunces: the logo, headings, and the student's own story text.
 * Source Sans 3: everything else.
 */
export const fontFamily = {
  serif: 'Fraunces_400Regular',
  serifItalic: 'Fraunces_400Regular_Italic',
  serifMedium: 'Fraunces_500Medium',
  serifSemibold: 'Fraunces_600SemiBold',
  serifSemiboldItalic: 'Fraunces_600SemiBold_Italic',
  sans: 'SourceSans3_400Regular',
  sansItalic: 'SourceSans3_400Regular_Italic',
  sansSemibold: 'SourceSans3_600SemiBold',
  sansBold: 'SourceSans3_700Bold',
} as const;

type Variant = Required<Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>> &
  Pick<TextStyle, 'letterSpacing' | 'textTransform'> & {
    /** The family to use when the text is set in italic. */
    italicFamily?: string;
  };

/** One type scale for the whole app. Line heights are generous: Fraunces has tall ascenders. */
export const type = {
  display: {
    fontFamily: fontFamily.serifSemibold,
    italicFamily: fontFamily.serifSemiboldItalic,
    fontSize: 38,
    lineHeight: 46,
    letterSpacing: -0.6,
  },
  title1: {
    fontFamily: fontFamily.serifSemibold,
    italicFamily: fontFamily.serifSemiboldItalic,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.4,
  },
  title2: {
    fontFamily: fontFamily.serifSemibold,
    italicFamily: fontFamily.serifSemiboldItalic,
    fontSize: 24,
    lineHeight: 31,
    letterSpacing: -0.2,
  },
  title3: {
    fontFamily: fontFamily.serifMedium,
    italicFamily: fontFamily.serifItalic,
    fontSize: 20,
    lineHeight: 27,
  },
  /** A prompt or a question from the coach. */
  prompt: {
    fontFamily: fontFamily.serifItalic,
    italicFamily: fontFamily.serifItalic,
    fontSize: 19,
    lineHeight: 28,
  },
  /** The student's story. */
  story: {
    fontFamily: fontFamily.serif,
    italicFamily: fontFamily.serifItalic,
    fontSize: 18,
    lineHeight: 29,
  },
  headline: { fontFamily: fontFamily.sansSemibold, fontSize: 17, lineHeight: 23 },
  body: {
    fontFamily: fontFamily.sans,
    italicFamily: fontFamily.sansItalic,
    fontSize: 16,
    lineHeight: 23,
  },
  callout: {
    fontFamily: fontFamily.sans,
    italicFamily: fontFamily.sansItalic,
    fontSize: 15,
    lineHeight: 21,
  },
  label: { fontFamily: fontFamily.sansSemibold, fontSize: 15, lineHeight: 20 },
  footnote: {
    fontFamily: fontFamily.sans,
    italicFamily: fontFamily.sansItalic,
    fontSize: 13,
    lineHeight: 18,
  },
  /** Small capitals for section labels. Use sparingly. */
  overline: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
} satisfies Record<string, Variant>;

export type TypeVariant = keyof typeof type;

/** Never let a custom size clip: Fraunces' ascenders and italics run tall. */
export function safeLineHeight(fontSize: number, lineHeight?: number) {
  return Math.max(lineHeight ?? 0, Math.ceil(fontSize * 1.28));
}

/** Large Dynamic Type sizes are welcome, but past this the layouts stop being a notebook. */
export const MAX_FONT_SCALE = 1.35;
