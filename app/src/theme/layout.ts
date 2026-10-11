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

/** Round, friendly corners. */
export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

/** Soft shadows instead of heavy borders. */
export const shadow = {
  sm: {
    shadowColor: '#12354F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#12354F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  lg: {
    shadowColor: '#12354F',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 34,
    elevation: 9,
  },
} as const;

export const hairline = StyleSheet.hairlineWidth;

/** Readable line length on tablets. */
export const MAX_CONTENT_WIDTH = 640;
