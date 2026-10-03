# Portfolio Implementation Plan

Oct 3, 2026 · @CARLOS ANTONIO GUZMAN JIMENEZ

## Overview

The portfolio ships as a bilingual Next.js site in 8 milestones, each built in one Claude Code session and committed directly to `main`. It positions Carlos Guzman as a software engineer for remote full-time and contract roles, with five case studies as proof.

- **Audience:** recruiters and hiring managers first; contract clients second.
- **Headline (EN):** Software engineer building web platforms, desktop tools and AI features.
- **Headline (ES):** Desarrollador de software. Creo plataformas web, herramientas de escritorio y funciones con IA.
- **Supporting line (EN):** I've built an e-commerce platform with Stripe, a multi-currency investment tracker with an AI analyst, Revit add-ins and a 3D clash-detection tool for the construction industry, and an ML forecasting pipeline. Open to full-time and contract roles, remote.
- **Repo:** `CGuzman99/portfolio`, public, so recruiters can read the one codebase that isn't private.
- **Launch date:** none set; milestones are ordered, not scheduled.

## Decisions log

All 17 planning items are decided; the table is the source for `docs/decisions.md` in the repo.

| # | Item | Decision |
| --- | --- | --- |
| 1 | Positioning | Software Engineer, full-stack plus AI; remote full-time and contract roles, US, Mexico and elsewhere; no seniority level stated |
| 2 | Brand | Personal name only; "Available for contract work" block with no prices; Upwork Top Rated and 100% JSS shown; no testimonials; DeepSpace named in About and in the Fibrant, F1 Forecast Lab and Expressus Café case studies (changed by Carlos in M3: all three are DeepSpace projects) |
| 3 | Name and domain | Display name Carlos Guzman; domain and email deferred; site URL read from `NEXT_PUBLIC_SITE_URL` |
| 4 | Lineup | Fibrant, VDC Plugins for Revit, F1 Forecast Lab (featured on Home), then Expressus Café, Forge Clash Insight; UtahBIM named and linked |
| 5 | Case-study facts | Confirmed per project in the Case studies section; unknown outcomes stay as `[PLACEHOLDER]` |
| 6 | Proof assets | Screenshots of public sites and a Fibrant demo account; SVG diagrams; short code excerpts allowed (UtahBIM included); no repo links, "Code walkthrough available on request"; no video in v1 |
| 7 | About and CV | Bio, skills by group, experience, education with thesis pending, languages, photo; EN and ES CV PDFs generated from the site |
| 8 | Contract block | Four kinds of work, remote, through Upwork or directly; links to Upwork and the contact form |
| 9 | Visual identity | Direction C, "Scientific paper": IBM Plex Serif, Sans and Mono; near-monochrome with a deep-green accent; theme follows the system |
| 10 | Layouts | Home: headline plus numbered project index; case study: metadata in a sticky left column on wide screens |
| 11 | Versions | Next.js 16, npm, Tailwind v4, shadcn; i18n copied from Fibrant |
| 12 | Content | `@next/mdx`; Zod-checked `content/projects.ts` for facts; per-locale MDX for words; `rehype-pretty-code` and `shiki` for code |
| 13 | Contact | Fields: name, email, company (optional), reason, message; honeypot plus minimum-time check; Resend test sender to your Gmail now, your own domain later; no booking |
| 14 | Extras | Vercel Web Analytics; `next/og` images; CV PDFs from `/cv` with Playwright |
| 15 | Claude Code setup | `CLAUDE.md`, decisions and content-sources docs, three skills, hooks, reviewer subagent, shadcn and Playwright MCP |
| 16 | Workflow | One milestone per session, committed directly to `main` (no branches or PRs); plan mode first; `/verify` plus reviewer before each commit; Carlos approves all copy |
| 17 | Scope | v1 as listed in Milestones; everything else in Backlog; Claude Code runs in the terminal |

## Site map and page content

Six routes, each at one URL in both languages; the header carries the EN / ES toggle and the theme toggle on every page.

