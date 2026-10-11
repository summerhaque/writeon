import { PLATE_BY_ID } from '@/content/plates';
import type { Book, BookPicture } from '@/domain/book';
import { coverColors, print } from '@/theme/colors';

/** A 6 × 9 inch book page, in points. */
export const PAGE = { width: 432, height: 648 } as const;
const MARGIN = { top: 58, side: 54, bottom: 62 } as const;

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The standard mark from brand/writeon-mark.svg, for the title page and the colophon. */
const MARK = `<svg class="mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="304.7 150.7 556.6 255.6"><g><rect x="330" y="219" width="230" height="26" rx="13" fill="#97CDF4"/><rect x="330" y="287" width="300" height="26" rx="13" fill="#97CDF4"/><rect x="330" y="355" width="170" height="26" rx="13" fill="#97CDF4"/><g transform="translate(620,352) rotate(-38) scale(1.0)"><path d="M0 0 L24.99 -10.2 L24.99 10.2 Z" fill="#12354F"/><path d="M24.99 -10.2 L73.5 -30 L73.5 0 L24.99 0 Z" fill="#F6E7CE"/><path d="M24.99 10.2 L73.5 30 L73.5 0 L24.99 0 Z" fill="#E7D2AF"/><path d="M73.5 -30 L196.0 -30 L196.0 -5.4 L73.5 -5.4 Z" fill="#C4E3FA"/><path d="M73.5 -5.4 L196.0 -5.4 L196.0 12.6 L73.5 12.6 Z" fill="#97CDF4"/><path d="M73.5 12.6 L196.0 12.6 L196.0 30 L73.5 30 Z" fill="#3E8FD0"/><path d="M196.0 -30 L209.47 -30 L209.47 30 L196.0 30 Z" fill="#12354F"/><path d="M209.47 -30 L236.0 -30 A 9.0 9.0 0 0 1 236.0 30 L209.47 30 Z" fill="#F2A65A"/></g></g></svg>`;

export interface BookAssets {
  /** @font-face rules with embedded fonts. Empty falls back to Helvetica. */
  fontFaces: string;
  /** Photographed drawings as data URIs, keyed by picture id. */
  photos: Record<string, string>;
}

function plateSvg(id: BookPicture['plateId']) {
  return id ? PLATE_BY_ID[id].svg : '';
}

function cover(book: Book): string {
  const { template, color, plateId, author } = book.cover;
  const ink = coverColors[color].ink;
  const title = escape(book.title);
  const by = author.trim() ? `<div class="c-author">${escape(author)}</div>` : '';
  const long = book.title.length > 34 ? ' long' : '';

  switch (template) {
    case 'classic':
      return `<section class="page cover classic" style="background:${ink}">
        <div class="frame"><div class="c-mid"><div class="c-title${long}">${title}</div><div class="c-rule"></div></div>${by}</div>
      </section>`;
    case 'band':
      return `<section class="page cover band">
        <div class="band-fill" style="background:${ink}"><div class="c-title${long}">${title}</div></div>${by}
      </section>`;
    case 'plate':
      return `<section class="page cover plate">
        <div class="plate-art">${plateSvg(plateId ?? 'tower')}</div>
        <div class="plate-rule" style="background:${ink}"></div>
        <div class="plate-text"><div class="c-title${long}">${title}</div>${by}</div>
      </section>`;
    case 'minimal':
      return `<section class="page cover minimal" style="background:${ink}">
        <div class="c-title${long}">${title}</div>${by}
      </section>`;
  }
}

function picture(p: BookPicture, assets: BookAssets): string {
  const art = p.plateId
    ? plateSvg(p.plateId)
    : assets.photos[p.id]
      ? `<img src="${assets.photos[p.id]}" alt="">`
      : '';
  if (!art) return '';
  return `<figure><div class="art">${art}</div>${p.caption ? `<figcaption>${escape(p.caption)}</figcaption>` : ''}</figure>`;
}

/** One chapter flows over as many pages as it needs. The table's header and
 *  footer repeat on every printed page, which gives each one its margins. */
function chapter(c: Book['chapters'][number], assets: BookAssets): string {
  const paragraphs = c.paragraphs
    .map((p, i) => `<p${i === 0 ? ' class="first"' : ''}>${escape(p)}</p>`)
    .join('');
  return `<div class="flow"><table><thead><tr><td class="pad-top"></td></tr></thead>
    <tfoot><tr><td class="pad-bottom"></td></tr></tfoot>
    <tbody><tr><td class="chapter">
      <div class="ch-head"><div class="ch-num">${escape(c.heading)}</div>${c.title ? `<h2>${escape(c.title)}</h2>` : ''}</div>
      ${paragraphs}
      ${c.pictures.map((p) => picture(p, assets)).join('')}
    </td></tr></tbody></table></div>`;
}

