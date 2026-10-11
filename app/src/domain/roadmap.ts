import { ROADMAP } from '@/content/roadmap';

import { LENGTHS, STAGE_IDS } from './stages';
import type { Feeling, Genre, Length, Roadmap, Spark, StageId } from './types';

/** Where a story starts depends on what the writer already has. The hardest part is starting. */
const START_STAGE: Record<Spark, StageId> = {
  character: 'characters',
  place: 'setting',
  'what-if': 'idea',
  nothing: 'idea',
};

export function startStageFor(spark: Spark): StageId {
  return START_STAGE[spark];
}

/** Turns three quick answers into a personalized plan for all nine stages. */
export function buildRoadmap(answers: {
  genre: Genre;
  spark: Spark;
  feeling: Feeling;
  length: Length;
}): Roadmap {
  const { genre, spark, feeling, length } = answers;
  const start = START_STAGE[spark];
  const order = [start, ...STAGE_IDS.filter((stage) => stage !== start)];

  const prompts = Object.fromEntries(
    STAGE_IDS.map((stage) => [stage, ROADMAP.prompts[stage][genre]]),
  ) as Record<StageId, string>;
  prompts.plot = `${prompts.plot} ${ROADMAP.feeling[feeling].plotLine}`;
  prompts.revising = `${prompts.revising} ${ROADMAP.feeling[feeling].revisingLine}`;

  return {
    spark,
    feeling,
    length,
    order,
    prompts,
    wordGoal: LENGTHS[length].words,
    chapterCount: LENGTHS[length].chapters,
  };
}
