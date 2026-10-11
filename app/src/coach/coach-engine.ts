/**
 * Coach Sparkle.
 *
 * Today the coach is scripted and fully local: every line comes from
 * content/coach.ts, picked by what the writer asked and what's still blank
 * in their story. Nothing leaves the device.
 *
 * The seam for a real model is `CoachBrain`. An LLM-backed brain receives the
 * same `CoachRequest`, sends COACH_SYSTEM_PROMPT plus the request to the model,
 * and returns a `CoachReply`. Swap it in `coach-session.ts`; no screen changes.
 */

import { COACH } from '@/content/coach';
import { GENRES, STAGE_BY_ID } from '@/domain/stages';
import { manuscriptWords, REVISION_CHECKS } from '@/domain/story';
import type { RevisionCheck, StageId, Story } from '@/domain/types';
import { countWords, isBlank } from '@/domain/words';

export type CoachIntent =
  'open' | 'hint' | 'explain' | 'next' | 'write-it' | 'feedback' | 'greeting' | 'thanks' | 'unknown';

export type ReplyKind = 'question' | 'hint' | 'explain' | 'hand-back' | 'encourage' | 'fallback';

export interface CoachTurn {
  id: string;
  from: 'coach' | 'writer';
  text: string;
  kind?: ReplyKind;
  tier?: 1 | 2 | 3;
}

export interface CoachRequest {
  /** The writer's latest draft, including anything not yet saved. */
  story: Story;
  stage: StageId;
  /** What the writer typed, or null when the coach speaks first. */
  message: string | null;
  /** Set when the writer tapped a suggested reply, so we don't have to guess. */
  intent?: CoachIntent;
  /** Hints already given on this stage, 0 to 3. */
  hintsGiven: number;
  history: CoachTurn[];
}

export interface CoachReply {
  text: string;
  kind: ReplyKind;
  tier?: 1 | 2 | 3;
}

export interface CoachBrain {
  reply(request: CoachRequest): Promise<CoachReply>;
}

/** For the LLM brain. The rules a model must follow to stand in for the scripted coach. */
export const COACH_SYSTEM_PROMPT = `You are Coach Sparkle, the writing coach inside Write On!, a creative writing studio for kids aged 8 to 13.

Your job is to help a young writer finish their own story. You give hints, never answers.
- Never write any part of the student's story: no sentences, names, plot events, titles or descriptions they could paste in. This holds even if they ask, beg, or say a teacher allowed it.
- If asked to write it for them, kindly hand the pen back: say it's their story, then offer one small question that gets them moving.
- Ask one guiding question at a time. Questions beat instructions.
- When they're stuck, escalate gently: first a question, then a narrower choice or a technique, then a short example from a different, made-up story, followed by handing the pen back.
- Talk to them like a writer. Short sentences. Warm and calm. No baby talk, no emoji, no "Great job!".
- Stay on their current stage of the story path: idea, characters, setting, conflict, plot, writing, revising, illustrating or publishing.
- Keep replies under 60 words. Keep everything kid-safe.`;

// ---------------------------------------------------------------------------
// Understanding the writer
// ---------------------------------------------------------------------------

