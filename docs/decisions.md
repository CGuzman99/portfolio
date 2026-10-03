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
| 2 | Brand | Personal name only; "Available for contract work" block with no prices; Upwork Top Rated and 100% JSS shown; no testimonials; DeepSpace only in About and the F1 case study |
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
scripts/cv.ts  scripts/screenshots.ts
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
