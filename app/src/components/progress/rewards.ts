import { BADGES, type BadgeId, type ProgressInput } from '@/domain/progress';
import { STAGE_IDS } from '@/domain/stages';
import { stageStatus } from '@/domain/story';

/** One star for every stage a writer finishes, in any story. */
export function starsEarned({ stories }: ProgressInput): number {
  return stories.reduce(
    (sum, story) => sum + STAGE_IDS.filter((stage) => stageStatus(story, stage) === 'done').length,
    0,
  );
}

/** Points reward the work: every word, every finished stage, every lesson, every book. */
export function pointsEarned(input: ProgressInput, words: number): number {
  const lessons = Object.keys(input.lessonsDone).length;
  const books = input.stories.filter((s) => s.publishedAt !== null).length;
  return words + starsEarned(input) * 25 + lessons * 50 + books * 200;
}

export function earnedBadgeIds(input: ProgressInput): BadgeId[] {
  return BADGES.filter((badge) => badge.earned(input)).map((badge) => badge.id);
}

// Badges already celebrated this session. Set when the writer signs in or the app opens,
// so only badges earned from then on pop on the Progress screen.
let celebrated: Set<BadgeId> | null = null;

export function rememberEarnedBadges(input: ProgressInput) {
  celebrated = new Set(earnedBadgeIds(input));
}

/** Badges earned since they were last celebrated. Marks them as celebrated. */
export function takeNewBadges(input: ProgressInput): BadgeId[] {
  const earned = earnedBadgeIds(input);
  if (!celebrated) {
    celebrated = new Set(earned);
    return [];
  }
  const fresh = earned.filter((id) => !celebrated!.has(id));
  fresh.forEach((id) => celebrated!.add(id));
  return fresh;
}
