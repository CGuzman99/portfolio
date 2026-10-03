---
name: new-case-study
description: Scaffold a new case study — adds the typed record to content/projects.ts and creates the EN and ES MDX files with [PLACEHOLDER] sections. Use when the user asks to add a project or case study to the portfolio, or runs /new-case-study <slug>.
---

# New case study

Scaffolds one case study. **Structure only** — this skill never writes copy.

Usage: `/new-case-study <slug>` (kebab-case, e.g. `forge-clash-insight`).

> Depends on the content system from M3. If `content/projects.ts` does not
> exist yet, say so and stop rather than inventing a shape for it.

## Steps

1. **Check the slug.** It must be kebab-case and must not already appear in
   `content/projects.ts` or as a file in `content/en/projects/`. If it does,
   stop and say so — do not overwrite.

2. **Read the facts.** Find the project's row and its "Approach highlights"
   entry in `docs/content-sources.md`. Everything you fill in comes from there.
   If the project is not in that file, stop and ask Carlos for the facts.

3. **Add the registry record** to `content/projects.ts`, matching the existing
   records' shape and the Zod schema exactly. Fill every field you can source
   from `content-sources.md`:

   - `order` — the project's number in the lineup; renumber the others if you
     insert in the middle.
   - `featured` — `true` only for the three projects Home lists.
   - `status` — `live`, `commercial` or `prototype`.
   - `timeframe` — `{ start, end }`, with `end: null` for "present".
   - `client` — `{ name, url }`, or `null` when Carlos is the client.
   - `hero` — `{ kind: "screenshot" | "figure", src }`. The asset itself
     arrives in M6; point at the path it will have.

   Any fact that is not in `content-sources.md` becomes `"[PLACEHOLDER]"`.
   Never guess a date, a team size or an outcome.

4. **Create both MDX files** — `content/en/projects/<slug>.mdx` and
   `content/es/projects/<slug>.mdx` — with frontmatter and the four body
   sections, every body left as a placeholder:

   ```mdx
   ---
   title: "[PLACEHOLDER]"
   summary: "[PLACEHOLDER]"
   ---

   ## Problem

   [PLACEHOLDER]

   ## My role

   [PLACEHOLDER]

   ## Approach

   [PLACEHOLDER]

   ## Outcome

   [PLACEHOLDER]
   ```

   Use the Spanish headings in the ES file (`Problema`, `Mi rol`, `Enfoque`,
   `Resultado`) but leave the bodies as `[PLACEHOLDER]`. Prose is written in M7
   and translated with `/translate-es`.

5. **Verify.** Run `npm run typecheck`, then `npm run build` to confirm the
   record validates and both locales resolve. Report what you created and which
   fields came out as `[PLACEHOLDER]`, so Carlos knows what he still owes.
