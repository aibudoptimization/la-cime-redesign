# La Cime — redesign (Next.js)

Marketing homepage rebuilt with the **App Router** (`src/app/`), **TypeScript**, and your existing design system.

## Scripts

- `npm run dev` — local dev (Turbopack)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Environment setup

This project uses local environment variables via `.env`.

1. Copy `.env.example` to `.env`.
2. Set local values in `.env`.
3. Never commit real secrets.

Notes:
- `.env` and `.env.*` are gitignored.
- `.env.example` is committed as a safe template with placeholders only.

## Project layout

| Path | Role |
|------|------|
| `src/app/layout.tsx` | Root layout, fonts (`next/font`), global CSS import |
| `src/app/page.tsx` | Home route |
| `src/components/LaCimeHome.tsx` | Page markup (ported from `legacy/index.html.bak`) |
| `src/components/ClientEffects.tsx` | Client-only: nav scroll, reveal observer, smooth hash links |
| `src/styles/la-cime.css` | Global styles (uses `--font-jost` / `--font-cormorant` from layout) |
| `legacy/index.html.bak` | Previous static HTML reference |
| `assets/` | Legacy static assets folder (CSS/JS copies kept for reference) |

To refresh styles from the old path, copy `assets/css/styles.css` into `src/styles/la-cime.css` and re-apply the `var(--font-jost)` / `var(--font-cormorant)` font-family rules at the top of that file (see current `la-cime.css`).

## Optional: regenerate `LaCimeHome.tsx` from HTML

If you edit `legacy/index.html.bak` and want to re-port:

1. Run the small scripts in `scripts/` (see `scripts/fix-styles.mjs` and `scripts/build-home.mjs`) after updating `src/components/_body.txt` from the HTML body, **or** hand-edit `LaCimeHome.tsx`.
