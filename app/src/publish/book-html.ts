import { PLATE_BY_ID } from '@/content/plates';
import type { Book, BookPicture } from '@/domain/book';
import { coverColors, print } from '@/theme/colors';

/** A 6 × 9 inch book page, in points. */
export const PAGE = { width: 432, height: 648 } as const;
const MARGIN = { top: 58, side: 54, bottom: 62 } as const;

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const FEATHER = `<svg viewBox="0 0 124 522" width="14" height="59" aria-hidden="true"><g transform="translate(-8 -8)" fill="none" stroke-linecap="round">
<path d="M118,22 L118,336 C118,368 98,390 66,410 C34,390 22,368 22,336 L22,172 C22,94 62,46 118,22 Z" fill="${print.paper}"/>
<path d="M22,184 C46,150 80,130 118,120" stroke="${print.ink}" stroke-width="14"/>
<path d="M22,288 C46,254 80,234 118,224" stroke="${print.ink}" stroke-width="14"/>
<path d="M66,396 C66,364 72,336 90,318 C100,308 109,304 118,302" stroke="${print.ink}" stroke-width="10.9"/>
<path d="M118,22 L118,336 C118,368 98,390 66,410 C34,390 22,368 22,336 L22,172 C22,94 62,46 118,22 Z" stroke="${print.ink}" stroke-width="14" stroke-linejoin="miter" stroke-miterlimit="6"/>
<path d="M66,410 L66,466" stroke="${print.ink}" stroke-width="14" stroke-linecap="butt"/>
<path d="M54,476 L78,476 L66,520 Z" fill="${print.accent}" stroke="${print.accent}" stroke-width="2.5" stroke-linejoin="round"/>
</g></svg>`;

export interface BookAssets {
  /** @font-face rules with embedded fonts. Empty falls back to Georgia. */
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
body { font-family: 'Fraunces', Georgia, serif; color: ${print.ink}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: ${PAGE.width}px; height: ${PAGE.height}px; position: relative; overflow: hidden; page-break-after: always; break-after: page; }
.sans { font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif; }

.cover .c-title { font-weight: 600; font-size: 40px; line-height: 1.12; letter-spacing: -0.4px; }
.cover .c-title.long { font-size: 31px; }
.cover .c-author { font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 2.2px; text-transform: uppercase; }
.classic { padding: 22px; color: ${print.paper}; }
.classic .frame { height: 100%; border: 1px solid rgba(250,247,241,0.55); display: flex; flex-direction: column; align-items: center; padding: 40px 34px; text-align: center; }
.classic .c-mid { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.classic .c-rule { width: 56px; height: 1.5px; background: rgba(250,247,241,0.7); margin-top: 26px; }
.band { background: ${print.paperDeep}; display: flex; flex-direction: column; justify-content: center; }
.band .band-fill { color: ${print.paper}; padding: 48px 40px; text-align: center; }
.band .c-author { position: absolute; bottom: 46px; left: 0; right: 0; text-align: center; color: ${print.ink}; }
.plate { background: ${print.paperDeep}; }
.plate .plate-art svg { display: block; width: 100%; height: ${PAGE.width * 0.75}px; }
.plate .plate-rule { height: 11px; }
.plate .plate-text { padding: 38px 40px; display: flex; flex-direction: column; justify-content: space-between; height: ${PAGE.height - PAGE.width * 0.75 - 11}px; }
.plate .c-author { color: ${print.muted}; }
.minimal { color: ${print.paper}; padding: 48px 40px; display: flex; flex-direction: column; justify-content: space-between; }
.minimal .c-title { font-size: 50px; line-height: 1.06; }
.minimal .c-title.long { font-size: 38px; }
.minimal .c-author { opacity: 0.8; }

.title-page { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 ${MARGIN.side}px; }
.title-page h1 { font-weight: 600; font-size: 30px; line-height: 1.18; margin: 0 0 18px; letter-spacing: -0.3px; }
.title-page .by { font-style: italic; font-size: 14px; color: ${print.muted}; }
.title-page .imprint { position: absolute; bottom: 52px; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 9px; letter-spacing: 1.8px; text-transform: uppercase; color: ${print.muted}; }
.dedication { display: flex; align-items: center; justify-content: center; text-align: center; padding: 0 70px; font-style: italic; font-size: 15px; line-height: 1.6; color: ${print.ink}; }

.flow { page-break-before: always; break-before: page; }
.flow table { width: 100%; border-collapse: collapse; }
.flow td { padding: 0; }
.flow .pad-top { height: ${MARGIN.top}px; }
.flow .pad-bottom { height: ${MARGIN.bottom}px; }
.chapter { padding: 0 ${MARGIN.side}px !important; }
.ch-head { text-align: center; margin: 46px 0 30px; }
.ch-num { font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif; font-weight: 600; font-size: 9.5px; letter-spacing: 2.4px; text-transform: uppercase; color: ${print.accent}; }
.ch-head h2 { font-weight: 600; font-size: 22px; line-height: 1.25; margin: 10px 0 0; }
p { font-size: 12.5px; line-height: 1.62; margin: 0; text-indent: 1.5em; orphans: 2; widows: 2; hyphens: auto; -webkit-hyphens: auto; text-align: justify; }
p.first { text-indent: 0; }
p.first::first-letter { float: left; font-weight: 600; font-size: 44px; line-height: 0.9; padding: 4px 6px 0 0; }
figure { margin: 22px 0 6px; page-break-inside: avoid; break-inside: avoid; }
figure .art { width: 100%; height: ${(PAGE.width - MARGIN.side * 2) * 0.75}px; border-radius: 4px; overflow: hidden; }
figure .art svg, figure .art img { display: block; width: 100%; height: 100%; object-fit: cover; }
figcaption { font-style: italic; font-size: 10.5px; line-height: 1.5; text-align: center; color: ${print.muted}; margin-top: 8px; }

.about { padding: ${MARGIN.top + 60}px ${MARGIN.side + 6}px 0; }
.about .label { font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif; font-weight: 600; font-size: 9.5px; letter-spacing: 2.4px; text-transform: uppercase; color: ${print.accent}; text-align: center; margin-bottom: 22px; }
.about .text { font-size: 13px; line-height: 1.7; text-align: center; }
.colophon { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 64px; gap: 10px; text-align: center; font-size: 10px; line-height: 1.6; color: ${print.muted}; }
.colophon .motto { font-style: italic; font-size: 12px; color: ${print.ink}; }
</style></head><body>
${cover(book)}
<section class="page title-page">
  <h1>${escape(book.title)}</h1>
  ${author ? `<div class="by">by ${escape(author)}</div>` : ''}
  <div class="imprint sans">${FEATHER}<span>Write On!</span></div>
</section>
${book.dedication ? `<section class="page dedication"><div>${escape(book.dedication)}</div></section>` : ''}
${book.chapters.map((c) => chapter(c, assets)).join('')}
${
  book.about
    ? `<section class="page about" style="page-break-before: always; break-before: page;"><div class="label">About the Author</div><div class="text">${escape(book.about)}</div></section>`
    : ''
}
<section class="page colophon" style="page-break-before: always; break-before: page; page-break-after: auto; break-after: auto;">
  ${FEATHER}
  <div class="motto">Everyone has a story worth telling.</div>
  <div class="sans">Written${author ? ` by ${escape(author)}` : ''}. Made with Write On!<br>Published ${published}.</div>
</section>
</body></html>`;
}
