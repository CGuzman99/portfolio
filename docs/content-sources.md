# Content sources

The confirmed facts, copied verbatim from [the implementation plan](./plan.md):
the site map and page content, the About and Experience blocks, and the five
case studies.

**This file is the only source copy may be written from.** No page, MDX body,
metadata string or CV line may assert a fact that is not here. Where a fact is
missing, write `[PLACEHOLDER]` and ask Carlos; never infer, round, estimate or
borrow a number from elsewhere.

## Positioning and headline

Copied verbatim from the plan's Overview. These are the exact words for the
Home hero and the site metadata.

- **Audience:** recruiters and hiring managers first; contract clients second.
- **Headline (EN):** Software engineer building web platforms, desktop tools and AI features.
- **Headline (ES):** Desarrollador de software. Creo plataformas web, herramientas de escritorio y funciones con IA.
- **Supporting line (EN):** I've built an e-commerce platform with Stripe, a multi-currency investment tracker with an AI analyst, Revit add-ins and a 3D clash-detection tool for the construction industry, and an ML forecasting pipeline. Open to full-time and contract roles, remote.
- **Supporting line (ES):** `[PLACEHOLDER]` — the plan gives the English
  supporting line only. Carlos must approve a Spanish version before M4
  ships Home; do not translate the English one unasked.

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
| Founder and developer · Fibrant | 2026 – present |
| Founder and developer · Expressus Café | 2025 – present |
| Freelance software developer · Upwork (Top Rated, 100% JSS) | 2024 – present |
| Freelance developer · Fiverr (small Prolog projects) | 2024 – 2025 |

**Skills:** Web (TypeScript, React, Next.js, Tailwind, shadcn/ui) · Backend and data (PostgreSQL/Supabase, Stripe, Prisma, Docker) · Desktop (C#/.NET 8, Revit API, WPF, Inno Setup) · AI/ML (Claude, OpenAI and Gemini APIs, tool use and agents, Python, XGBoost/LightGBM, scikit-learn) · 3D (Three.js / React Three Fiber, Autodesk Platform Services).

**Education:** Physics and Mathematics, Universidad Michoacana de San Nicolás de Hidalgo, 2018–2022 · Coursework completed; thesis on loop quantum cosmology pending. ES: Licenciatura en Ciencias Físico-Matemáticas, UMSNH, 2018–2022 · Pasante; tesis en Cosmología Cuántica de Lazos pendiente.

**Languages:** Spanish (native) · English (intermediate, conversational).

## Case studies

Five case studies, in this order; these rows seed `content/projects.ts` and `docs/content-sources.md`.

| # | Project | Timeframe | Role and team | Outcome | Links |
| --- | --- | --- | --- | --- | --- |
| 1 | Fibrant | Mar 2026 – present | Solo | Launched | [fibrant.app](https://www.fibrant.app) |
| 2 | VDC Plugins for Revit | Feb 2026 – present | Lead developer of the add-in suite; contributor to UtahBIM's subscription app and storefront | Commercial product | [vdcplugins.com](https://vdcplugins.com/), [UtahBIM](https://www.utahbim.com/) |
| 3 | F1 Forecast Lab | May – Jun 2026 | Built by Carlos; Luis (DeepSpace) supervised and gave feedback | Live; qualifying and race models done | [deepspace.com.mx](https://www.deepspace.com.mx/) |
| 4 | Expressus Café | Jul 2025 – present | Solo | Live, taking orders | [expressus.shop](https://www.expressus.shop/) |
| 5 | Forge Clash Insight | Aug 2025 – Mar 2026 | Main developer; Luis contributed | Prototype for UtahBIM | [UtahBIM](https://www.utahbim.com/) |

**Approach highlights and visuals**

1. **Fibrant.** Multi-model AI analyst (Claude, ChatGPT, Gemini with a model selector), tool use, per-portfolio memory, a cache-friendly static system prompt, credits by tier; time-weighted returns and XIRR with `decimal.js`, USD/MXN conversion; Supabase row-level security with shared portfolios. Visuals: demo-account screenshots, analyst tool-use diagram.
2. **VDC Plugins for Revit.** About 10 C#/.NET 8 add-ins for Revit 2025 and 2026; a shared per-tool licensing gate that blocks unless access is confirmed; tools from another developer brought onto the shared structure and gate, with fixes; Dynamo and Python logic ported to C#; IPC Table 704.1 slope rules with documented tolerance; one Inno Setup installer. Web side: plugin slug registry, Stripe organisation and personal subscriptions, webhook lifecycle by subscription ID, closed access leaks; storefront free-trial flow, installer downloads, Docker/Prisma deploy. Visuals: system diagram (add-in, gate, slug registry, Stripe), storefront screenshot, gate excerpt.
3. **F1 Forecast Lab.** Python `uv` monorepo with FastF1 ingestion, leakage checks, logistic vs LightGBM vs XGBoost with calibration compared on event- and season-level backtests, the `f1-weekend` operator CLI, Supabase sync, a Next.js predicted-vs-actual dashboard. Real metrics come from `f1_model_runs`, not estimates. Visuals: dashboard screenshots, pipeline diagram.
4. **Expressus Café.** Next.js storefront; checkout totals and stock changes in transactional database functions; guest carts on an HTTP-only cookie; Stripe Checkout with signed webhooks; Skydropx shipping quotes. Visuals: storefront screenshots, checkout-flow diagram.
5. **Forge Clash Insight.** GJK collision detection and severity scoring; Autodesk (APS/ACC) and Procore sign-in; model processing and a Three.js viewer; LLM analysis through n8n. Visuals: clash-flow diagram, GJK excerpt.

UtahBIM's own time-savings claims on vdcplugins.com stay out of the case study unless quoted and attributed to the product site.
