import type { Story, StoryWork } from '@/domain/types';
import type { StoryEditor } from '@/store/use-story-draft';

export interface StageProps {
  /** The story as the writer sees it now, unsaved keystrokes included. */
  story: Story;
  edit: StoryEditor['edit'];
  /** Save right away, e.g. when a field loses focus. */
  flush: () => void;
}

/** Change one part of the story's work, leaving the rest alone. */
export function editWork<K extends keyof StoryWork>(
  edit: StageProps['edit'],
  key: K,
  recipe: (value: StoryWork[K]) => StoryWork[K],
) {
  edit((draft) => ({ ...draft, work: { ...draft.work, [key]: recipe(draft.work[key]) } }));
}
