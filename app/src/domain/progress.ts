import { addDays, dayKey, fromDayKey } from '@/lib/dates';

import { totalWords } from './story';
import type { LessonId, Story } from './types';
import { isBlank } from './words';

/** Words added per local day, keyed YYYY-MM-DD. */
export type Activity = Record<string, number>;

export function currentStreak(activity: Activity, today = new Date()): number {
  // Today still counts until midnight, so an empty today doesn't break the streak yet.
  let cursor = activity[dayKey(today)] ? today : addDays(today, -1);
  let streak = 0;
  while ((activity[dayKey(cursor)] ?? 0) > 0) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function bestStreak(activity: Activity): number {
  const days = Object.keys(activity)
    .filter((key) => activity[key] > 0)
    .sort();
  let best = 0;
  let run = 0;
  days.forEach((key, i) => {
    const followsPrevious = i > 0 && dayKey(addDays(fromDayKey(days[i - 1]), 1)) === key;
    run = followsPrevious ? run + 1 : 1;
    best = Math.max(best, run);
  });
  return best;
}

export interface ProgressInput {
  stories: Story[];
  activity: Activity;
  lessonsDone: Partial<Record<LessonId, number>>;
}

export type BadgeId =
  | 'first-words'
  | 'character-builder'
  | 'world-maker'
  | 'plotter'
  | 'thousand-words'
  | 'sentence-smith'
  | 'illustrator'
  | 'seven-days'
  | 'published';

export interface Badge {
  id: BadgeId;
  name: string;
  how: string;
  earned: (input: ProgressInput) => boolean;
}

const wordsWritten = ({ stories }: ProgressInput) =>
  stories.reduce((sum, story) => sum + totalWords(story), 0);

export const BADGES: Badge[] = [
  {
    id: 'first-words',
    name: 'First Words',
    how: 'Write your first ten words.',
    earned: (input) => wordsWritten(input) >= 10,
  },
  {
    id: 'character-builder',
    name: 'Character Builder',
    how: 'Fill in everything about one character.',
    earned: ({ stories }) =>
      stories.some((s) =>
        s.work.characters.some((c) => [c.name, c.wants, c.fears, c.detail].every((v) => !isBlank(v))),
      ),
  },
  {
    id: 'world-maker',
    name: 'World Maker',
    how: 'Give a setting a sight, a sound and a smell.',
    earned: ({ stories }) =>
      stories.some(({ work: { setting } }) =>
        [setting.see, setting.hear, setting.smell].every((v) => !isBlank(v)),
      ),
  },
  {
    id: 'plotter',
    name: 'Plotter',
    how: 'Plan a story from beginning to end.',
    earned: ({ stories }) =>
      stories.some((s) => Object.entries(s.work.plot).every(([k, v]) => k === 'notes' || !isBlank(v))),
  },
  {
    id: 'thousand-words',
    name: 'A Thousand Words',
    how: 'Write 1,000 words, all told.',
    earned: (input) => wordsWritten(input) >= 1000,
  },
  {
    id: 'sentence-smith',
    name: 'Sentence Smith',
    how: 'Finish three lessons.',
    earned: ({ lessonsDone }) => Object.keys(lessonsDone).length >= 3,
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    how: 'Add a photo of your own drawing.',
    earned: ({ stories }) => stories.some((s) => s.work.illustrations.some((i) => i.source === 'photo')),
  },
  {
    id: 'seven-days',
    name: 'Seven Days',
    how: 'Write seven days in a row.',
    earned: ({ activity }) => bestStreak(activity) >= 7,
  },
  {
    id: 'published',
    name: 'Published Author',
    how: 'Publish your first book.',
    earned: ({ stories }) => stories.some((s) => s.publishedAt !== null),
  },
];

export function progressTotals(input: ProgressInput, today = new Date()) {
  return {
    words: wordsWritten(input),
    finished: input.stories.filter((s) => s.publishedAt !== null).length,
    streak: currentStreak(input.activity, today),
    best: bestStreak(input.activity),
    lessons: Object.keys(input.lessonsDone).length,
  };
}