| Route | Content |
| --- | --- |
| `/` | Headline and supporting line; numbered index 01 Fibrant, 02 VDC Plugins, 03 F1 Forecast (one-line summary and stack each); contract block; contact call to action |
| `/projects` | All five case studies in order, with tags (AI, Construction tech, E-commerce, ML/Data) |
| `/projects/[slug]` | Case-study template: sticky metadata column (role, timeframe, stack, client, links); hero visual; Problem, My role, Approach, Outcome; "Code walkthrough available on request"; next project |
| `/about` | Photo, bio, location line, skills by group, experience, education, languages, credentials, CV downloads (EN and ES) |
| `/contact` | Form (name, email, company, reason, message) and links to GitHub, LinkedIn, Upwork |
| `/cv` | Print-styled CV, source of the two PDFs; not linked in the navigation |

**Contract block (Home and About):** full-stack web apps and SaaS; AI features for existing products (LLM integration, tool use, agents); desktop apps and add-ins in C#/.NET; data and ML pipelines. Remote and async-friendly with regular written updates, through Upwork or directly.

**Location line:** Based in Mérida, Mexico (UTC−6) · Open to remote work worldwide / En Mérida, Yucatán (UTC−6) · Disponible para trabajo remoto en cualquier país.

**Bio (EN):** I'm Carlos, a software engineer based in Mérida, Mexico. I build web platforms, desktop tools and AI features, from a commercial suite of Revit add-ins for construction teams to an investment tracker with a multi-model AI analyst. I studied physics and mathematics, and it shows in the work I enjoy most: geometry, financial math and models that have to be right. I build with coding agents like Claude Code as part of my daily workflow, and I work remotely with teams anywhere.

**Bio (ES):** Soy Carlos, desarrollador de software en Mérida, Yucatán. Creo plataformas web, herramientas de escritorio y funciones con IA: desde una suite comercial de plugins para Revit hasta una plataforma de seguimiento de inversiones con un analista de IA multimodelo. Estudié Ciencias Físico-Matemáticas, y eso se nota en el trabajo que más disfruto: geometría, matemáticas financieras y modelos que tienen que salir bien. Trabajo a diario con agentes de programación como Claude Code y colaboro de forma remota con equipos de cualquier lugar.

**Experience**

| Role | Dates |
| --- | --- |
| Software Engineer (contract via Upwork) · UtahBIM | Aug 2025 – present |
| Main developer · Fibrant (DeepSpace project) | 2026 – present |
| Main developer · Expressus Café (DeepSpace project) | 2025 – present |
| Freelance software developer · Upwork (Top Rated, 100% JSS) | 2024 – present |
| Freelance developer · Fiverr (small Prolog projects) | 2024 – 2025 |

