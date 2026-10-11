import { makeId } from '@/lib/ids';

import { buildRoadmap } from './roadmap';
import { STAGE_IDS } from './stages';
import type {
  Chapter,
  CoverColor,
  Feeling,
  Genre,
  Length,
  RevisionCheck,
  Spark,
  StageId,
  StageStatus,
  Story,
  StoryWork,
} from './types';
import { countWords, isBlank, plural } from './words';

export const UNTITLED = 'Untitled story';

/** A new book starts in its genre's color. The writer can change it on the cover. */
const GENRE_COVER: Record<Genre, CoverColor> = {
  fantasy: 'violet',
  scifi: 'teal',
  mystery: 'indigo',
  comedy: 'amber',
  friendship: 'rose',
};

const NUMBER_WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export function chapterHeading(index: number): string {
  return `Chapter ${NUMBER_WORDS[index] ?? index + 1}`;
}

export function chapterTitle(chapter: Chapter, index: number): string {
  return chapter.title.trim() || chapterHeading(index);
}

export function newChapter(): Chapter {
  return { id: makeId('ch'), title: '', body: '' };
}

export function emptyWork(chapterCount: number): StoryWork {
  return {
    idea: { whatIf: '', pitch: '', why: '', notes: '' },
    characters: [],
    characterNotes: '',
    setting: { place: '', time: '', see: '', hear: '', smell: '', special: '', notes: '' },
    conflict: { obstacle: '', kind: null, stakes: '', notes: '' },
    plot: { beginning: '', problem: '', rising: '', climax: '', ending: '', notes: '' },
    chapters: Array.from({ length: chapterCount }, newChapter),
    revising: { checks: {}, notes: '' },
    illustrations: [],
    publishing: { about: '', dedication: '' },
  };
}

export interface NewStoryInput {
  genre: Genre;
  spark: Spark;
  feeling: Feeling;
  length: Length;
  author: string;
  title?: string;
  whatIf?: string;
}

export function createStory(input: NewStoryInput, now = Date.now()): Story {
  const roadmap = buildRoadmap(input);
  const work = emptyWork(roadmap.chapterCount);
  if (input.whatIf) work.idea.whatIf = input.whatIf;
  const title = input.title?.trim() ?? '';
  return {
    id: makeId('story'),
    title,
    genre: input.genre,
    createdAt: now,
    updatedAt: now,
    roadmap,
    work,
    completed: {},
    cover: { template: 'classic', color: GENRE_COVER[input.genre], author: input.author, plateId: null },
    publishedAt: null,
  };
}

export function displayTitle(story: Pick<Story, 'title'>): string {
  return story.title.trim() || UNTITLED;
}

// ---------------------------------------------------------------------------
// Words
// ---------------------------------------------------------------------------

/** Every piece of writing in a story, for "words written". */
function allText(work: StoryWork): string[] {
  return [
    ...Object.values(work.idea),
    ...work.characters.flatMap((c) => [c.name, c.wants, c.fears, c.detail]),
    work.characterNotes,
    ...Object.values(work.setting),
    work.conflict.obstacle,
    work.conflict.stakes,
    work.conflict.notes,
    ...Object.values(work.plot),
    ...work.chapters.flatMap((c) => [c.title, c.body]),
    work.revising.notes,
    ...work.illustrations.map((i) => i.caption),
    work.publishing.about,
    work.publishing.dedication,
  ];
}

export function totalWords(story: Story): number {
  return allText(story.work).reduce((sum, text) => sum + countWords(text), 0);
}

/** Words in the chapters themselves: the book. */
export function manuscriptWords(story: Story): number {
  return story.work.chapters.reduce((sum, c) => sum + countWords(c.body), 0);
}

export function wordGoalPerChapter(story: Story): number {
  const chapters = Math.max(1, story.work.chapters.length);
  return Math.round(story.roadmap.wordGoal / chapters / 10) * 10;
}

// ---------------------------------------------------------------------------
// Stages
// ---------------------------------------------------------------------------

function anyFilled(values: (string | null)[]): boolean {
  return values.some((value) => !isBlank(value));
}