export function bookHtml(book: Book, assets: BookAssets): string {
  const author = book.cover.author.trim();
  const published = new Date(book.publishedAt ?? Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `<!doctype html><html><head><meta charset="utf-8"><title>${escape(book.title)}</title><style>
${assets.fontFaces}
@page { size: ${PAGE.width}px ${PAGE.height}px; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: ${print.paper}; }
body { font-family: 'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif; color: ${print.ink}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: ${PAGE.width}px; height: ${PAGE.height}px; position: relative; overflow: hidden; page-break-after: always; break-after: page; }

.cover .c-title { font-weight: 800; font-size: 38px; line-height: 1.12; letter-spacing: -0.8px; }
.cover .c-title.long { font-size: 30px; }
.cover .c-author { font-weight: 700; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; }
.classic { padding: 22px; color: ${print.onCover}; }
.classic .frame { height: 100%; border: 1px solid rgba(255,255,255,0.5); border-radius: 14px; display: flex; flex-direction: column; align-items: center; padding: 40px 34px; text-align: center; }
.classic .c-mid { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.classic .c-rule { width: 56px; height: 3px; border-radius: 2px; background: ${print.accent}; margin-top: 26px; }
.band { background: ${print.paperTint}; display: flex; flex-direction: column; justify-content: center; }
.band .band-fill { color: ${print.onCover}; padding: 48px 40px; text-align: center; }
.band .c-author { position: absolute; bottom: 46px; left: 0; right: 0; text-align: center; color: ${print.ink}; }
.plate { background: ${print.paperTint}; }
.plate .plate-art svg { display: block; width: 100%; height: ${PAGE.width * 0.75}px; }
.plate .plate-rule { height: 11px; }
.plate .plate-text { padding: 38px 40px; display: flex; flex-direction: column; justify-content: space-between; height: ${PAGE.height - PAGE.width * 0.75 - 11}px; }
.plate .c-author { color: ${print.muted}; }
.minimal { color: ${print.onCover}; padding: 48px 40px; display: flex; flex-direction: column; justify-content: space-between; }
.minimal .c-title { font-size: 48px; line-height: 1.06; }
.minimal .c-title.long { font-size: 36px; }
.minimal .c-author { opacity: 0.82; }

.mark { display: block; width: 72px; height: auto; }
.title-page { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 ${MARGIN.side}px; }
.title-page h1 { font-weight: 800; font-size: 30px; line-height: 1.18; margin: 0 0 16px; letter-spacing: -0.6px; }
.title-page .by { font-size: 14px; color: ${print.muted}; }
.title-page .imprint { position: absolute; bottom: 50px; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; font-weight: 700; font-size: 10px; letter-spacing: 1px; color: ${print.ink}; }
.dedication { display: flex; align-items: center; justify-content: center; text-align: center; padding: 0 70px; font-style: italic; font-size: 15px; line-height: 1.6; color: ${print.ink}; }

.flow { page-break-before: always; break-before: page; }
.flow table { width: 100%; border-collapse: collapse; }
.flow td { padding: 0; }
.flow .pad-top { height: ${MARGIN.top}px; }
.flow .pad-bottom { height: ${MARGIN.bottom}px; }
.chapter { padding: 0 ${MARGIN.side}px !important; }
.ch-head { text-align: center; margin: 46px 0 30px; }
.ch-num { font-weight: 700; font-size: 9.5px; letter-spacing: 2.4px; text-transform: uppercase; color: ${print.primary}; }
.ch-head h2 { font-weight: 800; font-size: 21px; line-height: 1.25; margin: 10px 0 0; letter-spacing: -0.3px; }
p { font-size: 12px; line-height: 1.7; margin: 0; text-indent: 1.5em; orphans: 2; widows: 2; hyphens: auto; -webkit-hyphens: auto; text-align: justify; }
p.first { text-indent: 0; }
p.first::first-letter { float: left; font-weight: 800; font-size: 42px; line-height: 0.9; padding: 4px 6px 0 0; color: ${print.primary}; }
figure { margin: 22px 0 6px; page-break-inside: avoid; break-inside: avoid; }
figure .art { width: 100%; height: ${(PAGE.width - MARGIN.side * 2) * 0.75}px; border-radius: 10px; overflow: hidden; }
figure .art svg, figure .art img { display: block; width: 100%; height: 100%; object-fit: cover; }
figcaption { font-style: italic; font-size: 10.5px; line-height: 1.5; text-align: center; color: ${print.muted}; margin-top: 8px; }

.about { padding: ${MARGIN.top + 60}px ${MARGIN.side + 6}px 0; }
.about .label { font-weight: 700; font-size: 9.5px; letter-spacing: 2.4px; text-transform: uppercase; color: ${print.accentText}; text-align: center; margin-bottom: 22px; }
.about .text { font-size: 13px; line-height: 1.7; text-align: center; }
.colophon { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 0 60px 64px; gap: 12px; text-align: center; font-size: 10px; line-height: 1.6; color: ${print.muted}; }
.colophon .motto { font-weight: 600; font-size: 12px; line-height: 1.5; color: ${print.ink}; }
</style></head><body>
${cover(book)}
<section class="page title-page">
  <h1>${escape(book.title)}</h1>
  ${author ? `<div class="by">by ${escape(author)}</div>` : ''}
  <div class="imprint">${MARK}<span>Write On!</span></div>
</section>
${book.dedication ? `<section class="page dedication"><div>${escape(book.dedication)}</div></section>` : ''}
${book.chapters.map((c) => chapter(c, assets)).join('')}
${
  book.about
    ? `<section class="page about" style="page-break-before: always; break-before: page;"><div class="label">About the Author</div><div class="text">${escape(book.about)}</div></section>`
    : ''
}
<section class="page colophon" style="page-break-before: always; break-before: page; page-break-after: auto; break-after: auto;">
  ${MARK}
  <div class="motto">Everyone has a story worth telling, and every voice deserves the chance to be heard.</div>
  <div>Written${author ? ` by ${escape(author)}` : ''}. Made with Write On!<br>Published ${published}.</div>
</section>
</body></html>`;
}
