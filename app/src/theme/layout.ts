import { StyleSheet } from 'react-native';

/** A 4-point spacing system. Screens use `gutter` on both sides. */
export const space = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const gutter = space.lg;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const hairline = StyleSheet.hairlineWidth;

/** Readable line length on tablets. */
export const MAX_CONTENT_WIDTH = 640;

export const fill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;
