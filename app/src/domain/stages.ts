import type { Genre, Length, StageId } from './types';

export interface StageMeta {
  id: StageId;
  number: number;
  name: string;
  /** What the stage is for, in a few words. */
  blurb: string;
}

export const STAGES: StageMeta[] = [
  { id: 'idea', number: 1, name: 'Idea', blurb: 'The what-if that starts it all' },
  { id: 'characters', number: 2, name: 'Characters', blurb: 'Who it happens to' },
  { id: 'setting', number: 3, name: 'Setting', blurb: 'Where and when' },
  { id: 'conflict', number: 4, name: 'Conflict', blurb: 'What stands in the way' },
  { id: 'plot', number: 5, name: 'Plot', blurb: 'What happens, start to finish' },
  { id: 'writing', number: 6, name: 'Writing', blurb: 'The words themselves' },
  { id: 'revising', number: 7, name: 'Revising', blurb: 'Make every sentence pull its weight' },
  { id: 'illustrating', number: 8, name: 'Illustrating', blurb: 'Pictures for the pages' },
  { id: 'publishing', number: 9, name: 'Publishing', blurb: 'A cover, a title page, a real book' },
];

export const STAGE_IDS = STAGES.map((stage) => stage.id);

export const STAGE_BY_ID = Object.fromEntries(STAGES.map((s) => [s.id, s])) as Record<StageId, StageMeta>;

export function isStageId(value: unknown): value is StageId {
  return typeof value === 'string' && value in STAGE_BY_ID;
}

export const GENRES: Record<Genre, { name: string; line: string }> = {
  fantasy: { name: 'Fantasy', line: 'Old magic, hidden doors, brave hearts' },
  scifi: { name: 'Sci-Fi', line: 'Rockets, robots and what comes next' },
  mystery: { name: 'Mystery', line: 'A question nobody can answer. Yet.' },
  comedy: { name: 'Comedy', line: 'Everything goes wrong, gloriously' },
  friendship: { name: 'Friendship', line: 'Two people and the thing between them' },
};

export const GENRE_IDS = Object.keys(GENRES) as Genre[];

export const LENGTHS: Record<Length, { name: string; detail: string; chapters: number; words: number }> = {
  short: { name: 'A short story', detail: '3 chapters, about 600 words', chapters: 3, words: 600 },
  chapter: { name: 'A chapter book', detail: '5 chapters, about 1,500 words', chapters: 5, words: 1500 },
};
