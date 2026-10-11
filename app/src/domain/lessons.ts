import { LESSONS } from '@/content/lessons';

import type { Lesson, LessonId, Story } from './types';
import { countWords, splitSentences } from './words';

export const LESSON_BY_ID = Object.fromEntries(LESSONS.map((lesson) => [lesson.id, lesson])) as Record<
  LessonId,
  Lesson
>;

export function isLessonId(value: unknown): value is LessonId {
  return typeof value === 'string' && value in LESSON_BY_ID;
}

// ---------------------------------------------------------------------------
// The writer's own sentences
// ---------------------------------------------------------------------------

export interface OwnSentence {
  storyId: string;
  chapterId: string;
  text: string;
}

/** Sentences from the writer's chapters that are worth practising on. */
export function ownSentences(stories: Story[]): OwnSentence[] {
  return stories.flatMap((story) =>
    story.work.chapters.flatMap((chapter) =>
      splitSentences(chapter.body)
        .filter((text) => {
          const words = countWords(text);
          return words >= 3 && words <= 40;
        })
        .map((text) => ({ storyId: story.id, chapterId: chapter.id, text })),
    ),
  );
}

/** Swap one sentence in a chapter. Returns null if the sentence has changed since it was picked. */
export function replaceSentence(
  story: Story,
  chapterId: string,
  before: string,
  after: string,
): Story | null {
  const chapter = story.work.chapters.find((c) => c.id === chapterId);
  const at = chapter?.body.indexOf(before) ?? -1;
  if (!chapter || at < 0) return null;
  const body = chapter.body.slice(0, at) + after + chapter.body.slice(at + before.length);
  return {
    ...story,
    work: {
      ...story.work,
      chapters: story.work.chapters.map((c) => (c.id === chapterId ? { ...c, body } : c)),
    },
  };
}

// ---------------------------------------------------------------------------
// Checking a rewrite. Light-touch on purpose: the goal is a nudge, not a grade.
// ---------------------------------------------------------------------------

export type Verdict = 'pass' | 'try-again' | 'unchanged';

const count = (text: string, pattern: RegExp) => text.match(new RegExp(pattern.source, 'gi'))?.length ?? 0;

const WEAK_WORDS = /\b(very|really|went|got|get|nice|good|bad|big|small|thing|things|stuff|a lot|lots)\b/;
const SENSE_WORDS =
  /\b(smell\w*|scent\w*|stink\w*|taste\w*|sweet|sour|bitter|salty|crunch\w*|crackl\w*|creak\w*|buzz\w*|hum\w*|whisper\w*|roar\w*|squeak\w*|rumbl\w*|thump\w*|rustl\w*|hiss\w*|echo\w*|loud|quiet|silen\w*|rough|smooth|sticky|slimy|fuzzy|prickl\w*|tingl\w*|cold|warm|icy|soft|damp|wet|sharp|itch\w*|sound\w*|nois\w*|ring\w*)\b/;
const EXAGGERATION =
  /\b(million\w*|billion\w*|trillion\w*|thousand\w*|hundred\w*|forever|eternity|ever|entire|whole (world|school|town|city|planet|universe)|everyone|everybody|nobody|tons?|so \w+ (that|the))\b|\d{3,}/;
const TELLING =
  /\b(was|were|felt|feels?|is|am|are|got|looked)\s+(very\s+|really\s+|so\s+|super\s+)?(sad|happy|angry|mad|scared|afraid|nervous|excited|tired|bored|worried|upset|lonely|surprised|embarrassed|jealous|brave|frightened|glad|terrified|furious|shy|cold|hungry)\b/;
const QUOTE = /[“”"]/;

export function checkRewrite(id: LessonId, before: string, after: string): Verdict {
  const normalize = (text: string) => text.trim().replace(/\s+/g, ' ').toLowerCase();
  if (normalize(after) === normalize(before)) return 'unchanged';
  if (countWords(after) < 2) return 'try-again';

  switch (id) {
    case 'simile':
      return /\blike\b|\bas\b.+\bas\b/i.test(after) ? 'pass' : 'try-again';
    case 'hyperbole':
      return count(after, EXAGGERATION) > count(before, EXAGGERATION) ? 'pass' : 'try-again';
    case 'word-choice':
      return count(after, WEAK_WORDS) < count(before, WEAK_WORDS) || count(after, WEAK_WORDS) === 0
        ? 'pass'
        : 'try-again';
    case 'senses':
      return count(after, SENSE_WORDS) > count(before, SENSE_WORDS) ? 'pass' : 'try-again';
    case 'dialogue':
      return QUOTE.test(after) && count(after, QUOTE) >= 2 ? 'pass' : 'try-again';
    case 'show-dont-tell':
      return count(after, TELLING) < count(before, TELLING) ||
        (count(after, TELLING) === 0 && countWords(after) > countWords(before))
        ? 'pass'
        : 'try-again';
  }
}
