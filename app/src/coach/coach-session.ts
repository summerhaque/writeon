import { create } from 'zustand';

import { COACH } from '@/content/coach';
import type { StageId, Story } from '@/domain/types';
import { countWords } from '@/domain/words';
import { makeId } from '@/lib/ids';

import {
  scriptedBrain,
  type CoachBrain,
  type CoachIntent,
  type CoachReply,
  type CoachTurn,
} from './coach-engine';

/** The brain the app talks to. Replace with an LLM-backed CoachBrain later. */
const brain: CoachBrain = scriptedBrain;

interface Conversation {
  turns: CoachTurn[];
  hintsGiven: number;
  thinking: boolean;
}

const EMPTY: Conversation = { turns: [], hintsGiven: 0, thinking: false };

interface CoachState {
  conversations: Record<string, Conversation>;
  ask: (input: {
    story: Story;
    stage: StageId;
    message?: string;
    intent?: CoachIntent;
    label?: string;
  }) => Promise<void>;
}

export const conversationKey = (storyId: string, stage: StageId) => `${storyId}:${stage}`;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Long enough to feel like thought, short enough not to stall a kid mid-idea. */
function thinkingTime(reply: string) {
  return Math.min(1600, 650 + countWords(reply) * 18);
}

/**
 * Conversations live for the session, one per story stage. They aren't saved:
 * the coach is a voice in the margin, not part of the manuscript.
 */
export const useCoach = create<CoachState>((set, get) => ({
  conversations: {},

  ask: async ({ story, stage, message, intent, label }) => {
    const key = conversationKey(story.id, stage);
    const current = get().conversations[key] ?? EMPTY;
    if (current.thinking) return;

    const said = message?.trim() || label;
    const turns: CoachTurn[] = said
      ? [...current.turns, { id: makeId('turn'), from: 'writer', text: said }]
      : current.turns;
    const update = (patch: Partial<Conversation>) =>
      set((state) => ({
        conversations: {
          ...state.conversations,
          [key]: { ...(state.conversations[key] ?? EMPTY), ...patch },
        },
      }));

    update({ turns, thinking: true });

    const reply = await brain
      .reply({
        story,
        stage,
        message: message?.trim() || null,
        intent: intent ?? (message?.trim() ? undefined : 'open'),
        hintsGiven: current.hintsGiven,
        history: current.turns,
      })
      .catch((): CoachReply => ({ text: COACH.fallback[0], kind: 'fallback' }));
    await wait(thinkingTime(reply.text));

    update({
      thinking: false,
      hintsGiven: reply.kind === 'hint' ? current.hintsGiven + 1 : current.hintsGiven,
      turns: [
        ...turns,
        { id: makeId('turn'), from: 'coach', text: reply.text, kind: reply.kind, tier: reply.tier },
      ],
    });
  },
}));

export function useConversation(storyId: string, stage: StageId): Conversation {
  return useCoach((state) => state.conversations[conversationKey(storyId, stage)] ?? EMPTY);
}

/** One-tap things a kid might want to say. */
export const QUICK_REPLIES: { label: string; intent: CoachIntent }[] = [
  { label: 'I’m stuck', intent: 'hint' },
  { label: 'What’s this stage for?', intent: 'explain' },
  { label: 'What should I do next?', intent: 'next' },
  { label: 'Can you write it for me?', intent: 'write-it' },
];
