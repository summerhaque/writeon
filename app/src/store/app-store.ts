import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Activity } from '@/domain/progress';
import { createStory, totalWords, type NewStoryInput } from '@/domain/story';
import type { LessonId, StageId, Story } from '@/domain/types';
import { dayKey } from '@/lib/dates';

import { seedDesk } from './seed';

// ---------------------------------------------------------------------------
// Boot: the app waits for saved data before it shows a single screen.
// ---------------------------------------------------------------------------

const useBootStore = create<{ ready: boolean }>(() => ({ ready: false }));

function markReady() {
  useBootStore.setState({ ready: true });
}

export const useStoreReady = () => useBootStore((state) => state.ready);

export type AppearancePreference = 'system' | 'light' | 'dark';

export interface Profile {
  penName: string;
  classCode: string;
  joinedAt: number;
}

interface PersistedState {
  profile: Profile | null;
  appearance: AppearancePreference;
  stories: Record<string, Story>;
  activity: Activity;
  lessonsDone: Partial<Record<LessonId, number>>;
}

interface Actions {
  /** The demo's sign-in: a pen name, an optional class code, and a story already on the desk. */
  signIn: (penName: string, classCode: string) => void;
  updateProfile: (patch: Partial<Pick<Profile, 'penName' | 'classCode'>>) => void;
  setAppearance: (appearance: AppearancePreference) => void;
  createStory: (input: Omit<NewStoryInput, 'author'>) => string;
  /** Every edit to a story goes through here, so words-per-day stays honest. */
  updateStory: (id: string, recipe: (story: Story) => Story) => void;
  setStageDone: (id: string, stage: StageId, done: boolean) => void;
  publish: (id: string) => void;
  deleteStory: (id: string) => void;
  completeLesson: (id: LessonId) => void;
  startOver: () => void;
}

export type AppState = PersistedState & Actions;

const initialState: PersistedState = {
  profile: null,
  appearance: 'light',
  stories: {},
  activity: {},
  lessonsDone: {},
};

function withActivity(activity: Activity, wordsAdded: number): Activity {
  if (wordsAdded <= 0) return activity;
  const today = dayKey();
  return { ...activity, [today]: (activity[today] ?? 0) + wordsAdded };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      signIn: (penName, classCode) => {
        const now = Date.now();
        const { stories, activity, lessonsDone } = seedDesk(penName, now);
        set({ profile: { penName, classCode, joinedAt: now }, stories, activity, lessonsDone });
      },

      updateProfile: (patch) =>
        set((state) => (state.profile ? { profile: { ...state.profile, ...patch } } : state)),

      setAppearance: (appearance) => set({ appearance }),

      createStory: (input) => {
        const story = createStory({ ...input, author: get().profile?.penName ?? '' });
        set((state) => ({ stories: { ...state.stories, [story.id]: story } }));
        return story.id;
      },

      updateStory: (id, recipe) =>
        set((state) => {
          const story = state.stories[id];
          if (!story) return state;
          const next = { ...recipe(story), updatedAt: Date.now() };
          return {
            stories: { ...state.stories, [id]: next },
            activity: withActivity(state.activity, totalWords(next) - totalWords(story)),
          };
        }),

      setStageDone: (id, stage, done) =>
        get().updateStory(id, (story) => {
          const completed = { ...story.completed };
          if (done) completed[stage] = Date.now();
          else delete completed[stage];
          return { ...story, completed };
        }),

      publish: (id) =>
        get().updateStory(id, (story) => ({
          ...story,
          publishedAt: Date.now(),
          completed: { ...story.completed, publishing: Date.now() },
        })),

      deleteStory: (id) =>
        set((state) => {
          const { [id]: _removed, ...stories } = state.stories;
          return { stories };
        }),

      completeLesson: (id) =>
        set((state) => ({
          lessonsDone: { ...state.lessonsDone, [id]: state.lessonsDone[id] ?? Date.now() },
        })),

      startOver: () => set(initialState),
    }),
    {
      name: 'writeon/v1',
      // v2: light became the default. Anyone still on "follow the device" moves to light;
      // an explicit dark choice is kept.
      version: 2,
      migrate: (persisted, version) => {
        const state = persisted as PersistedState;
        if (version < 2 && state.appearance === 'system') return { ...state, appearance: 'light' };
        return state;
      },
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ profile, appearance, stories, activity, lessonsDone }): PersistedState => ({
        profile,
        appearance,
        stories,
        activity,
        lessonsDone,
      }),
      onRehydrateStorage: () => (_state, error) => {
        // A damaged save shouldn't trap the app on the splash screen. Start fresh instead.
        if (error) console.warn('Write On! could not read saved data. Starting fresh.', error);
        markReady();
      },
    },
  ),
);