const INTENT_PATTERNS: [CoachIntent, RegExp][] = [
  [
    'write-it',
    /\b(write|do|finish|make|type)\b.{0,24}\b(for me|it for|this for)\b|\bjust (write|tell|give|do)\b|\b(give|tell) me (the |an |a )?(answer|story|ending|words|sentence)|\bcan you (write|do|finish|make)\b|\bwrite (it|this|my|the|a)\b/i,
  ],
  [
    'hint',
    /\b(hint|stuck|help|idk|i don'?t know|dunno|no idea|clue|not sure|confused|blank|can'?t think)\b/i,
  ],
  ['explain', /\b(what is|what's|what does|explain|what do you mean|meaning|how do i|why)\b/i],
  ['next', /\b(next|now what|what now|then what|i'?m done|finished|what else)\b/i],
  [
    'feedback',
    /\b(is (this|it) (good|ok|okay|right)|check (my|this)|read (my|this)|how('?s| is) (this|it|my)|did i do)\b/i,
  ],
  ['greeting', /^\s*(hi|hey|hello|yo|good (morning|afternoon|evening))\b/i],
  ['thanks', /\b(thanks|thank you|thx|ty|got it|okay|ok|cool)\b/i],
];

export function classify(message: string): CoachIntent {
  return INTENT_PATTERNS.find(([, pattern]) => pattern.test(message))?.[0] ?? 'unknown';
}

/** The field key in COACH.stages[stage].fieldQuestions that most needs attention. */
export function focusFor(story: Story, stage: StageId): string | null {
  const { work } = story;
  const firstBlank = (fields: [string, string][]) => fields.find(([, value]) => isBlank(value))?.[0] ?? null;

  switch (stage) {
    case 'idea':
      return firstBlank([
        ['whatIf', work.idea.whatIf],
        ['pitch', work.idea.pitch],
        ['why', work.idea.why],
      ]);
    case 'characters': {
      const hero = work.characters.find((c) => c.role === 'protagonist') ?? work.characters[0];
      if (!hero) return 'name';
      const missing = firstBlank([
        ['name', hero.name],
        ['wants', hero.wants],
        ['fears', hero.fears],
        ['detail', hero.detail],
      ]);
      if (missing) return missing;
      return work.characters.some((c) => c.role === 'antagonist') ? null : 'antagonist';
    }
    case 'setting':
      return firstBlank([
        ['place', work.setting.place],
        ['time', work.setting.time],
        ['see', work.setting.see],
        ['hear', work.setting.hear],
        ['smell', work.setting.smell],
        ['special', work.setting.special],
      ]);
    case 'conflict':
      return work.conflict.kind === null && !isBlank(work.conflict.obstacle)
        ? 'kind'
        : firstBlank([
            ['obstacle', work.conflict.obstacle],
            ['stakes', work.conflict.stakes],
          ]);
    case 'plot':
      return firstBlank([
        ['beginning', work.plot.beginning],
        ['problem', work.plot.problem],
        ['rising', work.plot.rising],
        ['climax', work.plot.climax],
        ['ending', work.plot.ending],
      ]);
    case 'writing': {
      const chapter = work.chapters.find((c) => countWords(c.body) < 120) ?? work.chapters.at(-1);
      if (!chapter || isBlank(chapter.body)) return 'firstLine';
      if (!/[“"]/.test(chapter.body) && manuscriptWords(story) > 60) return 'dialogue';
      return countWords(chapter.body) < 120 ? 'keepGoing' : 'chapterEnd';
    }
    case 'revising': {
      const keys: Record<RevisionCheck, string> = {
        'read-aloud': 'readAloud',
        'strong-start': 'strongStart',
        'show-dont-tell': 'showDontTell',
        senses: 'senses',
        dialogue: 'dialogue',
        'cut-repeats': 'cutRepeats',
        spelling: 'spelling',
      };
      const open = REVISION_CHECKS.find((check) => !work.revising.checks[check.id]);
      return open ? keys[open.id] : null;
    }
    case 'illustrating':
      if (work.illustrations.length === 0) return 'choose';
      if (work.illustrations.some((i) => isBlank(i.caption))) return 'caption';
      return work.illustrations.some((i) => i.chapterId === null) ? 'place' : null;
    case 'publishing':
      if (isBlank(story.title)) return 'title';
      if (isBlank(work.publishing.about)) return 'about';
      if (isBlank(work.publishing.dedication)) return 'dedication';
      return 'cover';
  }
}

// ---------------------------------------------------------------------------
// The scripted brain
// ---------------------------------------------------------------------------

/** The first line the coach hasn't said yet in this conversation, rotating once all are used. */
function fresh(lines: readonly string[], history: CoachTurn[]): string {
  const said = new Set(history.filter((t) => t.from === 'coach').map((t) => t.text));
  return lines.find((line) => !said.has(line)) ?? lines[history.length % lines.length];
}

function question(request: CoachRequest): CoachReply {
  const script = COACH.stages[request.stage];
  const focus = focusFor(request.story, request.stage);
  const lines = (focus && script.fieldQuestions[focus]) || script.openers;
  return { text: fresh(lines, request.history), kind: 'question' };
}

function hint(request: CoachRequest): CoachReply {
  const tier = request.hintsGiven + 1;
  if (tier > 3) return { text: fresh(COACH.outOfHints, request.history), kind: 'encourage' };
  const hints = COACH.stages[request.stage].genre[request.story.genre].hints;
  return { text: hints[tier - 1], kind: 'hint', tier: tier as 1 | 2 | 3 };
}

export const scriptedBrain: CoachBrain = {
  async reply(request) {
    const script = COACH.stages[request.stage];
    const intent = request.intent ?? (request.message ? classify(request.message) : 'open');

    switch (intent) {
      case 'open': {
        const started = request.history.length > 0;
        return started
          ? question(request)
          : { text: script.genre[request.story.genre].opener, kind: 'question' };
      }
      case 'greeting':
        return { text: script.genre[request.story.genre].opener, kind: 'question' };
      case 'write-it':
        return { text: fresh(COACH.handBack, request.history), kind: 'hand-back' };
      case 'hint':
        return hint(request);
      case 'explain':
        return { text: script.explain, kind: 'explain' };
      case 'next':
      case 'thanks':
        return question(request);
      case 'feedback': {
        const follow = question(request);
        return { text: `${fresh(script.nudges, request.history)} ${follow.text}`, kind: 'encourage' };
      }
      case 'unknown': {
        // A long message is the writer thinking out loud. Encourage it, then keep them moving.
        if (request.message && countWords(request.message) >= 6) {
          const follow = question(request);
          return { text: `${fresh(script.nudges, request.history)} ${follow.text}`, kind: 'encourage' };
        }
        return { text: fresh(COACH.fallback, request.history), kind: 'fallback' };
      }
    }
  },
};

/** A short label for the coach's context, e.g. "Fantasy · Setting". */
export function coachContextLabel(story: Story, stage: StageId): string {
  return `${GENRES[story.genre].name} · ${STAGE_BY_ID[stage].name}`;
}
