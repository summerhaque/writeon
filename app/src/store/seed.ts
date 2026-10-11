import { SEED_STORY } from '@/content/seed-story';
import type { Activity } from '@/domain/progress';
import { buildRoadmap } from '@/domain/roadmap';
import { totalWords } from '@/domain/story';
import type { Story, StoryWork } from '@/domain/types';
import { addDays, dayKey } from '@/lib/dates';

const HOUR = 60 * 60 * 1000;

/**
 * A new writer's desk: one story already underway, started three days ago,
 * so every part of the app has something real to show.
 */
export function seedDesk(
  penName: string,
  now: number,
): { stories: Record<string, Story>; activity: Activity } {
  const started = addDays(now, -3).getTime();
  const story: Story = {
    id: 'story-seed',
    title: SEED_STORY.title,
    genre: SEED_STORY.genre,
    createdAt: started,
    updatedAt: addDays(now, -1).getTime(),
    roadmap: buildRoadmap(SEED_STORY),
    work: JSON.parse(JSON.stringify(SEED_STORY.work)) as StoryWork,
    completed: Object.fromEntries(SEED_STORY.completed.map((stage, i) => [stage, started + (i + 1) * HOUR])),
    cover: { ...SEED_STORY.cover, author: penName },
    publishedAt: null,
  };

  const words = totalWords(story);
  const firstDay = Math.round(words * 0.3);
  const secondDay = Math.round(words * 0.3);
  const activity: Activity = {
    [dayKey(addDays(now, -3))]: firstDay,
    [dayKey(addDays(now, -2))]: secondDay,
    [dayKey(addDays(now, -1))]: words - firstDay - secondDay,
  };

  return { stories: { [story.id]: story }, activity };
}
