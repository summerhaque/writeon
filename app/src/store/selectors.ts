import { useMemo } from 'react';

import type { ProgressInput } from '@/domain/progress';
import type { Story } from '@/domain/types';

import { useAppStore } from './app-store';

export function useStory(id: string | undefined): Story | undefined {
  return useAppStore((state) => (id ? state.stories[id] : undefined));
}

/** All stories, most recently touched first. */
export function useStories(): Story[] {
  const stories = useAppStore((state) => state.stories);
  return useMemo(() => Object.values(stories).sort((a, b) => b.updatedAt - a.updatedAt), [stories]);
}

export function useProgressInput(): ProgressInput {
  const stories = useStories();
  const activity = useAppStore((state) => state.activity);
  const lessonsDone = useAppStore((state) => state.lessonsDone);
  return useMemo(() => ({ stories, activity, lessonsDone }), [stories, activity, lessonsDone]);
}

export function usePenName(): string {
  return useAppStore((state) => state.profile?.penName ?? '');
}
