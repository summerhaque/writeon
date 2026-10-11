import { chapterHeading, displayTitle } from './story';
import type { Cover, Genre, PlateId, SampleBook, Story } from './types';
import { isBlank } from './words';

export interface BookPicture {
  id: string;
  plateId: PlateId | null;
  /** A photographed drawing on this device. */
  uri: string | null;
  caption: string;
}

export interface BookChapter {
  heading: string;
  title: string;
  paragraphs: string[];
  pictures: BookPicture[];
}

/** A book as a reader sees it, whether a writer's own story or a sample from the shelf. */
export interface Book {
  id: string;
  title: string;
  genre: Genre;
  cover: Pick<Cover, 'template' | 'color' | 'plateId' | 'author'>;
  dedication: string;
  about: string;
  chapters: BookChapter[];
  publishedAt: number | null;
  sample: boolean;
}

const paragraphsOf = (body: string) =>
  body
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export function bookFromStory(story: Story): Book {
  const written = story.work.chapters.filter((c) => !isBlank(c.body));
  const pictures = story.work.illustrations.filter((p) => p.plateId !== null || p.uri !== null);
  const writtenIds = new Set(written.map((c) => c.id));
  // Pictures not placed after a written chapter go at the end, so none are lost.
  const loose = pictures.filter((p) => !p.chapterId || !writtenIds.has(p.chapterId));

  const chapters = written.map((chapter, i) => ({
    heading: chapterHeading(i),
    title: chapter.title.trim(),
    paragraphs: paragraphsOf(chapter.body),
    pictures: [
      ...pictures.filter((p) => p.chapterId === chapter.id),
      ...(i === written.length - 1 ? loose : []),
    ].map(({ id, plateId, uri, caption }) => ({ id, plateId, uri, caption: caption.trim() })),
  }));

  return {
    id: story.id,
    title: displayTitle(story),
    genre: story.genre,
    cover: story.cover,
    dedication: story.work.publishing.dedication.trim(),
    about: story.work.publishing.about.trim(),
    chapters,
    publishedAt: story.publishedAt,
    sample: false,
  };
}

export function bookFromSample(sample: SampleBook): Book {
  return {
    id: sample.id,
    title: sample.title,
    genre: sample.genre,
    cover: { ...sample.cover, author: `${sample.author.name}, age ${sample.author.age}` },
    dedication: sample.dedication,
    about: sample.author.about,
    chapters: sample.chapters.map((chapter, i) => ({
      heading: chapterHeading(i),
      title: chapter.title,
      paragraphs: paragraphsOf(chapter.body),
      pictures: chapter.plateId
        ? [{ id: `${sample.id}-${i}`, plateId: chapter.plateId, uri: null, caption: chapter.caption ?? '' }]
        : [],
    })),
    publishedAt: null,
    sample: true,
  };
}
