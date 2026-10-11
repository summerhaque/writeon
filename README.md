# Write On!

*Everyone has a story worth telling, and every voice deserves the chance to be heard.*

Write On! is a creative writing app that gives every young writer, ages 8 to 13, their own AI writing coach, guiding them from a first idea all the way to a published book. Made by Summer Haque.

```
brand/      logo files, colors and type (BRAND.md is the source of truth)
app/        the Expo demo app (iOS and Android, runs in Expo Go)
website/    the marketing site (static HTML, CSS and JS, no build step)
docs/cac/   Congressional App Challenge answers, video script and cover image
```

## The app (demo build)

**This is a demo build.** The real Write On! is built in React on Base44, and its coach calls an AI model. In this Expo demo, Coach Sparkle is **scripted and runs on the device with no network**. The app says so in the coach screen header and in Settings. All data is hardcoded or stored locally, and signing in is just a pen name.

The demo uses Expo SDK 57, which is what the App Store and Play Store versions of Expo Go run as of October 2026. Use Node 20.19.4 or newer.

```bash
cd app
npm install
npx expo start          # scan the QR code with Expo Go, or press i for the iOS simulator
npx expo start --tunnel # from another network. If ngrok won't install: npm install @expo/ngrok@^4.1.0 --legacy-peer-deps
```

Expo Go asks you to log in to both the Expo CLI (`npx expo login`) and the Expo Go app before it opens a project in development.

New writers start with a lived-in desk: one published book on the shelf, *The Tower of Fibs* half-written, a five-day streak and two lessons done. Finishing a third lesson unlocks a badge. **Progress → Settings → Erase everything and start over** resets the app, but first it asks the writer to save their published books.

| | |
|---|---|
| `src/app/` | Screens (Expo Router) |
| `src/theme/` | Colors, the Plus Jakarta Sans type scale, spacing, radii and shadows (from `brand/BRAND.md`) |
| `src/components/brand/logo.tsx` | The mark, in `mark`, `icon`, `lockup` and `stacked` variants, theme-aware |
| `src/coach/coach-engine.ts` | The scripted coach. `CoachBrain` is where a real AI model plugs in, and `COACH_SYSTEM_PROMPT` holds the "hints, not answers" rules. |
| `src/content/` | Coach scripts, roadmap prompts, lessons, sample books, daily sparks, the seed stories and the 12 scene plates |
| `src/publish/` | PDF typesetting (`expo-print`) and sharing |

Checks: `npx tsc --noEmit` and `npx expo export --platform ios`.

## The website

```bash
cd website && python3 -m http.server 4601
```

It's a single page, light by default, with dark mode following the system. The coach demo is labelled as a canned demo of the real coach. It plays the app's Characters-stage script (`assets/js/coach-data.js`, generated from `app/src/content/coach.ts`).

**Deploy (Render, static site):** leave Build Command empty and set Publish Directory to `website`, with no environment variables. If the site looks unstyled after a deploy, use Manual Deploy → Clear build cache & deploy, then hard-refresh.

## CAC

`docs/cac/` has the draft answers, the video script and `cover.jpg` (600×800). `cover.html` and `og-image.html` are the sources for the cover and the website's social image. Read the AI-disclosure section in `answers.md` before submitting.
