---
name: verify
description: Run the portfolio's full check suite — typecheck, lint, production build, and the Playwright + axe accessibility tests in every theme. Use before opening a PR, when the user runs /verify, or when they ask whether the site passes its checks.
---

# Verify

The pre-PR gate. Runs every check, reports every failure, **fixes nothing
silently.**

## Steps

Run these in order. Do not skip a later step because an earlier one failed —
Carlos wants the whole picture in one pass, so capture each result and keep
going, unless a step physically cannot run. A failed build blocks the e2e
tests, for example; say so and continue to the report.

1. `npm run typecheck` — `next typegen` then `tsc --noEmit`. The typegen step
   is required: `PageProps`, `LayoutProps` and `RouteContext` are generated
   globals, and `tsc` fails without them.
2. `npm run lint` — ESLint flat config.
3. `npm run build` — Turbopack production build. This also type-checks with the
   project-local `tsc`, and it is where a case study missing an MDX file fails.
4. `npm run test:e2e` — Playwright, which runs every spec twice, once per theme
   (`chromium-light`, `chromium-dark`), including the axe assertions. The specs
   cover both locales via the `NEXT_LOCALE` cookie.

`npm run verify` chains all four; run them individually when you need to see
which one broke.

## Reporting

Report a short table: step, pass or fail, and for each failure the **first**
real error with its file and line. Quote the actual output; do not paraphrase a
stack trace.

Then stop and wait. Do not:

- weaken a check to make it pass — no `ignoreBuildErrors`, no `eslint-disable`
  on a real finding, no `test.skip`, no loosened axe rule, no `as any`;
- "fix" an accessibility violation by deleting the control that triggered it;
- commit anything.

Propose a fix for each failure and let Carlos choose. The one exception is a
genuinely mechanical fix, like a missing import or a typo in a token name,
which you may apply — but say explicitly that you did, and re-run the step.

## Known gaps to state, not hide

- `.github/workflows/ci.yml` runs the same four steps on push and PR, but a
  green local run is not proof that CI is green. Say so when CI has not run.
