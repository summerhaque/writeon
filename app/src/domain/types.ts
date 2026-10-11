/**
 * The Write On! domain model. Everything the app stores or ships as content
 * is described here, so screens, the store and the content files agree.
 */

export type Genre = 'fantasy' | 'scifi' | 'mystery' | 'comedy' | 'friendship';

export type StageId =
  | 'idea'
  | 'characters'
  | 'setting'
  | 'conflict'
  | 'plot'
  | 'writing'
  | 'revising'
  | 'illustrating'
  | 'publishing';

export type StageStatus = 'not-started' | 'in-progress' | 'done';

/** "What's already in your head?" Decides where the roadmap starts. */
export type Spark = 'character' | 'place' | 'what-if' | 'nothing';

/** "How should readers feel on the last page?" */
export type Feeling = 'brave' | 'laughing' | 'surprised' | 'warm';

/** "How long should it be?" */
export type Length = 'short' | 'chapter';

export type PlateId =
  | 'tower'
  | 'forest-door'
  | 'rocket'
  | 'red-planet'
  | 'old-house'
  | 'lamplit-street'
  | 'lighthouse'
  | 'bus-stop'
  | 'birthday-cake'
  | 'treehouse'
  | 'kite-hill'
  | 'snowy-peak';

export type CoverTemplate = 'classic' | 'band' | 'plate' | 'minimal';
export type CoverColor = 'ink' | 'vermilion' | 'sea' | 'moss' | 'ochre' | 'plum';

export type CharacterRole = 'protagonist' | 'antagonist' | 'sidekick' | 'other';

/** Who or what stands in the way. */
export type ConflictKind = 'person' | 'nature' | 'self' | 'world';

export type RevisionCheck =
  'read-aloud' | 'strong-start' | 'show-dont-tell' | 'senses' | 'dialogue' | 'cut-repeats' | 'spelling';

export type LessonId = 'simile' | 'hyperbole' | 'word-choice' | 'senses' | 'dialogue' | 'show-dont-tell';

// ---------------------------------------------------------------------------
// A student's story
// ---------------------------------------------------------------------------

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  /** What they want more than anything. */
  wants: string;
  /** What they're afraid of. */
  fears: string;
  /** One detail a reader would remember: how they talk, look, or move. */
  detail: string;
}

export interface Chapter {
  id: string;
  title: string;
  body: string;
}

export interface Illustration {
  id: string;
  source: 'plate' | 'photo';
  plateId: PlateId | null;
  /** Local file URI of a photographed drawing. */
  uri: string | null;
  caption: string;
  /** The chapter this picture sits after, or null for "not placed yet". */
  chapterId: string | null;
}

/** The book's title lives on the story; the cover holds everything else. */
export interface Cover {
  template: CoverTemplate;
  color: CoverColor;
  author: string;
  plateId: PlateId | null;
}

export interface IdeaWork {
  whatIf: string;
  pitch: string;
  why: string;
  notes: string;
}

export interface SettingWork {
  place: string;
  time: string;
  see: string;
  hear: string;
  smell: string;
  special: string;
  notes: string;
}

export interface ConflictWork {
  obstacle: string;
  kind: ConflictKind | null;
  stakes: string;
  notes: string;
}

export interface PlotWork {
  beginning: string;
  problem: string;
  rising: string;
  climax: string;
  ending: string;
  notes: string;
}

export interface StoryWork {
  idea: IdeaWork;
  characters: Character[];
  characterNotes: string;
  setting: SettingWork;
  conflict: ConflictWork;
  plot: PlotWork;
  chapters: Chapter[];
  revising: { checks: Partial<Record<RevisionCheck, boolean>>; notes: string };
  illustrations: Illustration[];
  publishing: { about: string; dedication: string };
}

export interface Roadmap {
  spark: Spark;
  feeling: Feeling;
  length: Length;
  /** Stages in the suggested order, starting with the recommended one. */
  order: StageId[];
  /** The personalized first prompt for each stage. */
  prompts: Record<StageId, string>;
  wordGoal: number;
  chapterCount: number;
}

export interface Story {
  id: string;
  title: string;
  genre: Genre;
  createdAt: number;
  updatedAt: number;
  roadmap: Roadmap;
  work: StoryWork;
  /** Stages the writer marked done, with the time they did it. */
  completed: Partial<Record<StageId, number>>;
  cover: Cover;
  publishedAt: number | null;
}

// ---------------------------------------------------------------------------
// Shipped content
// ---------------------------------------------------------------------------

export interface StageCoachScript {
  /** "What is this stage?" in two or three short sentences, writer to writer. */
  explain: string;
  /** Questions the coach can open the stage with. */
  openers: string[];
  /** Questions aimed at one empty field, keyed by the field keys in COACH_FIELDS. */
  fieldQuestions: Record<string, string[]>;
  /** Genre flavor: an opener, plus three hints that get more concrete. */
  genre: Record<Genre, { opener: string; hints: readonly [string, string, string] }>;
  /** Short, specific encouragement once the writer has something down. */
  nudges: string[];
}

export interface CoachLibrary {
  stages: Record<StageId, StageCoachScript>;
  /** Replies to "just write it for me". The coach hands the pen back. */
  handBack: string[];
  /** All three hints used up for this spot. */
  outOfHints: string[];
  /** The coach didn't understand the message. */
  fallback: string[];
}

export interface RoadmapLibrary {
  /** The personalized first prompt for each stage, per genre. */
  prompts: Record<StageId, Record<Genre, string>>;
  feeling: Record<Feeling, { label: string; plotLine: string; revisingLine: string }>;
  /** Why the roadmap starts where it does. */
  spark: Record<Spark, { label: string; startLine: string }>;
}

export interface Lesson {
  id: LessonId;
  title: string;
  tagline: string;
  minutes: number;
  explain: string[];
  examples: { before: string; after: string; note: string }[];
  /** The instruction shown while the writer rewrites their sentence. */
  tryPrompt: string;
  /** A one-line reminder shown under the rewrite box. */
  tip: string;
  /** Used when the writer has no sentences of their own yet. */
  practiceSentences: string[];
  feedback: { pass: string[]; tryAgain: string[]; unchanged: string };
}

export interface SampleBook {
  id: string;
  title: string;
  genre: Genre;
  author: { name: string; age: number; about: string };
  cover: { template: CoverTemplate; color: CoverColor; plateId: PlateId | null };
  dedication: string;
  chapters: { title: string; body: string; plateId?: PlateId; caption?: string }[];
}

export interface Plate {
  id: PlateId;
  title: string;
  genres: Genre[];
  /** Self-contained SVG markup, viewBox 0 0 400 300. */
  svg: string;
}

export interface DailySpark {
  genre: Genre;
  prompt: string;
}

/** The half-finished story a new writer finds on their desk. */
export interface SeedStoryContent {
  title: string;
  genre: Genre;
  spark: Spark;
  feeling: Feeling;
  length: Length;
  work: StoryWork;
  completed: StageId[];
  cover: Pick<Cover, 'template' | 'color' | 'plateId'>;
}
