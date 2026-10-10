# Decisions

Decided with Carlos during planning and copied verbatim from [the implementation
plan](./plan.md). This file is the source of truth for *how* the site is built:
the decisions log, the design system and the technical architecture. Facts and
copy live in [content-sources.md](./content-sources.md) instead.

Change a decision here only when Carlos says so, and say so in the commit message.

## Decisions log

All 17 planning items are decided; the table is the source for `docs/decisions.md` in the repo.

| # | Item | Decision |
| --- | --- | --- |
| 1 | Positioning | Software Engineer, full-stack plus AI; remote full-time and contract roles, US, Mexico and elsewhere; no seniority level stated |
| 2 | Brand | Personal name only; "Available for contract work" block with no prices; Upwork Top Rated and 100% JSS shown; no testimonials; DeepSpace named in About and in the Fibrant, F1 Forecast Lab and Expressus Café case studies (changed by Carlos in M3: all three are DeepSpace projects) |
| 3 | Name and domain | Display name Carlos Guzman; domain `cguzman.dev`, email `carlos@cguzman.dev` (bought after launch, 2026-10-10); site URL still read from `NEXT_PUBLIC_SITE_URL`, never hardcoded |
| 4 | Lineup | Fibrant, VDC Plugins for Revit, F1 Forecast Lab (featured on Home), then Expressus Café, Forge Clash Insight; UtahBIM named and linked |
| 5 | Case-study facts | Confirmed per project in the Case studies section; unknown outcomes stay as `[PLACEHOLDER]` |
| 6 | Proof assets | Screenshots of public sites and a Fibrant demo account; SVG diagrams; short code excerpts allowed (UtahBIM included); no repo links, "Code walkthrough available on request"; no video in v1 |
| 7 | About and CV | Bio, skills by group, experience, education with thesis pending, languages, photo; EN and ES CV PDFs generated from the site |
| 8 | Contract block | Four kinds of work, remote, through Upwork or directly; links to Upwork and the contact form |
| 9 | Visual identity | Direction C, "Scientific paper": IBM Plex Serif, Sans and Mono; near-monochrome with a deep-green accent; theme follows the system |
| 10 | Layouts | Home: headline plus numbered project index; case study: metadata in a sticky left column on wide screens |
| 11 | Versions | Next.js 16, npm, Tailwind v4, shadcn; i18n copied from Fibrant |
| 12 | Content | `@next/mdx`; Zod-checked `content/projects.ts` for facts; per-locale MDX for words; `rehype-pretty-code` and `shiki` for code |
| 13 | Contact | Fields: name, email, company (optional), reason, message; honeypot plus minimum-time check; Resend from `portfolio@cguzman.dev` to `carlos@cguzman.dev` (was the test sender to Gmail until 2026-10-10); no booking |
| 14 | Extras | Vercel Web Analytics; `next/og` images; CV PDFs from `/cv` with Playwright |
| 15 | Claude Code setup | `CLAUDE.md`, decisions and content-sources docs, three skills, hooks, reviewer subagent, shadcn and Playwright MCP |
| 16 | Workflow | One milestone per session, committed directly to `main` (no branches or PRs); plan mode first; `/verify` plus reviewer before each commit; Carlos approves all copy |
| 17 | Scope | v1 as listed in Milestones; everything else in Backlog; Claude Code runs in the terminal |

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
- **Components:** shadcn Button, Field, Input, Textarea, Select, DropdownMenu (language toggle), Separator, Badge (tags), Sonner (form feedback). Field replaces Form (changed in M5): the `base-nova` style ships no Form component, and Field works with react-hook-form through `Controller`. Form controls on `/contact` use a `muted-foreground/70` border instead of `--input`, which is too faint for the 3:1 non-text contrast WCAG 1.4.11 asks of a control's edge. `cn` comes from `lib/utils.ts`, configured with the custom type scale (`text-body`, `text-meta`, …); the unconfigured `cn` package reads those as colours and drops real colour classes, so `components/ui/*` import from `@/lib/utils`, and new shadcn components must be repointed after `shadcn add` (M5).

**Contrast (checked in M2).** WCAG 2.1 ratios for the text pairs the site uses, computed from the hex values in `app/globals.css`. Every pair clears AA for body text (4.5:1); axe's `color-contrast` rule checks the rendered pages in both themes on every run.

