@AGENTS.md

# Carlos Guzman — portfolio

A bilingual (EN/ES) Next.js portfolio positioning Carlos Guzman as a software
engineer for remote full-time and contract roles, with five case studies as
proof. Audience: recruiters and hiring managers first, contract clients second.

## Read these before writing anything

| File | What it decides |
| --- | --- |
| `docs/plan.md` | The whole v1 plan: milestones, scope, backlog |
| `docs/decisions.md` | **How** the site is built: decisions log, design system, technical architecture |
| `docs/content-sources.md` | **What** it says: the confirmed facts, the only source copy may be written from |

## Content rules

These are not style preferences. Breaking one puts a false claim in front of a
recruiter.

- **No copy may assert a fact that is not in `docs/content-sources.md`.** Not a
  date, a number, a client name, a role, a stack item or an outcome.
- Where a fact is missing, write `[PLACEHOLDER]` and ask Carlos. Never infer,
  round, estimate, or borrow a number from a neighbouring project.
- UtahBIM's own time-savings claims stay out of the VDC case study unless they
  are quoted and attributed to vdcplugins.com.
- **No prices or rates anywhere.** The contract block names four kinds of work
  and nothing about money.
- **No booking links** in v1. The contact form and the Upwork link are the only
  ways to reach Carlos.
- Carlos approves every line of EN and ES copy before it is committed.
- Spanish is natural Mexican Spanish, not translated English. Run
  `/translate-es` and keep "Desarrollador de software" as the title.

## Content model

Facts live once, in TypeScript. Words live per locale, in MDX.

- `content/projects.ts` — the typed, Zod-validated project registry: `slug`,
  `order`, `featured`, `status`, `timeframe`, `client`, `team`, `stack[]`,
  `tags[]`, `links[]`, `hero`. The build fails if a record has no MDX file in
  both locales.
- `content/{en,es}/projects/<slug>.mdx` — title, summary and body prose only.
- `messages/{en,es}.json` — every UI string. No hardcoded user-facing text in a
  component, ever.

Use `/new-case-study <slug>` to add a project; it writes the record and both
MDX files with placeholders.

## Design

Direction C, "Scientific paper" — the full token table and type scale are in
`docs/decisions.md`. In short:

- IBM Plex Serif for headlines, Sans for body, Mono for metadata and code,
  loaded with `next/font/google` in `app/layout.tsx`.
- Near-monochrome page with **one** deep-green accent, `--brand`. shadcn's
  `--accent` stays a neutral hover tint — do not colour it.
- Tailwind v4 theme tokens in `app/globals.css`: `text-hero`, `text-h2`,
  `text-h3`, `text-body`, `text-meta`, `max-w-text`, `bg-brand`, `text-brand`.
  Reach for these before writing an arbitrary value.
- Motifs: `Fig. N —` captions on diagrams, `§ 01` section labels, footnotes for
  asides.
- 8 px vertical rhythm, so even spacing utilities (`2`, `4`, `6`, `8`, …).
- Motion is fades and small translates only, 150–200 ms, already disabled under
  `prefers-reduced-motion` in `globals.css`.
- Theme follows the system via `next-themes`; never hardcode a colour that only
  works in one theme.

## Architecture

- Next.js 16 App Router, Turbopack, Server Components everywhere **except** the
  language toggle, theme toggle and contact form.
- `next-intl` without i18n routing. Locale lives in the `NEXT_LOCALE` cookie;
  switching calls a server action then `router.refresh()`. **The URL never
  changes.**
- shadcn components go in `components/ui/` via the CLI; site chrome in
  `components/site/`, case-study parts in `components/case-study/`, diagrams in
  `components/figures/`.
- Site URL comes from `NEXT_PUBLIC_SITE_URL`. No domain is bought yet, so never
  hardcode one.

## Accessibility

Every interactive control is labelled and announced. Toggles need accessible
names. The axe suite must pass in both locales and both themes — that is a
commit gate, not a nice-to-have.

## Session setup

`.claude/settings.json` wires two hooks, both Node so they behave the same on
Windows and Unix:

- after every `Edit`/`Write`, `fix-file.mjs` runs `eslint --fix` on that file.
  It is advisory and always exits 0;
- on `Stop`, `check.mjs` typechecks and lints — but only when a `.ts`, `.tsx`
  or `.mdx` file is dirty — and exits 2 on failure, so the turn does not end on
  broken code.

New or changed hooks need Claude Code restarted in this directory, and
approved, before they run.

`.mcp.json` provides the shadcn and Playwright MCP servers.

## Workflow

One milestone per session. Work directly on `main`: no feature branches, no
PRs. Plan mode first; Carlos approves the plan before any code. Before
committing: run `/verify`, then ask the `reviewer` subagent. Report failures;
never fix a check by weakening it. Commit and push to `main` only when Carlos
asks.
