import type { CoverColor, Genre } from '@/domain/types';

/**
 * Brand colors from brand/BRAND.md. Light is the default; dark is the alternative.
 * Components use only these semantic names.
 */
export const colors = {
  light: {
    bg: '#F4F9FD',
    bgAlt: '#E9F3FB',
    surface: '#FFFFFF',
    surfaceAlt: '#FBFDFF',
    surfaceInk: '#12354F',
    onSurfaceInk: '#EAF2FA',
    ink: '#12354F',
    inkMuted: '#4D6480',
    inkFaint: '#6E8299',
    primary: '#1F6FB2',
    primaryHover: '#2E7FC2',
    primaryOn: '#FFFFFF',
    primarySoft: '#E9F3FB',
    link: '#1F6FB2',
    /** Amber: progress and rewards only. */
    accent: '#F2A65A',
    accentOn: '#12354F',
    accentSoft: '#FDEFE0',
    /** Amber dark enough to read as text on white (4.6:1). */
    accentText: '#B4651A',
    success: '#2E7D5B',
    successSoft: '#E3F3EC',
    warning: '#B4651A',
    error: '#C2453F',
    border: '#DCE8F3',
    borderStrong: '#C2D6E8',
    fill: 'rgba(18, 53, 79, 0.05)',
    fillStrong: 'rgba(18, 53, 79, 0.09)',
    scrim: 'rgba(18, 53, 79, 0.45)',
    /** The written lines in the logo. */
    sky: '#97CDF4',
  },
  dark: {
    bg: '#0D1B2A',
    bgAlt: '#101F31',
    surface: '#13263A',
    surfaceAlt: '#19304A',
    surfaceInk: '#19304A',
    onSurfaceInk: '#EAF2FA',
    ink: '#EAF2FA',
    inkMuted: '#A9BED4',
    inkFaint: '#8098B2',
    primary: '#6FB2E8',
    primaryHover: '#8FC6F0',
    primaryOn: '#0D1B2A',
    primarySoft: '#15304A',
    link: '#8FC6F0',
    accent: '#F2A65A',
    accentOn: '#0D1B2A',
    accentSoft: '#38291A',
    accentText: '#F2A65A',
    success: '#6FC79C',
    successSoft: '#13342A',
    warning: '#E8A24E',
    error: '#EC7B74',
    border: '#24405C',
    borderStrong: '#33557A',
    fill: 'rgba(234, 242, 250, 0.06)',
    fillStrong: 'rgba(234, 242, 250, 0.11)',
    scrim: 'rgba(0, 0, 0, 0.55)',
    sky: '#BFE0FA',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type Palette = { [K in keyof (typeof colors)['light']]: string };

/** Each kind of story has its own color, used on genre cards, roadmaps and book spines. */
export const genreColors: Record<Genre, { fg: string; soft: string; icon: string }> = {
  fantasy: { fg: '#6B4FD0', soft: '#EFEAFC', icon: 'sparkles-outline' },
  scifi: { fg: '#0E7E99', soft: '#E0F3F8', icon: 'planet-outline' },
  mystery: { fg: '#4A5BA8', soft: '#E8EBF8', icon: 'search-outline' },
  comedy: { fg: '#B4651A', soft: '#FBEEDF', icon: 'happy-outline' },
  friendship: { fg: '#C2453F', soft: '#FBE7E6', icon: 'heart-outline' },
};

/** The nine stages on one blue ramp, so progress reads as a journey. */
export const stageColors = [
  '#C9E5FB',
  '#AFD9F8',
  '#97CDF4',
  '#7DBDEE',
  '#63ADE7',
  '#4A9CDD',
  '#3789CE',
  '#2A76B8',
  '#1F6FB2',
] as const;

/** Stages light enough that a mark on them should be navy, not white. */
export const stageInkIsDark = (index: number) => index < 5;

/** Book cover inks. Covers are printed objects, so they don't change with the theme. */
export const coverColors: Record<CoverColor, { name: string; ink: string }> = {
  navy: { name: 'Navy', ink: '#12354F' },
  blue: { name: 'Blue', ink: '#1F6FB2' },
  violet: { name: 'Violet', ink: '#6B4FD0' },
  teal: { name: 'Teal', ink: '#0E7E99' },
  indigo: { name: 'Indigo', ink: '#4A5BA8' },
  amber: { name: 'Amber', ink: '#B4651A' },
  rose: { name: 'Rose', ink: '#C2453F' },
};

/** The paper and ink of a printed page: the cover, the PDF, the plates. */
export const print = {
  paper: '#FFFFFF',
  paperTint: '#F4F9FD',
  ink: '#12354F',
  muted: '#4D6480',
  rule: '#DCE8F3',
  primary: '#1F6FB2',
  accent: '#F2A65A',
  accentDeep: '#D9842F',
  accentText: '#B4651A',
  onCover: '#FFFFFF',
} as const;