export function stageHasContent(story: Story, stage: StageId): boolean {
  const { work } = story;
  switch (stage) {
    case 'idea':
      return anyFilled(Object.values(work.idea));
    case 'characters':
      return work.characters.length > 0 || !isBlank(work.characterNotes);
    case 'setting':
      return anyFilled(Object.values(work.setting));
    case 'conflict':
      return (
        anyFilled([work.conflict.obstacle, work.conflict.stakes, work.conflict.notes]) || !!work.conflict.kind
      );
    case 'plot':
      return anyFilled(Object.values(work.plot));
    case 'writing':
      return work.chapters.some((c) => !isBlank(c.body));
    case 'revising':
      return Object.values(work.revising.checks).some(Boolean) || !isBlank(work.revising.notes);
    case 'illustrating':
      return work.illustrations.length > 0;
    case 'publishing':
      return story.publishedAt !== null || anyFilled([work.publishing.about, work.publishing.dedication]);
  }
}

export function stageStatus(story: Story, stage: StageId): StageStatus {
  if (stage === 'publishing' && story.publishedAt) return 'done';
  if (story.completed[stage]) return 'done';
  return stageHasContent(story, stage) ? 'in-progress' : 'not-started';
}

export function completedCount(story: Story): number {
  return STAGE_IDS.filter((stage) => stageStatus(story, stage) === 'done').length;
}

/** The first stage on the writer's roadmap that isn't done yet. */
export function nextStage(story: Story): StageId | null {
  return story.roadmap.order.find((stage) => stageStatus(story, stage) !== 'done') ?? null;
}

export const REVISION_CHECKS: { id: RevisionCheck; label: string; detail: string }[] = [
  { id: 'read-aloud', label: 'Read it out loud', detail: 'Your ear catches what your eyes skip.' },
  { id: 'strong-start', label: 'The first line pulls you in', detail: 'Would a stranger keep reading?' },
  {
    id: 'show-dont-tell',
    label: 'Show, don’t tell',
    detail: 'Swap one “she was scared” for what scared looks like.',
  },
  { id: 'senses', label: 'Use more than your eyes', detail: 'A sound, a smell, a texture.' },
  {
    id: 'dialogue',
    label: 'Characters sound like themselves',
    detail: 'Could you tell who’s talking without the names?',
  },
  { id: 'cut-repeats', label: 'Cut the repeats', detail: 'Same word twice in a row? Same idea twice?' },
  {
    id: 'spelling',
    label: 'Spelling and punctuation',
    detail: 'Last, not first. Fix the story before the commas.',
  },
];

export function stageSummary(story: Story, stage: StageId): string {
  const { work } = story;
  const status = stageStatus(story, stage);
  switch (stage) {
    case 'characters':
      return work.characters.length > 0 ? plural(work.characters.length, 'character') : statusLabel(status);
    case 'writing': {
      const words = manuscriptWords(story);
      return words > 0
        ? `${plural(words, 'word')} of ${story.roadmap.wordGoal.toLocaleString('en-US')}`
        : statusLabel(status);
    }
    case 'revising': {
      const done = REVISION_CHECKS.filter((c) => work.revising.checks[c.id]).length;
      return done > 0 ? `${done} of ${REVISION_CHECKS.length} checks` : statusLabel(status);
    }
    case 'illustrating':
      return work.illustrations.length > 0
        ? plural(work.illustrations.length, 'picture')
        : statusLabel(status);
    default:
      return statusLabel(status);
  }
}

function statusLabel(status: StageStatus): string {
  if (status === 'done') return 'Done';
  if (status === 'in-progress') return 'In progress';
  return 'Not started';
}

// ---------------------------------------------------------------------------
// Publishing
// ---------------------------------------------------------------------------

export interface PublishCheck {
  id: 'title' | 'words' | 'author';
  label: string;
  ok: boolean;
}

export function publishChecks(story: Story): PublishCheck[] {
  return [
    { id: 'title', label: 'Your book has a title', ok: !isBlank(story.title) },
    { id: 'author', label: 'Your name is on the cover', ok: !isBlank(story.cover.author) },
    { id: 'words', label: 'At least one chapter has words in it', ok: manuscriptWords(story) > 0 },
  ];
}

export function canPublish(story: Story): boolean {
  return publishChecks(story).every((check) => check.ok);
}
