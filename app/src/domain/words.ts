const WORD = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;

export function countWords(text: string | null | undefined): number {
  if (!text) return 0;
  return text.match(WORD)?.length ?? 0;
}

export function isBlank(text: string | null | undefined): boolean {
  return !text || text.trim().length === 0;
}

/**
 * Split prose into sentences. Handles closing quotes after the full stop
 * (“Run!” she said.) and keeps line breaks as sentence boundaries.
 */
export function splitSentences(text: string): string[] {
  return text
    .split(/\n+/)
    .flatMap((paragraph) => paragraph.split(/(?<=[.!?…]["”’)]?)\s+(?=["“‘(]?[\p{Lu}\p{N}])/u))
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}

export function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${formatCount(n)} ${n === 1 ? one : many}`;
}
