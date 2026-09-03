# 123 Savoree

**Delicious things come in 3's.**

A mobile/iPad-first cooking app for kids, teenagers, and beginner cooks. Bright, kid-friendly design (Seamless-style layout, green accent) with 3-step recipes, an AI recipe generator, and a moderated community feed.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** (CSS-first theme in `src/app/globals.css`)
- **@anthropic-ai/sdk** for the AI recipe generator and the Pollee parrot chat (`claude-opus-5`, structured/guardrailed output)
- **@supabase/supabase-js** for the sign-up gate's email capture
- **qrcode** for the client-generated Venmo donation QR code
- Web Speech API for voice input (no external dependency)

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # then fill in your real ANTHROPIC_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Where it's used | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | `src/app/api/generate-recipe/route.ts`, `src/app/api/parrot-chat/route.ts` | Server-side only, read via `@anthropic-ai/sdk`'s default `Anthropic()` client. Never exposed to the browser. `.env.local` is gitignored. |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase.ts`, used by `SignUpGate.tsx` | From your Supabase project's **Settings → API**. Both are safe to expose to the browser — the anon key can only do what your Row Level Security policies allow. **If these are left unset, the sign-up gate still works** (it unlocks the app locally without persisting the email) so the rest of the app is testable before you've created a Supabase project. |

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

The parental-permission flow (`src/app/api/order-ingredients/route.ts`) is a **simulation only** — there's no Twilio/SMS provider wired up. It returns the payload a real integration would send (recipient, message body, status) so the UI flow is demonstrable end-to-end. Swap in a real provider by replacing the `console.log` + response in that route handler.

## Project Structure

```
src/
  app/
    page.tsx                 # composes all sections, wrapped in AppGate
    layout.tsx                # fonts (Fredoka + Nunito), metadata
    globals.css                # theme tokens (color, font), marquee/bubble keyframes
    api/
      generate-recipe/route.ts    # Anthropic SDK call, structured JSON output
      order-ingredients/route.ts  # simulated SMS payload
      parrot-chat/route.ts        # guardrailed cooking-only chat for the parrot mascot
  components/                # Header, Hero, RecipeCarousel, AIRecipeSection,
                              # CommuniteeSection, Footer, and their modals
                              # AppGate + SignUpGate (mandatory email gate)
                              # ParrotMascot + ParrotChat + ParrotIcon (FAB assistant)
  lib/
    anthropic.ts                # server-side Anthropic client
    supabase.ts                 # browser Supabase client (null-safe if unconfigured)
  data/
    recipes.ts                 # the 8 built-in Recipe Templates
    community.ts                # mock Communitee UGC cards
```

## Design System

| Token | Value |
|---|---|
| Primary accent | `#10B981` (`savoree-green`) |
| Bright accent | `#2ECC71` (`savoree-green-bright`) |
| Background | `#FFFDF7` (`savoree-cream`) |
| Secondary surface | `#FFF4E0` (`savoree-sand`) |
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

1. Open the **Local variables** panel (or Styles) and create color variables matching the design tokens above: `savoree/green` (`#10B981`), `savoree/green-bright` (`#2ECC71`), `savoree/cream` (`#FFFDF7`), `savoree/sand` (`#FFF4E0`), `savoree/ink` (`#1C2B22`), `savoree/amber` (`#FFB020`), `savoree/coral` (`#FF6B5C`).
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
