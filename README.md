# Write On!

*Everyone has a story worth telling.*

Write On! is a step-by-step creative writing studio that takes young writers, ages 8 to 13, from their very first idea to a finished, published book. Its coach, Coach Sparkle, gives hints, never answers. Made by Summer Haque.

```
brand/      the logo, colors and fonts (the source of truth; don't edit)
app/        the Expo app (iOS and Android, runs in Expo Go)
website/    the marketing site (static HTML, CSS and JS, no build step)
docs/cac/   Congressional App Challenge answers, video script and cover image
```

## The app

Expo SDK 57, which is what the App Store and Play Store versions of Expo Go run as of October 2026. Use Node 20.19.4 or newer.

```bash
cd app
npm install
npx expo start          # scan the QR code with Expo Go, or press i for the iOS simulator
```

Expo Go now asks you to log in to both the Expo CLI (`npx expo login`) and the Expo Go app before it opens a project in development.

Everything is local: no backend and no network calls. Stories, progress and settings are saved on the device. Signing in is just a pen name and an optional class code. New writers find a half-finished demo story, *The Tower of Fibs*, already on their desk. **Progress → Settings → Erase everything and start over** resets the app.

Where things live:

| | |
|---|---|
| `src/app/` | Screens (Expo Router) |
| `src/domain/` | Story model, roadmap builder, stage logic, badges, lesson checks |
| `src/coach/coach-engine.ts` | Coach Sparkle. Scripted and local. `CoachBrain` is the seam for a real AI model, and `COACH_SYSTEM_PROMPT` holds the "hints, not answers" rules for it. |
| `src/content/` | Everything kids read: coach scripts, roadmap prompts, lessons, sample books, daily sparks and the 12 illustration plates |
| `src/publish/` | PDF book typesetting (`expo-print`) and sharing |
| `src/components/ui/` | The design system: type scale, buttons, fields and surfaces |

Checks: `npx tsc --noEmit`, then `npx expo export -p android` (or `-p ios`) to make sure Metro can actually bundle it.

## The website

Open `website/index.html` in a browser, or serve the folder:

```bash
cd website && python3 -m http.server 8000
```

It's a single page, with light and dark themes. The coach demo uses the same script as the app's Characters stage (`assets/js/coach-data.js`, generated from `app/src/content/coach.ts`).

## CAC

Everything for the submission is in `docs/cac/`: draft answers, the demo video script and the cover image. Read the AI-disclosure note in `answers.md` before you submit.
