# 123 Savoree

**Delicious things come in 3's.**

A mobile/iPad-first cooking app for kids, teenagers, and beginner cooks. Bright, kid-friendly design (Seamless-style layout, neon blue + navy accent) with 3-step recipes, an AI-style recipe generator, and a moderated community feed.

**Live at:** https://123-savoree.vercel.app (Vercel — see [Deployment](#deployment); previously GitHub Pages, migrated to support the server-side features below).

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack), deployed on **Vercel** as a normal server build (Server Actions power the live recipe scraping below — this stopped being a static export when that was added)
- **Tailwind CSS v4** (CSS-first theme in `src/app/globals.css`)
- A built-in recipe/chat library (`src/lib/fallbackRecipes.ts`, `src/lib/fallbackChat.ts`) powers "...more One Two Three Recipee" and Toquee by default — no API key, no network call, no cost (see [AI features](#ai-features))
- **Nimble API** (`src/lib/nimble.ts`) for live recipe-link scraping — see [AI features](#ai-features)
- **@supabase/supabase-js** for the sign-up gate's email capture and Communitee's moderated submissions
- **qrcode** for the client-generated Venmo donation QR code
- Web Speech API for voice input and Toquee's voice output (no external dependency)

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # optional — only needed for Supabase/Nimble, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To preview a production build locally:

```bash
npm run build
npm start       # serves the build at http://localhost:3000
```

## Deployment

This repo deploys to **Vercel**. Link it once (`vercel link`) and every push to `main` deploys automatically via Vercel's Git integration — no GitHub Actions workflow involved (the old `.github/workflows/deploy.yml` for GitHub Pages has been removed).

There's no `basePath` to configure — unlike GitHub Pages' project-site subpath, Vercel serves the app at the domain root, which is also why `src/lib/basePath.ts`'s `BASE_PATH` constant is now just `""`.

### Wanting real Claude-generated responses instead of the built-in library?

The server-side pieces (Server Actions, secret env vars) already work here now that this deploys to Vercel — that part of the migration is done. What's still missing is the code: add `@anthropic-ai/sdk`, a `ANTHROPIC_API_KEY` env var, and a Server Action that calls it, then have `AIRecipeSection.tsx`/`ToqueeChat.tsx` try that first and fall back to `fallbackRecipes.ts`/`fallbackChat.ts` on any error — the same pattern `scrapeRecipeAction.ts` already uses for Nimble.

### Environment variables

| Variable | Where it's used | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase.ts`, used by `SignUpGate.tsx` and `src/lib/community.ts` | Optional — `src/lib/supabase.ts` already has this project's URL and publishable key baked in as defaults (Supabase publishable keys are meant to ship in client code; access is governed by the table's Row Level Security policy, not by keeping this value secret), so the deployed site works without setting anything. Set these only to point a local dev checkout at a **different** Supabase project. |
| `NIMBLE_API_KEY` | `src/lib/nimble.ts`, called from `src/lib/scrapeRecipeAction.ts` (a Server Action) | Required for the "paste a recipe link" scraping mode in [AI features](#ai-features) to work — without it, `scrapeRecipeFromUrl()` returns `null` and the UI shows a "couldn't fetch that link" message. Server-only; never prefix with `NEXT_PUBLIC_`. Set it in Vercel under Project Settings → Environment Variables (or `vercel env add NIMBLE_API_KEY`) as well as locally in `.env.local`. |

### AI features

- **Recipe generation** (`src/lib/fallbackRecipes.ts`) — the default. Matches a typed-in dish name against ~20 common kid recipes (pizza, tacos, pasta, pancakes, etc.) and falls back to a generic 3-step template for anything else. Runs entirely client-side, no API key, no network call.
- **Toquee's chat** (`src/lib/fallbackChat.ts`) — same no-key default: a keyword-based safety guardrail (redirects off-topic or high-risk kitchen questions to "ask Mom or Dad") plus food-specific answers pulled from the same recipe library.
- **Live recipe-link scraping** (`src/lib/nimble.ts`, `src/lib/recipeParser.ts`, `src/lib/scrapeRecipeAction.ts`) — paste a URL into the "...more One Two Three Recipee" box instead of a dish name, and a Server Action calls the [Nimble Web API](https://docs.nimbleway.com) to fetch the real page (bypassing anti-bot blocks) as markdown, then heuristically parses its "Ingredients"/"Instructions" headings into the same grocery-list + 3-step shape as the fallback library. Requires `NIMBLE_API_KEY` (see above); without it, or if the scrape/parse fails, the UI shows a graceful error rather than a fabricated recipe.

#### Setting up the `leads` table

The sign-up gate inserts into a `leads` table with a single `contact_info` column (holds either an email or a phone number). Run this once in the Supabase SQL editor for the project above:

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  contact_info text not null,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

-- Allow anyone (the publishable/anon key) to insert a lead, but not read others'.
create policy "Anyone can submit a lead"
  on leads for insert
  to anon
  with check (true);
```

Until this table exists, submissions on the live site will fail with a graceful "Something went wrong saving that" error (shown in the form, logged to the browser console) rather than silently losing data or crashing.

#### Setting up the `community_submissions` table (Communitee's admin review safeguard)

"+ Share Your Win" (`SubmissionModal.tsx`) inserts into a `community_submissions` table via `src/lib/community.ts`. Run this once in the Supabase SQL editor for the project above:

```sql
create table community_submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  category text not null,
  image_url text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table community_submissions enable row level security;

-- Anyone can submit a post for review, but can't read other people's
-- pending (unapproved) posts.
create policy "Anyone can submit a post for review"
  on community_submissions for insert
  to anon
  with check (true);

-- The actual safeguard: a post is only publicly visible once approved.
create policy "Anyone can view approved posts"
  on community_submissions for select
  to anon
  using (approved = true);
```

There's no self-service admin panel (in keeping with this app having no privileged backend) — an admin reviews pending rows (`approved = false`) in the Supabase Table Editor and flips `approved` to `true` to make a post go live in the `CommuniteeSection` marquee, which fetches approved submissions via `fetchApprovedSubmissions()` in `src/lib/community.ts` alongside the curated seed posts in `src/data/community.ts`. The photo/video file picker in the submission form isn't wired to real storage yet — every submission gets a placeholder image (`PLACEHOLDER_IMAGE` in `community.ts`) until that's built.

### Media assets

| File | Source | License |
|---|---|---|
| `public/audio/theme.mp3` | [Mixkit — Playground Fun](https://mixkit.co/free-stock-music/instrument/ukulele/) (by Ahjay Stelino) | Mixkit Free License — free for commercial use, no attribution required |
| `public/video/kids-baking.mp4` | [Mixkit — gingerbread cookie decorating](https://mixkit.co/free-stock-video/close-up-of-people-decorating-gingerbread-cookies-for-christmas-48876/), used behind `SignUpGate.tsx` | Mixkit Free License |
| `public/video/burger-fries.mp4` | [Mixkit — double burger with fries](https://mixkit.co/free-stock-video/double-burger-with-fries-14010/), used behind `AIRecipeSection.tsx` | Mixkit Free License |

Swap any of these for your own assets at any time — no code changes needed beyond the file path (`AudioPlayer.tsx`, `SignUpGate.tsx`, `AIRecipeSection.tsx`).

### SMS "Order Ingredients" simulation

The parental-permission flow (in `AIRecipeSection.tsx`'s `handleOrderIngredients`) is a **simulation only**, entirely client-side — there's no Twilio/SMS provider wired up. It builds the message a real integration would send (recipient, body) and displays it, so the UI flow is demonstrable end-to-end without a server.

## Project Structure

```
src/
  app/
    page.tsx                 # composes all sections, wrapped in AppGate
    layout.tsx                # fonts (Fredoka + Nunito), metadata
    globals.css                # theme tokens (color, font), marquee/bubble keyframes
  components/                # Header, Hero, RecipeCarousel, AIRecipeSection,
                              # CommuniteeSection, Footer, and their modals
                              # AppGate + SignUpGate (mandatory email gate)
                              # ToqueeMascot + ToqueeChat + ToqueeIcon (FAB assistant)
  lib/
    fallbackRecipes.ts          # curated recipe library + query matching
    fallbackChat.ts             # Toquee's guardrail + food-aware replies
    nimble.ts                    # server-only Nimble Web API client (recipe-link scraping)
    recipeParser.ts               # scraped markdown -> grocery-list + 3-step shape
    scrapeRecipeAction.ts          # Server Action gluing nimble.ts + recipeParser.ts to the UI
    useSpeechToText.ts           # shared voice-input hook (mic button)
    toqueeVoice.ts                 # speech-synthesis wrapper (Toquee's voice)
    supabase.ts                 # browser Supabase client (this project's URL/key baked in as defaults)
    community.ts                # Communitee submission insert + approved-post fetch
    basePath.ts                  # asset path constant for raw <video>/<audio> (empty on Vercel)
  data/
    recipes.ts                 # the 8 built-in Recipe Templates
    community.ts                # curated Communitee seed posts (merged with live submissions)
```

## Design System

| Token | Value |
|---|---|
| Primary CTA (neon blue) | `#00C2FF` (`savoree-neon`) |
| Accent blue | `#2563EB` (`savoree-blue`) |
| Bright accent | `#38BDF8` (`savoree-blue-bright`) |
| Dark navy (text/borders/footer) | `#0B1F3A` (`savoree-navy`) |
| Ink (body text) | `#0B1424` (`savoree-ink`) |
| Background | `#FFFDF7` (`savoree-cream`) |
| Secondary surface | `#EEF4FF` (`savoree-sand`) |
| Display font | [Fredoka](https://fonts.google.com/specimen/Fredoka) — bold, rounded, kid-friendly |
| Body font | [Nunito](https://fonts.google.com/specimen/Nunito) |

Breakpoints follow Tailwind defaults, tuned mobile-first: base styles target a 390px phone, `sm:` (640px) covers tablet/iPad portrait, and the layout caps out at a `max-w-6xl` desktop container.

---

## Figma Setup — 3-Frame Responsive Layout

Use this to mirror the app's breakpoints in Figma with Auto Layout, so design and code stay in sync.

### 1. Create the file & page

1. New Figma file → rename to **"123 Savoree"**.
2. Create a page called **Screens**.

### 2. Set up styles first (so frames can reference them)

1. Open the **Local variables** panel (or Styles) and create color variables matching the design tokens above: `savoree/neon` (`#00C2FF`), `savoree/blue` (`#2563EB`), `savoree/blue-bright` (`#38BDF8`), `savoree/navy` (`#0B1F3A`), `savoree/cream` (`#FFFDF7`), `savoree/sand` (`#EEF4FF`), `savoree/ink` (`#0B1424`), `savoree/amber` (`#FFB020`), `savoree/coral` (`#FF6B5C`).
2. Install **Fredoka** and **Nunito** (Figma → Text → Fonts, search Google Fonts) and create text styles: `Display/H1` (Fredoka SemiBold, 40–56px), `Display/H2` (Fredoka SemiBold, 28–32px), `Body/Regular` (Nunito Regular, 16px), `Body/Bold` (Nunito ExtraBold, 14px).

### 3. Create the three frames

Press `F` (Frame tool) and pick each preset size from the right-hand panel, or set custom dimensions:

| Frame name | Width | Height (min) | Use case |
|---|---|---|---|
| `Mobile / 390` | 390px | 844px | iPhone-class phones |
| `iPad / 820` | 820px | 1180px | iPad portrait |
| `Desktop / 1440` | 1440px | 900px | Desktop / large tablet landscape |

Place them left-to-right on the canvas in that order (Mobile → iPad → Desktop) — this is the standard responsive-review layout and matches the app's own breakpoint order.

### 4. Build with Auto Layout (so resizing behaves like the real CSS)

1. Inside each frame, add a top-level **Auto Layout** group (`Shift+A`) set to **Vertical**, with:
   - Padding: `16px` (Mobile), `24px` (iPad), `32px` (Desktop) — matches the app's `px-4 / sm:px-6` pattern.
   - Item spacing: `0` (sections butt up against each other, each section owns its own vertical padding).
   - Sizing: **Fill container** width, **Hug contents** height.
2. Add child frames/sections in this order, each its own Auto Layout group (Vertical, Fill width):
   - **Header** (Horizontal Auto Layout, space-between: logo, nav links, Sign Up button)
   - **Hero** (Vertical, centered: eyebrow tag, H1, subheadline, two CTA buttons)
   - **Recipe Templates** (section heading + a horizontal Auto Layout row of 3–4 recipe cards, set to **wrap** off since it's a carousel — represent it as a fixed-width scrolling row)
   - **AI Recipe Helper** (input row + generated recipe card)
   - **Communitee** (heading + row/grid of 4 UGC cards — grid on iPad/Desktop, single column on Mobile)
   - **Footer** (logo, audio player pill, Venmo QR block)
3. For any card component (recipe card, UGC card), build it once as a **Component**, then place **Instances** in each of the 3 frames — editing the master component updates all three, keeping breakpoints in sync as you iterate.

### 5. Responsive behavior per breakpoint

| Section | Mobile (390px) | iPad (820px) | Desktop (1440px) |
|---|---|---|---|
| Header nav | Hidden (hamburger or hidden entirely) | Visible, centered links | Visible, centered links |
| Recipe cards | 1 card fully visible, next peeking | 2–3 cards visible | 3–4 cards visible |
| Communitee grid | 1 column | 2 columns | 4 columns |
| Hero CTAs | Stacked (vertical) | Side-by-side | Side-by-side |

Set each grid/row's Auto Layout to **Wrap** with a fixed child width so Figma reflows the count automatically as you duplicate the frame at different widths — no manual re-placement needed.

### 6. Prototype flows (optional but recommended)

Wire up Figma prototyping on the Mobile frame first: Sign Up button → Auth Modal overlay, a recipe card → Recipe step modal overlay, "+ Share Your Win" → Submission modal overlay. Use **Overlay** interactions (not full-frame navigation) so they match the app's actual modal behavior.

---

## Notes on AI-generated stock imagery

Recipe and Communitee card photos are sourced from Unsplash (`images.unsplash.com`), configured in `next.config.ts` under `images.remotePatterns`. Swap any image URL in `src/data/recipes.ts` / `src/data/community.ts` for your own assets at any time — no code changes needed beyond the URL string.
