import { SEED_PUBLISHED, SEED_STORY } from '@/content/seed-story';
import type { Activity } from '@/domain/progress';
import { buildRoadmap } from '@/domain/roadmap';
import { totalWords } from '@/domain/story';
import type { LessonId, SeedStoryContent, Story, StoryWork } from '@/domain/types';
import { addDays, dayKey } from '@/lib/dates';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

function storyFrom(
  id: string,
  seed: SeedStoryContent,
  penName: string,
  started: number,
  publishedAt: number | null,
): Story {
  return {
    id,
    title: seed.title,
    genre: seed.genre,
    createdAt: started,
    updatedAt: publishedAt ?? started + 2 * DAY,
    roadmap: buildRoadmap(seed),
    work: JSON.parse(JSON.stringify(seed.work)) as StoryWork,
    completed: Object.fromEntries(seed.completed.map((stage, i) => [stage, started + (i + 1) * HOUR])),
    cover: { ...seed.cover, author: penName },
    publishedAt,
  };
}

/**
 * A new writer's desk, so the demo looks lived-in on first launch: one book
 * already published, one story underway, a five-day streak and two lessons done.
 */
export function seedDesk(penName: string, now: number) {
  const published = storyFrom('story-published', SEED_PUBLISHED, penName, now - 9 * DAY, now - 6 * DAY);
  const underway = storyFrom('story-seed', SEED_STORY, penName, now - 3 * DAY, null);
  underway.updatedAt = now - DAY;

  // Spread the words over the last five days, so the streak and the totals agree.
  const words = totalWords(published) + totalWords(underway);
  const shares = [0.18, 0.2, 0.22, 0.2];
  const activity: Activity = {};
  let given = 0;
  shares.forEach((share, i) => {
    const amount = Math.round(words * share);
    activity[dayKey(addDays(now, i - 5))] = amount;
    given += amount;
  });
  activity[dayKey(addDays(now, -1))] = words - given;

  const lessonsDone: Partial<Record<LessonId, number>> = {
    'word-choice': now - 5 * DAY,
    senses: now - 2 * DAY,
  };

  return { stories: { [published.id]: published, [underway.id]: underway }, activity, lessonsDone };
}
