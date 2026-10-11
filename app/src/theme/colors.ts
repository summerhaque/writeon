import type { CoverColor } from '@/domain/types';

/** Brand colors from brand/BRAND.md, plus the few tints the UI needs. */
export const colors = {
  light: {
    background: '#FAF7F1',
    surface: '#FFFDF9',
    ink: '#1B1E2B',
    muted: '#5B5F70',
    faint: '#8E909B',
    accent: '#C8432B',
    link: '#2F4A7A',
    success: '#4E7A5C',
    border: '#E6DFD3',
    /** Buttons are ink in light mode. */
    primary: '#1B1E2B',
    onPrimary: '#FAF7F1',
    onAccent: '#FFFDF9',
    fill: 'rgba(27, 30, 43, 0.05)',
    fillStrong: 'rgba(27, 30, 43, 0.09)',
    accentFill: 'rgba(200, 67, 43, 0.08)',
    successFill: 'rgba(78, 122, 92, 0.1)',
    scrim: 'rgba(17, 19, 25, 0.42)',
  },
  dark: {
    background: '#111319',
    surface: '#191C25',
    ink: '#F2EDE4',
    muted: '#A9A69E',
    faint: '#77756F',
    accent: '#EE7B5F',
    link: '#9DB4E0',
    success: '#82B592',
    border: '#2A2E3A',
    /** Buttons are chalk in dark mode. */
    primary: '#F2EDE4',
    onPrimary: '#111319',
    onAccent: '#111319',
    fill: 'rgba(242, 237, 228, 0.06)',
    fillStrong: 'rgba(242, 237, 228, 0.11)',
    accentFill: 'rgba(238, 123, 95, 0.12)',
    successFill: 'rgba(130, 181, 146, 0.12)',
    scrim: 'rgba(0, 0, 0, 0.55)',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type Palette = { [K in keyof (typeof colors)['light']]: string };

/** Book cover inks. Covers are printed objects, so they don't change with the theme. */
export const coverColors: Record<CoverColor, { name: string; ink: string }> = {
  ink: { name: 'Ink', ink: '#1B1E2B' },
  vermilion: { name: 'Vermilion', ink: '#C8432B' },
  sea: { name: 'Sea', ink: '#2F4A7A' },
  moss: { name: 'Moss', ink: '#4E7A5C' },
  ochre: { name: 'Ochre', ink: '#B07D2B' },
  plum: { name: 'Plum', ink: '#6B3F5C' },
};

/** The paper and ink of a printed page: the cover, the PDF, the plates. */
export const print = {
  paper: '#FAF7F1',
  paperDeep: '#F3ECE0',
  ink: '#1B1E2B',
  muted: '#5B5F70',
  rule: '#E6DFD3',
  accent: '#C8432B',
} as const;
