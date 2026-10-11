import {
  Text as NativeText,
  StyleSheet,
  type TextProps as NativeTextProps,
  type TextStyle,
} from 'react-native';

import type { Palette } from '@/theme/colors';
import { MAX_FONT_SCALE, safeLineHeight, type as scale, type TypeVariant } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

export type TextTone = Extract<
  keyof Palette,
  'ink' | 'muted' | 'faint' | 'accent' | 'link' | 'success' | 'onPrimary'
>;

export interface TextProps extends NativeTextProps {
  /** A step on the type scale. */
  variant?: TypeVariant;
  tone?: TextTone;
  /** Italic is a style, not a step on the scale, so it's its own prop. */
  italic?: boolean;
  align?: TextStyle['textAlign'];
}

export function Text({ variant = 'body', tone = 'ink', italic = false, align, style, ...rest }: TextProps) {
  const { colors } = useTheme();
  const base = scale[variant];
  const custom = StyleSheet.flatten(style) ?? {};
  const fontSize = custom.fontSize ?? base.fontSize;
  const lineHeight = safeLineHeight(
    fontSize,
    custom.lineHeight ?? (custom.fontSize ? undefined : base.lineHeight),
  );
  const family = italic && 'italicFamily' in base ? base.italicFamily : base.fontFamily;

  return (
    <NativeText
      maxFontSizeMultiplier={MAX_FONT_SCALE}
      {...rest}
      style={[
        {
          fontFamily: family,
          fontSize: base.fontSize,
          letterSpacing: 'letterSpacing' in base ? base.letterSpacing : undefined,
          textTransform: 'textTransform' in base ? base.textTransform : undefined,
          color: colors[tone],
          textAlign: align,
        },
        style,
        { lineHeight },
      ]}
    />
  );
}
