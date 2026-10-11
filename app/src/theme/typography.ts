import type { TextStyle } from 'react-native';

/** Plus Jakarta Sans does every job: friendly at display sizes, clean at 15px. */
export const fontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  italic: 'PlusJakartaSans_400Regular_Italic',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

type Variant = Required<Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>> &
  Pick<TextStyle, 'letterSpacing' | 'textTransform'> & {
    /** The family to use when the text is set in italic. */
    italicFamily?: string;
  };

/** One type scale for the whole app. */
export const type = {
  display: { fontFamily: fontFamily.extrabold, fontSize: 40, lineHeight: 52, letterSpacing: -0.8 },
  title1: { fontFamily: fontFamily.extrabold, fontSize: 30, lineHeight: 39, letterSpacing: -0.5 },
  title2: { fontFamily: fontFamily.bold, fontSize: 23, lineHeight: 30, letterSpacing: -0.3 },
  title3: { fontFamily: fontFamily.bold, fontSize: 18, lineHeight: 25 },
  /** A prompt or a question from the coach. */
  prompt: { fontFamily: fontFamily.medium, fontSize: 18, lineHeight: 27, italicFamily: fontFamily.italic },
  /** The student's own writing. */
  story: { fontFamily: fontFamily.regular, fontSize: 17, lineHeight: 28, italicFamily: fontFamily.italic },
  headline: { fontFamily: fontFamily.semibold, fontSize: 16, lineHeight: 25 },
  body: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 25, italicFamily: fontFamily.italic },
  callout: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22, italicFamily: fontFamily.italic },
  /** Buttons. */
  label: { fontFamily: fontFamily.bold, fontSize: 15, lineHeight: 20 },
  footnote: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 20, italicFamily: fontFamily.italic },
  /** Small capitals for section labels. */
  overline: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
} satisfies Record<string, Variant>;

export type TypeVariant = keyof typeof type;

/** Never let a custom size clip. */
export function safeLineHeight(fontSize: number, lineHeight?: number) {
  return Math.max(lineHeight ?? 0, Math.ceil(fontSize * 1.28));
}

/** Large Dynamic Type sizes are welcome, but past this the layouts stop working. */
export const MAX_FONT_SCALE = 1.35;
