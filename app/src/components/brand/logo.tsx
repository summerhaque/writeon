import Svg, { G, Path } from 'react-native-svg';

import { useTheme } from '@/theme/use-theme';

import { WORDMARK_PATH, WORDMARK_VIEWBOX, WORDMARK_ASPECT } from './wordmark-path';

const FEATHER_OUTLINE =
  'M118,22 L118,336 C118,368 98,390 66,410 C34,390 22,368 22,336 L22,172 C22,94 62,46 118,22 Z';

/** The feather mark from brand/writeon-logo-*.svg. The nib is always vermilion. */
export function FeatherMark({ height = 64 }: { height?: number }) {
  const { scheme, colors } = useTheme();
  const stroke = colors.ink;
  return (
    <Svg
      width={(height * 124) / 522}
      height={height}
      viewBox="0 0 124 522"
      accessibilityRole="image"
      accessibilityLabel="Write On!">
      <G transform="translate(-8 -8)" fill="none" strokeLinecap="round">
        <Path d={FEATHER_OUTLINE} fill={scheme === 'dark' ? 'none' : colors.surface} />
        <Path d="M22,184 C46,150 80,130 118,120" stroke={stroke} strokeWidth={14} />
        <Path d="M22,288 C46,254 80,234 118,224" stroke={stroke} strokeWidth={14} />
        <Path d="M66,396 C66,364 72,336 90,318 C100,308 109,304 118,302" stroke={stroke} strokeWidth={10.9} />
        <Path
          d={FEATHER_OUTLINE}
          stroke={stroke}
          strokeWidth={14}
          strokeLinejoin="miter"
          strokeMiterlimit={6}
        />
        <Path d="M66,410 L66,466" stroke={stroke} strokeWidth={14} strokeLinecap="butt" />
        <Path
          d="M54,476 L78,476 L66,520 Z"
          fill={colors.accent}
          stroke={colors.accent}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

/** The “Write On!” wordmark, drawn from the brand outlines rather than typeset. */
export function Wordmark({ width = 180, color }: { width?: number; color?: string }) {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={width / WORDMARK_ASPECT}
      viewBox={WORDMARK_VIEWBOX}
      accessibilityRole="image"
      accessibilityLabel="Write On!">
      <Path d={WORDMARK_PATH} fill={color ?? colors.ink} />
    </Svg>
  );
}
