# portfolio

Carlos Guzman's portfolio — a bilingual (EN/ES) Next.js site with five case
studies. Public so the one codebase that isn't private can be read.

Live at the URL in `NEXT_PUBLIC_SITE_URL`.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) ·
Tailwind v4 · shadcn · next-intl · MDX · Playwright + axe

## Getting started

```bash
npm ci
npm run dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `next typegen` then `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright + axe, run once per theme. Needs a build first |
| `npm run verify` | All four of the above, in order — the pre-commit gate |

## Documentation

- [`docs/plan.md`](docs/plan.md) — the v1 plan, in eight milestones
- [`docs/decisions.md`](docs/decisions.md) — decisions log, design system,
  technical architecture
- [`docs/content-sources.md`](docs/content-sources.md) — the confirmed facts;
  the only source site copy is written from
- [`CLAUDE.md`](CLAUDE.md) — working rules for Claude Code sessions

## Licence

Code is readable for review. The content, copy, images and design are not
licensed for reuse.
