import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';

import type { Story } from '@/domain/types';
import { useAutosave } from '@/lib/use-autosave';

import { useAppStore } from './app-store';

/** The parts of a story a writer edits by hand. Stage status and publishing stay in the store. */
export type StoryDraft = Pick<Story, 'title' | 'work' | 'cover'>;

const draftOf = (story: Story): StoryDraft => ({ title: story.title, work: story.work, cover: story.cover });

/**
 * An autosaving working copy of a story. `live` is the story as the writer sees
 * it right now, unsaved keystrokes included, so the coach reads the latest words.
 */
export function useStoryDraft(story: Story) {
  const updateStory = useAppStore((state) => state.updateStory);
  const { draft, update, flush, reset, isDirty, saveState } = useAutosave<StoryDraft>(
    () => draftOf(story),
    (value) => updateStory(story.id, (current) => ({ ...current, ...value })),
  );

  // Coming back to this screen after another one changed the story (a lesson
  // rewrote a sentence, say): pick up those changes before writing over them.
  const firstFocus = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (firstFocus.current) {
        firstFocus.current = false;
        return;
      }
      const stored = useAppStore.getState().stories[story.id];
      if (stored && !isDirty()) reset(draftOf(stored));
    }, [story.id, isDirty, reset]),
  );

  return { live: { ...story, ...draft } as Story, edit: update, flush, saveState };
}

export type StoryEditor = ReturnType<typeof useStoryDraft>;
