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

## Environment

Set these in `.env.local` locally and in Vercel (Preview and Production). The
build needs none of them; the contact form fails politely without them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The site's public URL, used by metadata, the sitemap and robots: `https://cguzman.dev` in Production. On Vercel it falls back to the production address |
| `RESEND_API_KEY` | Resend API key for the contact form, from the account that verified `cguzman.dev` |
| `CONTACT_TO` | Where contact messages go: `carlos@cguzman.dev` |
| `RESEND_FROM` | Sender on the verified domain: `Portfolio <portfolio@cguzman.dev>`. Unset, it falls back to Resend's test sender, which only delivers to the Resend account's own email |
| `CONTACT_DRY_RUN` | `1` logs messages instead of sending them. Set by the Playwright config; ignored on Vercel |

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
| `npm run lhci` | Lighthouse CI: 95 per category, 90 for mobile performance. Needs a build first; see below |

## Lighthouse

`npm run lhci` audits every page once per call, at 95 per category (90 for
mobile performance). With no `LIGHTHOUSE_BASE_URL` it
starts `next start` on port 3000 itself. Env vars pick the combination:
`LIGHTHOUSE_PRESET` (`mobile` | `desktop`), `LIGHTHOUSE_THEME` (`light` | `dark`),
`LIGHTHOUSE_LOCALE` (`en` | `es`). Reports land in `.lighthouseci/`.

The **Lighthouse** workflow runs all eight combinations against each Vercel
deployment once it succeeds. It needs the repo secret
`VERCEL_AUTOMATION_BYPASS_SECRET`, the value of Vercel's *Protection Bypass for
Automation* (Project Settings → Deployment Protection).

## Documentation

- [`docs/plan.md`](docs/plan.md) — the v1 plan, in eight milestones
- [`docs/decisions.md`](docs/decisions.md) — decisions log, design system,
  technical architecture
- [`docs/content-sources.md`](docs/content-sources.md) — the confirmed facts;
  the only source site copy is written from
- [`CLAUDE.md`](CLAUDE.md) — working rules for Claude Code sessions

## Licence

Code is readable for review. The IBM Plex fonts in `assets/fonts/` are under the
SIL Open Font License (`assets/fonts/LICENSE.txt`). The content, copy, images and design are not
licensed for reuse.
