# 123 Savoree

**Delicious things come in 3's.**

A mobile/iPad-first cooking app for kids, teenagers, and beginner cooks. Bright, kid-friendly design (Seamless-style layout, neon blue + navy accent) with 3-step recipes, an AI-style recipe generator, and a moderated community feed.

**Live at:** https://bofrompursuit.github.io/123-Savoree/ (auto-deployed from `main` via GitHub Actions — see [Deployment](#deployment)).

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack), built as a **static export** (`output: "export"`) so it can be hosted on GitHub Pages with no server
- **Tailwind CSS v4** (CSS-first theme in `src/app/globals.css`)
- A built-in recipe/chat library (`src/lib/fallbackRecipes.ts`, `src/lib/fallbackChat.ts`) powers "...more One Two Three Recipee" and Pollee — no API key, no server, no cost (see [AI features](#ai-features-no-server-no-api-key))
- **@supabase/supabase-js** for the sign-up gate's email capture
- **qrcode** for the client-generated Venmo donation QR code
- Web Speech API for voice input and Pollee's voice output (no external dependency)

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # optional — only needed for Supabase, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To preview the actual static export (what GitHub Pages serves) locally:

```bash
npm run build   # writes the static site to ./out
npm start       # serves ./out at http://localhost:3000
```

## Deployment

This repo deploys to **GitHub Pages** automatically on every push to `main` via `.github/workflows/deploy.yml`. No server, no API keys, and no manual deploy step required.

Because GitHub Pages hosts project sites at `https://<user>.github.io/<repo>/`, `next.config.ts` sets `basePath`/`assetPrefix` to `/123-Savoree` — if you fork this repo under a different name, update `REPO_NAME` in `next.config.ts` to match, and update any raw `<video>`/`<audio src>` references that import `BASE_PATH` from `src/lib/basePath.ts` (next/image and next/link apply basePath automatically; plain HTML elements don't).

The GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch") in the repo's Settings → Pages.

### Wanting real Claude-generated responses instead of the built-in library?

That needs a host that can run server code and keep an API key secret — GitHub Pages can't do either. Point a Next.js server deployment (Vercel, Netlify, Render, etc.) at this repo, reintroduce API routes under `src/app/api/` that call `@anthropic-ai/sdk`, and remove `output: "export"` from `next.config.ts`. The `src/lib/fallbackRecipes.ts` / `fallbackChat.ts` logic can stay as a graceful no-key fallback on that deployment too.

### Environment variables

| Variable | Where it's used | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase.ts`, used by `SignUpGate.tsx` | From your Supabase project's **Settings → API**. Both are safe to expose to the browser — the anon key can only do what your Row Level Security policies allow, and this call already runs client-side (no server needed). **If these are left unset, the sign-up gate still works** (it unlocks the app locally without persisting the email) so the rest of the app is testable before you've created a Supabase project. |

### AI features (no server, no API key)

"...more One Two Three Recipee" and Pollee both run **entirely in the browser** via a small built-in library — this isn't a temporary fallback, it's how the GitHub Pages deployment works permanently (see [Deployment](#deployment) for what real Claude generation would require):

- **Recipe generation** (`src/lib/fallbackRecipes.ts`) matches the query against ~20 common kid recipes (pizza, tacos, pasta, pancakes, etc.) and falls back to a generic 3-step template for anything else.
- **Pollee's chat** (`src/lib/fallbackChat.ts`) uses a keyword-based safety guardrail (redirects off-topic or high-risk kitchen questions to "ask Mom or Dad") plus food-specific answers pulled from the same recipe library.

#### Setting up the `signups` table

In the Supabase SQL editor:

```sql
create table signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table signups enable row level security;

-- Allow anyone (the anon key) to insert their own email, but not read others'.
create policy "Anyone can sign up"
  on signups for insert
  to anon
  with check (true);
```

### Media assets

| File | Source | License |
|---|---|---|
| `public/audio/theme.mp3` | [Mixkit — Latin Pop](https://mixkit.co/free-stock-music/latin-pop/) | Mixkit Free License — free for commercial use, no attribution required |
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
                              # ParrotMascot + ParrotChat + ParrotIcon (FAB assistant)
  lib/
    fallbackRecipes.ts          # curated recipe library + query matching
    fallbackChat.ts             # Pollee's guardrail + food-aware replies
    useSpeechToText.ts           # shared voice-input hook (mic button)
    parrotVoice.ts               # speech-synthesis wrapper (Pollee's voice)
    supabase.ts                 # browser Supabase client (null-safe if unconfigured)
    basePath.ts                  # GitHub Pages basePath constant for raw <video>/<audio>
  data/
    recipes.ts                 # the 8 built-in Recipe Templates
    community.ts                # mock Communitee UGC cards
.github/workflows/
  deploy.yml                    # builds the static export and deploys to GitHub Pages
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