**Skills:** Web (TypeScript, React, Next.js, Tailwind, shadcn/ui) · Backend and data (PostgreSQL/Supabase, Stripe, Prisma, Docker) · Desktop (C#/.NET 8, Revit API, WPF, Inno Setup) · AI/ML (Claude, OpenAI and Gemini APIs, tool use and agents, Python, XGBoost/LightGBM, scikit-learn) · 3D (Three.js / React Three Fiber, Autodesk Platform Services).

**Education:** Physics and Mathematics, Universidad Michoacana de San Nicolás de Hidalgo, 2018–2022 · Coursework completed; thesis on loop quantum cosmology pending. ES: Licenciatura en Ciencias Físico-Matemáticas, UMSNH, 2018–2022 · Pasante; tesis en Cosmología Cuántica de Lazos pendiente.

**Languages:** Spanish (native) · English (intermediate, conversational).

## Case studies

Five case studies, in this order; these rows seed `content/projects.ts` and `docs/content-sources.md`.

| # | Project | Timeframe | Role and team | Outcome | Links |
| --- | --- | --- | --- | --- | --- |
| 1 | Fibrant | Mar 2026 – present | Main developer (DeepSpace project) | Launched | [fibrant.app](https://www.fibrant.app) |
| 2 | VDC Plugins for Revit | Feb 2026 – present | Lead developer of the add-in suite; contributor to UtahBIM's subscription app and storefront | Commercial product | [vdcplugins.com](https://vdcplugins.com/), [UtahBIM](https://www.utahbim.com/) |
| 3 | F1 Forecast Lab | May – Jun 2026 | Main developer (DeepSpace project) | Live; qualifying and race models done | [deepspace.com.mx](https://www.deepspace.com.mx/) |
| 4 | Expressus Café | Jul 2025 – present | Main developer (DeepSpace project) | Live, taking orders | [expressus.shop](https://www.expressus.shop/) |
| 5 | Forge Clash Insight | Aug 2025 – Mar 2026 | Main developer | Prototype for UtahBIM | [UtahBIM](https://www.utahbim.com/) |

**Approach highlights and visuals**

1. **Fibrant.** Multi-model AI analyst (Claude, ChatGPT, Gemini with a model selector), tool use, per-portfolio memory, a cache-friendly static system prompt, credits by tier; time-weighted returns and XIRR with `decimal.js`, USD/MXN conversion; Supabase row-level security with shared portfolios. Visuals: demo-account screenshots, analyst tool-use diagram.
2. **VDC Plugins for Revit.** About 10 C#/.NET 8 add-ins for Revit 2025 and 2026; a shared per-tool licensing gate that blocks unless access is confirmed; tools from another developer brought onto the shared structure and gate, with fixes; Dynamo and Python logic ported to C#; IPC Table 704.1 slope rules with documented tolerance; one Inno Setup installer. Web side: plugin slug registry, Stripe organisation and personal subscriptions, webhook lifecycle by subscription ID, closed access leaks; storefront free-trial flow, installer downloads, Docker/Prisma deploy. Visuals: system diagram (add-in, gate, slug registry, Stripe), storefront screenshot, gate excerpt.
3. **F1 Forecast Lab.** Python `uv` monorepo with FastF1 ingestion, leakage checks, logistic vs LightGBM vs XGBoost with calibration compared on event- and season-level backtests, the `f1-weekend` operator CLI, Supabase sync, a Next.js predicted-vs-actual dashboard. Real metrics come from `f1_model_runs`, not estimates. Visuals: dashboard screenshots, pipeline diagram.
4. **Expressus Café.** Next.js storefront; checkout totals and stock changes in transactional database functions; guest carts on an HTTP-only cookie; Stripe Checkout with signed webhooks; Skydropx shipping quotes. Visuals: storefront screenshots, checkout-flow diagram.
5. **Forge Clash Insight.** GJK collision detection and severity scoring; Autodesk (APS/ACC) and Procore sign-in; model processing and a Three.js viewer; LLM analysis through n8n. Visuals: clash-flow diagram, GJK excerpt.

UtahBIM's own time-savings claims on vdcplugins.com stay out of the case study unless quoted and attributed to the product site.

## Design system

Direction C reads like a well-set technical paper: Plex type, a near-monochrome page, one deep-green accent, and figures and footnotes as a deliberate motif. Starting values go in `globals.css` as shadcn theme tokens; contrast is checked in Milestone 2.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--background` | `#FAFAF7` | `#121212` | Page |
| `--foreground` | `#141414` | `#EDEDEA` | Body text |
| `--muted-foreground` | `#5F5E5A` | `#A3A29C` | Metadata, captions |
| `--border` | `#E4E3DD` | `#2A2A28` | Rules, figure frames |
| `--accent` → rename to --brand (shadcn's --accent stays a neutral hover tint) | `#1F6F5C` | `#5DCAA5` | Links, the one highlighted word, focus ring |

- **Type:** IBM Plex Serif for headlines (weights 400 and 500), IBM Plex Sans for body (400), IBM Plex Mono for metadata, labels and code (400); loaded with `next/font/google` and subset to Latin.
- **Scale:** hero headline about 44 px desktop / 32 px mobile; h2 28; h3 20; body 17 with line-height 1.65; metadata 13 mono.
- **Motifs:** diagrams captioned "Fig. N — …"; section labels like "§ 01"; footnotes for asides; code excerpts in Plex Mono with `shiki` light and dark themes.
- **Layout:** text column max 68 characters; case-study page = 240 px sticky metadata column plus text column at 1024 px and wider, stacked below that; generous vertical rhythm in 8 px steps.
- **Motion:** fades and small translates only, 150–200 ms, disabled under `prefers-reduced-motion`.
- **Components:** shadcn Button, Form, Input, Textarea, Select, DropdownMenu (language toggle), Separator, Badge (tags), Sonner (form feedback).

## Technical architecture

Server Components everywhere except the toggles and the contact form; facts live once in TypeScript, words live per locale in MDX and message files.

```text
app/
  layout.tsx            html lang from the locale cookie, fonts, theme provider
  page.tsx              Home
  projects/page.tsx     index
  projects/[slug]/page.tsx
  about/page.tsx  contact/page.tsx  cv/page.tsx
  actions/locale.ts     sets the cookie, refreshes in place
  actions/contact.ts    Zod-validated server action
  sitemap.ts  robots.ts  opengraph-image.tsx (+ per case study)
components/             site/, case-study/, figures/, ui/ (shadcn)
content/
  projects.ts           typed registry, validated with Zod
  en/projects/*.mdx     title, summary, body
  es/projects/*.mdx
i18n/request.ts         locale from cookie, then Accept-Language, then en
messages/en.json  messages/es.json
proxy.ts                first-visit locale detection (Next 16)
scripts/cv.mts scripts/screenshots.ts
tests/                  Playwright + axe
docs/decisions.md  docs/content-sources.md
```

- **Project record (`content/projects.ts`):** `slug`, `order`, `featured`, `status` (live, commercial, prototype), `timeframe` {start, end or null}, `client` {name, url} or null, `team`, `stack[]`, `tags[]`, `links[]`, `hero` {kind: screenshot or figure, src}. The build fails if any record is missing an MDX file in either locale.
- **i18n:** next-intl without i18n routing, copied from Fibrant (`proxy.ts`, `i18n/request.ts`, the locale action). Cookie `NEXT_LOCALE`; switching calls the server action, then `router.refresh()`; the URL never changes.
- **MDX:** `@next/mdx` with `rehype-pretty-code` + `shiki`; MDX components map figures, footnotes and code to the design system.
- **Contact:** server action validates with Zod; rejects a filled honeypot or a submit under 3 seconds; sends with Resend from its test sender to `CONTACT_TO` (your Gmail) until a domain is verified, then from `RESEND_FROM`, so the domain switch is a config change.
- **SEO:** metadata per page from the locale; `metadataBase` from `NEXT_PUBLIC_SITE_URL`; sitemap and robots; no hreflang.
- **CV:** `/cv` print stylesheet; `npm run cv` renders `public/cv/carlos-guzman-cv-en.pdf` and `-es.pdf` with Playwright.
- **Screenshots:** `npm run shots` captures the public sites at 1440 × 900 in light and dark into `public/projects/<slug>/`; Fibrant uses the demo account through a stored login state that is git-ignored.
- **Dependencies (approved):** next-intl, @next/mdx, @mdx-js/react, zod, react-hook-form, @hookform/resolvers, next-themes, rehype-pretty-code, shiki, @vercel/analytics, resend; dev: @playwright/test, @axe-core/playwright, @lhci/cli.

## Claude Code setup

Milestone 1 commits this setup so every later session starts with the same rules, checks and helpers. Paths and formats follow the current [Claude Code docs](https://code.claude.com/docs/en/skills).

| File | Purpose |
| --- | --- |
| `CLAUDE.md` | Project instructions, updated with this plan: no pricing, no booking, direction C, content model, content rules; points to the two docs below |
| `docs/decisions.md` | The Decisions log table from this plan |
| `docs/content-sources.md` | The confirmed facts per project, About and Experience; the only source Claude Code may write copy from |
| `.claude/skills/new-case-study/SKILL.md` | `/new-case-study <slug>`: adds the registry record and EN/ES MDX with `[PLACEHOLDER]` sections |
| `.claude/skills/translate-es/SKILL.md` | `/translate-es <file>`: natural Mexican Spanish, "Desarrollador de software", keep technical terms in English where Mexican developers do |
| `.claude/skills/verify/SKILL.md` | `/verify`: typecheck, lint, build, Playwright + axe in both locales and themes; reports failures, fixes none silently |
| `.claude/agents/reviewer.md` | Reviewer subagent (tools: Read, Glob, Grep, Bash): accessibility, content rules (no fact missing from `content-sources.md`), copy quality, Spanish naturalness |
| `.claude/settings.json` | Hooks and permissions (below) |
| `.mcp.json` | shadcn MCP (`npx shadcn@latest mcp init --client claude`) and Playwright MCP (`npx -y @playwright/mcp@latest`) |

**Hooks:** after each `Edit` or `Write`, run `eslint --fix` on the changed file; on `Stop`, run `npm run typecheck && npm run lint` and exit with code 2 on failure, so Claude keeps fixing instead of ending the turn.

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/fix-file.sh", "timeout": 30 }] }
    ],
    "Stop": [
      { "hooks": [{ "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/check.sh", "timeout": 180 }] }
    ]
  },
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(npx shadcn@latest add *)", "Bash(npx playwright test *)"],
    "deny": ["Read(./.env*)", "Read(./tests/.auth/**)"]
  }
}
```

`fix-file.sh` reads the hook's JSON from stdin and passes `tool_input.file_path` to `npx eslint --fix` for `.ts`, `.tsx` and `.mdx` files; `check.sh` prints the first errors to stderr before exiting 2.

## Milestones

Eight milestones in order, each one Claude Code session committed directly to `main`. Every session runs the same loop: start in plan mode, approve the plan, implement, `/verify`, ask the reviewer subagent, review the changes yourself, then commit and push to `main`.

1. **M1 — Scaffold and agent setup**
   - Prompt: "Create a Next.js 16 app (TypeScript strict, App Router, Tailwind v4, ESLint, npm) in this empty repo. Init shadcn. Load IBM Plex Serif, Sans and Mono with next/font and add the light and dark tokens from docs/decisions.md to globals.css. Add next-themes with system default. Then create CLAUDE.md, docs/decisions.md, docs/content-sources.md, the three skills, the reviewer subagent, .claude/settings.json with the hooks, the hook scripts, .mcp.json, Playwright config with an axe smoke test, and a GitHub Actions workflow running typecheck, lint, build and Playwright. Plan first and wait for my approval."
   - Done when: `npm run build` passes, CI is green, `/verify` runs, the Vercel preview loads a styled placeholder page.
   - Needs from you: paste this plan's Decisions log, Design system and Technical architecture sections into docs/decisions.md, and its Site map and Case studies sections into docs/content-sources.md (or attach this doc to the session).
2. **M2 — i18n and site shell**
   - Prompt: "Port the next-intl setup from the Fibrant repo (proxy.ts, i18n/request.ts, the locale action) for cookie-based locales without URL prefixes, Accept-Language on first visit, English fallback. Build the header (nav, EN/ES toggle with a DropdownMenu, theme toggle), footer and 404, with every string in messages/en.json and es.json. Toggles must be labelled and announced to screen readers. Plan first."
   - Done when: switching language keeps the URL and refreshes in place; `html lang` follows the cookie; axe passes in 2 locales × 2 themes.
3. **M3 — Content system and case-study template**
   - Prompt: "Set up @next/mdx with rehype-pretty-code and shiki. Create content/projects.ts with the Zod schema from docs/decisions.md and records for the five projects from docs/content-sources.md. Build MDX components (Figure with 'Fig. N' captions, Footnote, CodeExcerpt), the /projects index and /projects/\[slug\] with the sticky metadata column at 1024 px and up. Use /new-case-study to create EN/ES MDX with placeholders only. Fail the build when a record lacks an MDX file. Plan first."
   - Done when: all five case-study pages render with placeholders in both languages; the build fails if an MDX file is removed.
4. **M4 — Home, About, CV**
   - Prompt: "Build Home (headline, supporting line, numbered index of the three featured projects, contract block, contact CTA) and About (photo, bio, location, skills, experience, education, languages, credentials, CV links) using only docs/content-sources.md. Build /cv with a print stylesheet and scripts/cv.ts that renders the EN and ES PDFs into public/cv with Playwright (npm run cv). Plan first."
   - Done when: both PDFs are generated and linked; copy matches content-sources word for word; Spanish passes `/translate-es` review.
   - Needs from you: photo, Upwork URL, GitHub URL.
5. **M5 — Contact**
   - Prompt: "Build /contact with react-hook-form, Zod and shadcn Form: name, email, company (optional), reason (Job opportunity, Contract project, Other), message. Server action with the same Zod schema, a honeypot and a 3-second minimum. Send with Resend; until a domain is verified, send from Resend's test sender to CONTACT\_TO. Show success and error states with Sonner. Plan first."
   - Done when: a real message reaches your inbox from the Vercel preview; honeypot and fast submits are rejected; keyboard-only submission works.
   - Needs from you: a Resend account and API key in Vercel env vars.
6. **M6 — Proof assets**
   - Prompt: "Write scripts/screenshots.ts (npm run shots) to capture fibrant.app (demo account via a git-ignored storage state), expressus.shop, deepspace.com.mx/labs F1 pages and vdcplugins.com at 1440×900 in light and dark. Build the five diagrams as SVG Figure components themed by our tokens: Fibrant analyst tool use, VDC system (add-in, gate, slug registry, Stripe), F1 pipeline, Expressus checkout, Forge Clash flow. Extract the code excerpts I approve. Plan first."
   - Done when: every case study has its hero visual and figures in both themes; images go through next/image.
   - Needs from you: Fibrant demo account; approve each excerpt; F1 metrics exported from `f1_model_runs` (or a read-only key for the session).
7. **M7 — Case-study copy**
   - Prompt: "Write the five case studies in English from docs/content-sources.md only: Problem, My role, Approach, Outcome, keeping \[PLACEHOLDER\] where a fact is missing. Then run /translate-es on each. Ask the reviewer subagent to check every claim against content-sources.md. Plan first."
   - Done when: no claim without a source; you've approved EN and ES for all five.
8. **M8 — SEO, analytics and launch**
   - Prompt: "Add per-page metadata, next/og images using the Plex fonts, sitemap and robots from NEXT\_PUBLIC\_SITE\_URL, and Vercel Web Analytics. Add Lighthouse CI against the Vercel preview with a 95 budget for every category. Fix anything under budget. Plan first."
   - Done when: Lighthouse 95+ on all pages in both themes; reviewer subagent passes the whole site; production deploy on the `vercel.app` address.

## Your to-dos

These are the inputs only you can provide, listed in the order the milestones need them.

- [ ] Create the public repo `CGuzman99/portfolio` and link it to a Vercel project (before M1)
- [ ] Attach this plan to the M1 session, or paste its sections into the two docs files (M1)
- [ ] Send your Upwork profile URL (M4)
- [ ] Send your GitHub profile URL (M4)
- [ ] Add a photo, square, at least 800 px (M4)
- [ ] Create a Resend account and add `RESEND_API_KEY` and `CONTACT_TO` in Vercel (M5)
- [ ] Create the Fibrant demo account with made-up data (M6)
- [ ] Export the F1 model-run metrics, or provide a read-only key for that session (M6)
- [ ] Approve each code excerpt, including the UtahBIM ones (M6)
- [ ] Approve EN and ES copy for every page (M4, M7)
- [ ] Buy the domain, verify it in Resend, set `NEXT_PUBLIC_SITE_URL` and `RESEND_FROM` (after launch)
- [ ] Update LinkedIn from the finished About page (after launch)

## Backlog after v1

Each item is out of v1 scope and slots in without changing the architecture.

- Custom domain and email address (config only: `NEXT_PUBLIC_SITE_URL`, `RESEND_FROM`)
- Cal.com booking link on Contact, if you decide to offer it
- 30–60 s Fibrant screen recording on its case study
- Testimonials, once you have Upwork quotes you choose to use
- Notes or blog in MDX, reusing the case-study pipeline
- More DeepSpace Labs projects as case studies
- Screenshots of the Revit tools and Forge Clash Insight when you have Revit access again
- Turnstile on the contact form, only if spam gets through