| Text on surface | Light | Dark |
| --- | --- | --- |
| foreground on background | 17.62:1 | 15.97:1 |
| muted-foreground on background | 6.21:1 | 7.32:1 |
| muted-foreground on muted | 5.64:1 | 6.45:1 |
| brand on background | 5.76:1 | 9.33:1 |
| brand-foreground on brand | 5.76:1 | 9.33:1 |
| popover-foreground on popover | 18.42:1 | 15.28:1 |
| accent-foreground on accent (menu hover) | 16.00:1 | 14.07:1 |

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
scripts/cv.mts scripts/screenshots.mts
tests/                  Playwright + axe
docs/decisions.md  docs/content-sources.md
```

- **Project record (`content/projects.ts`):** `slug`, `order`, `featured`, `status` (live, commercial, prototype), `timeframe` {start, end or null}, `client` {name, url} or null, `team`, `stack[]`, `tags[]`, `links[]`, `hero` {kind: screenshot or figure, src}. The build fails if any record is missing an MDX file in either locale.
- **i18n:** next-intl without i18n routing, copied from Fibrant (`proxy.ts`, `i18n/request.ts`, the locale action). Cookie `NEXT_LOCALE`; switching calls the server action, then `router.refresh()`; the URL never changes.
- **MDX:** `@next/mdx` with `rehype-pretty-code` + `shiki`; MDX components map figures, footnotes and code to the design system.
- **Contact:** server action validates with Zod; rejects a filled honeypot or a submit under 3 seconds; sends with Resend from `RESEND_FROM` (`portfolio@cguzman.dev`, verified in its own free Resend account) to `CONTACT_TO` (`carlos@cguzman.dev`); without `RESEND_FROM` it falls back to the test sender, which only reaches the Resend account owner. The domain switch was config only. The Zod schema (`lib/contact.ts`) is shared by the form and the action; the action returns `sent`, `invalid`, `spam`, `tooFast` or `failed`, shown as a Sonner toast. Env: `RESEND_API_KEY`, `CONTACT_TO`, optional `RESEND_FROM`; `CONTACT_DRY_RUN=1` logs instead of sending, set by `playwright.config.ts` for e2e and ignored on Vercel (M5).
- **SEO:** metadata per page from the locale; `metadataBase` from `NEXT_PUBLIC_SITE_URL`; sitemap and robots; no hreflang. Details (M8): `lib/site.ts` `siteUrl()` falls back from `NEXT_PUBLIC_SITE_URL` to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, then localhost, so no domain is hardcoded. Titles use the template `%s — Carlos Guzman` (Home keeps the site title). Every page builds its metadata with `lib/metadata.ts` `pageMetadata()`, because Next replaces a page's `openGraph` wholesale and the title template does not reach `og:title`; it sets the description (case studies use their MDX `summary`, other pages the site description), a canonical URL and Open Graph. `/cv` stays `noindex` and out of the sitemap, but robots does not disallow it, so crawlers can read the `noindex`. Share images (`next/og`) are English and static: one URL serves both languages, and link-preview crawlers send no locale cookie. `app/opengraph-image.tsx` is the site card; each case study has its own at `app/projects/[slug]/opengraph-image.tsx`. A page with its own image file must leave `openGraph.images` unset (`ownImage: true`), because page config outranks the segment's file. The cards use IBM Plex as WOFF from `assets/fonts/` (OFL; Satori cannot read WOFF2) and the light-theme colours.
- **Icon (M8):** `app/icon.svg`, the initials CG in serif on the brand green, inverted in dark mode; it replaces create-next-app's `favicon.ico`.
- **Analytics (M8):** Vercel Web Analytics (`@vercel/analytics/next`) in `app/layout.tsx`, rendered only when `VERCEL` is set: anywhere else its script is a 404, and the console error costs Lighthouse points.
- **Lighthouse CI (M8):** `lighthouserc.cjs` holds every page at 95 in performance, accessibility, best practices and SEO, except mobile performance, which is held at 90 (changed by Carlos in M8). On Vercel, mobile performance scored 92–96 best-of-3 while desktop scored 100 everywhere. Lantern's simulated mobile LCP (about 2.8 s) charges every byte loaded before first paint, and the measured levers were small: removing 94 KB of header JS moved it 0.1 s, removing font preloads nothing. The one real fix found was `lib/contact.ts` on `zod/mini` with named imports, which took zod on `/contact` from about 127 KB to 17 KB. `.github/workflows/lighthouse.yml` runs on each successful Vercel `deployment_status` against that deployment's URL, as 8 jobs (mobile/desktop × light/dark × EN/ES, 3 runs each), getting past deployment protection with `VERCEL_AUTOMATION_BYPASS_SECRET`. Dark is Chrome's `--blink-settings=preferredColorScheme=0`, and the locale is the `NEXT_LOCALE` cookie sent as a header. There are two documented exceptions, both about indexing and neither set by the code: `/cv` is `noindex` by design, so it is held to the other three categories but not SEO; and on Vercel deployment URLs, which always send `X-Robots-Tag: noindex` (preview and production alike; only the production domain is indexable), the `is-crawlable` audit is skipped. Its env vars are prefixed `LIGHTHOUSE_`, not `LHCI_`, because LHCI reads every `LHCI_*` variable as one of its own options. Reports stay in `.lighthouseci/` and the workflow artifacts, never on Lighthouse's public storage.
- **CV:** `/cv` print stylesheet; `npm run cv` renders `public/cv/carlos-guzman-cv-en.pdf` and `-es.pdf` with Playwright.
- **Screenshots:** `npm run shots` (`scripts/screenshots.mts`, run with Node type stripping like `cv.mts`, changed in M6) captures the public sites at 1440 × 900 in light and dark into `public/projects/<slug>/<name>.{light,dark}.png`; Fibrant uses the demo account through a stored login state in `tests/.auth/` that is git-ignored, signing in with `FIBRANT_DEMO_EMAIL` / `FIBRANT_DEMO_PASSWORD` (environment or `.env.local`) when it expires. `FIBRANT_URL` defaults to `http://localhost:3000`.
- **Visuals (M6):** a screenshot renders as two `next/image`s, one per theme, shown by the `.dark` class; both stay `loading="lazy"` so only the visible one loads, and the hero uses `fetchPriority="high"`, not `preload` (Next 16 docs, Image › Theme detection). Diagrams are inline SVG built on `components/figures/flow-diagram.tsx`, coloured only by theme tokens, with every label in `messages/*.json` under `figures`. The hero is always Fig. 1, captioned from the MDX `meta.hero`; body figures start at 2.
- **Dependencies (approved):** next-intl, @next/mdx, @mdx-js/react, zod, react-hook-form, @hookform/resolvers, next-themes, rehype-pretty-code, shiki, @vercel/analytics, resend; dev: @playwright/test, @axe-core/playwright, @lhci/cli.
