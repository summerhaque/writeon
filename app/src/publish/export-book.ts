import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_400Regular_Italic,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Asset } from 'expo-asset';
import { Directory, File, Paths } from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import type { Book } from '@/domain/book';

import { bookHtml, PAGE } from './book-html';

const FAMILY = 'Plus Jakarta Sans';
const FONTS = [
  { weight: 400, style: 'normal', module: PlusJakartaSans_400Regular },
  { weight: 400, style: 'italic', module: PlusJakartaSans_400Regular_Italic },
  { weight: 600, style: 'normal', module: PlusJakartaSans_600SemiBold },
  { weight: 700, style: 'normal', module: PlusJakartaSans_700Bold },
  { weight: 800, style: 'normal', module: PlusJakartaSans_800ExtraBold },
];

/** The book's typefaces, embedded so the PDF looks the same on every device. */
async function fontFaces(): Promise<string> {
  const faces = await Promise.all(
    FONTS.map(async ({ weight, style, module }) => {
      const [asset] = await Asset.loadAsync(module);
      if (!asset.localUri) throw new Error(`Font not available: ${FAMILY} ${weight}`);
      const data = await new File(asset.localUri).base64();
      return `@font-face { font-family: '${FAMILY}'; font-weight: ${weight}; font-style: ${style}; src: url(data:font/ttf;base64,${data}) format('truetype'); }`;
    }),
  );
  return faces.join('\n');
}

async function photoData(book: Book): Promise<Record<string, string>> {
  const photos = book.chapters.flatMap((c) => c.pictures).filter((p) => p.uri);
  const entries = await Promise.all(
    photos.map(async (p) => {
      try {
        const file = new File(p.uri!);
        if (!file.exists) return null;
        const type = file.extension.toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
        return [p.id, `data:${type};base64,${await file.base64()}`] as const;
      } catch {
        return null;
      }
    }),
  );
  return Object.fromEntries(entries.filter((entry) => entry !== null));
}

function fileName(title: string) {
  const safe = title
    .replace(/[\\/:*?"<>|]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);
  return `${safe || 'My book'}.pdf`;
}

/** Typesets the book and saves it as a PDF. Returns the file's URI. */
export async function exportBook(book: Book): Promise<string> {
  // A missing font shouldn't stop a book from being made. It falls back to Helvetica.
  const fonts = await fontFaces().catch((error) => {
    console.warn('Publishing without embedded fonts', error);
    return '';
  });
  const html = bookHtml(book, { fontFaces: fonts, photos: await photoData(book) });
  const { uri } = await Print.printToFileAsync({
    html,
    width: PAGE.width,
    height: PAGE.height,
    margins: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const folder = new Directory(Paths.document, 'books');
  if (!folder.exists) folder.create({ intermediates: true });
  const target = new File(folder, fileName(book.title));
  if (target.exists) target.delete();
  await new File(uri).move(target);
  return target.uri;
}

export async function shareBook(uri: string, title: string) {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf', UTI: 'com.adobe.pdf', dialogTitle: title });
  } else {
    await Print.printAsync({ uri });
  }
}
