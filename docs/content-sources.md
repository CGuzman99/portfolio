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
- **Supporting line (ES):** He creado una plataforma de e-commerce con Stripe, una plataforma de seguimiento de inversiones multimoneda con un analista de IA, plugins para Revit y una herramienta 3D de detección de interferencias para la industria de la construcción, y un pipeline de pronósticos con machine learning. Disponible para puestos de tiempo completo y por contrato, en remoto. (Approved by Carlos, M4.)

## Site map and page content

Six routes, each at one URL in both languages; the header carries the EN / ES toggle and the theme toggle on every page.

| Route | Content |
| --- | --- |
| `/` | Headline and supporting line; numbered index 01 Fibrant, 02 VDC Plugins, 03 F1 Forecast (one-line summary and stack each); contract block; contact call to action |
| `/projects` | All five case studies in order, with tags (AI, Construction tech, E-commerce, ML/Data, Finance) |
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

## Profile links and contact (confirmed by Carlos, M4)

- **GitHub:** https://github.com/CGuzman99
- **LinkedIn:** https://www.linkedin.com/in/carlos-antonio-guzm%C3%A1n-jim%C3%A9nez-8b7328225
- **Upwork:** https://www.upwork.com/freelancers/~01b3da283ab722a8c8
- **Email:** carlos@cguzman.dev — on the CV page and its PDFs only, not
  on the other site pages. (Replaced carlosantoniogj@gmail.com; confirmed by
  Carlos, 2026-10-10.)
- **Domain:** cguzman.dev — the site's address (confirmed by Carlos,
  2026-10-10).
- **Photo:** `public/about/photo.jpg`, square, at least 800 px — pending.

## Spanish copy (approved by Carlos, M4)

The Spanish for the About and contract-block lines above that the plan gave in
English only.

| English | Spanish |
| --- | --- |
| Available for contract work | Disponible para proyectos por contrato |
| Full-stack web apps and SaaS | Aplicaciones web full-stack y SaaS |
| AI features for existing products (LLM integration, tool use, agents) | Funciones con IA para productos existentes (integración de LLMs, tool use, agentes) |
| Desktop apps and add-ins in C#/.NET | Aplicaciones de escritorio y add-ins en C#/.NET |
| Data and ML pipelines | Pipelines de datos y machine learning |
| Remote and async-friendly with regular written updates, through Upwork or directly. | Trabajo remoto y asíncrono, con avances por escrito de forma regular, a través de Upwork o directamente. |
| Software Engineer (contract via Upwork) · UtahBIM | Desarrollador de software (por contrato vía Upwork) · UtahBIM |
| Main developer · Fibrant (DeepSpace project) | Desarrollador principal · Fibrant (proyecto de DeepSpace) |
| Main developer · Expressus Café (DeepSpace project) | Desarrollador principal · Expressus Café (proyecto de DeepSpace) |
| Freelance software developer · Upwork (Top Rated, 100% JSS) | Desarrollador de software freelance · Upwork (Top Rated, 100% JSS) |
| Freelance developer · Fiverr (small Prolog projects) | Desarrollador freelance · Fiverr (proyectos pequeños en Prolog) |
| Skill groups: Web · Backend and data · Desktop · AI/ML · 3D | Web · Backend y datos · Escritorio · IA/ML · 3D |
| Claude, OpenAI and Gemini APIs, tool use and agents | APIs de Claude, OpenAI y Gemini, tool use y agentes |
| Spanish (native) · English (intermediate, conversational) | Español (nativo) · Inglés (intermedio, conversacional) |
| Credentials: Upwork Top Rated · 100% JSS | Upwork Top Rated · 100% JSS |

The other skill items are product and library names and stay as written.

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
   Role scope (confirmed by Carlos in M3): the database and its access rules, the AI analyst and the interface.
   Stack (confirmed by Carlos in M3, checked against the Fibrant repo's `package.json` and imports): Next.js, React, TypeScript, Supabase, Stripe, Anthropic API, OpenAI API, Gemini API, decimal.js, TanStack Query, Recharts, Tailwind CSS, shadcn/ui, next-intl, Vitest.
2. **VDC Plugins for Revit.** About 10 C#/.NET 8 add-ins for Revit 2025 and 2026; every tool checks the user's subscription before it runs; tools from another developer brought onto the shared structure, with fixes; Dynamo and Python logic ported to C#; IPC Table 704.1 slope rules with documented tolerance; one Inno Setup installer. Web side: Stripe organisation and personal subscriptions kept in sync with each user's access; storefront free-trial flow, installer downloads, Docker deploy. Visuals: system diagram (storefront, add-in, licence check, Stripe subscriptions), storefront screenshot.
   Kept out of copy by Carlos's decision (2026-10-10), because the product is commercial: how the licence check works inside, the plugin slug registry, the webhook lifecycle, and the access leaks that were closed.
   Stack (confirmed by Carlos in M3, checked against the `package.json`/`pyproject.toml` and imports of the toolkit-library subscription app and the vdc-plugins-webpage storefront; the add-in items come from the highlight above): C#, .NET 8, Revit API, Inno Setup, Next.js, TypeScript, Prisma, MySQL, NextAuth, Stripe, Docker, Tailwind CSS, shadcn/ui.
3. **F1 Forecast Lab.** Python `uv` monorepo with FastF1 ingestion, leakage checks, logistic vs LightGBM vs XGBoost with calibration compared on event- and season-level backtests, the `f1-weekend` operator CLI, Supabase sync, a Next.js predicted-vs-actual dashboard. Real metrics come from `f1_model_runs`, not estimates. Visuals: dashboard screenshots, pipeline diagram.
   Stack (confirmed by Carlos in M3, checked against the `package.json`/`pyproject.toml` and imports of deepspace-labs (pipeline) and DeepSpace (dashboard)): Python, uv, FastF1, pandas, NumPy, scikit-learn, LightGBM, XGBoost, pytest, Supabase, Next.js, TypeScript.
4. **Expressus Café.** Next.js storefront; checkout totals and stock changes in transactional database functions; guest carts on an HTTP-only cookie; Stripe Checkout with signed webhooks; Skydropx shipping quotes. Visuals: storefront screenshots, checkout-flow diagram.
   Stack (confirmed by Carlos in M3, checked against the `package.json`/`pyproject.toml` and imports of expressus-app): Next.js, React, TypeScript, Supabase, Stripe Checkout, Skydropx, Zod, SWR, Resend, Tailwind CSS, shadcn/ui, Vitest.
5. **Forge Clash Insight.** Autodesk (APS/ACC) and Procore sign-in and model selection; models from different disciplines aligned automatically by georeference; collision detection with several algorithms working together; a 0–10 clash score with low, medium and high risk levels, weighted by a category-by-category priority matrix the team maintains in an admin page; clashes grouped by area of the building, with an LLM (OpenAI) writing a plain-language summary per area as validated structured output; a Three.js viewer of the scored clashes; existing Autodesk Construction Cloud issues brought into the model with root causes and rooms; a quote-request flow that sends leads into UtahBIM's GoHighLevel CRM pipeline. The app runs in four steps: Select Models, 3D Viewer, Clash Report, Clash Viewer. Visuals: clash-flow diagram.
   Confirmed by Carlos on 2026-10-10, checked against the next-fci repo. Kept out of copy by his decision: the names of the collision algorithms, the scoring formula and its weights, the risk-band thresholds, and the spatial index. The n8n workflows are no longer wired into the app (their tab is commented out; the analysis calls OpenAI directly), so n8n is out of the stack. The SVF-reading code appears adapted from the open-source `forge-convert-utils`, so copy never claims a hand-written parser. Another developer has commits in the repo, so the role stays "Main developer", never "sole".
   Stack (confirmed by Carlos in M3, checked against the `package.json`/`pyproject.toml` and imports of next-fci): Next.js, TypeScript, Three.js, React Three Fiber, Autodesk (APS/ACC), Procore, Supabase, OpenAI API, GoHighLevel, TanStack Query, Tailwind CSS. (n8n removed and GoHighLevel added on 2026-10-10.)

UtahBIM's own time-savings claims on vdcplugins.com stay out of the case study unless quoted and attributed to the product site.

**Tags and clients (confirmed by Carlos, M3)**

| Project | Tags | Client |
| --- | --- | --- |
| Fibrant | AI, Finance | DeepSpace |
| VDC Plugins for Revit | Construction tech, E-commerce | UtahBIM |
| F1 Forecast Lab | ML/Data, AI | DeepSpace |
| Expressus Café | E-commerce | DeepSpace |
| Forge Clash Insight | Construction tech, AI | UtahBIM |

## Contact page copy (approved by Carlos, M5)

UI strings only; none states a fact. The Spanish passed `/translate-es`.

| English | Spanish |
| --- | --- |
| Contact | Contacto |
| Tell me about the role or the project, and I'll reply by email. | Cuéntame sobre el puesto o el proyecto y te respondo por correo. |
| Name · Email · Company (optional) · Reason · Message | Nombre · Correo electrónico · Empresa (opcional) · Motivo · Mensaje |
| Choose one | Elige una opción |
| Job opportunity · Contract project · Other | Oferta de trabajo · Proyecto por contrato · Otro |
| Leave this field empty (honeypot, hidden) | Deja este campo vacío |
| Send message · Sending… | Enviar mensaje · Enviando… |
| Message sent. Thanks, I'll get back to you by email. | Mensaje enviado. Gracias, te respondo por correo. |
| That was quick. Wait a few seconds and send it again. | Fue muy rápido. Espera unos segundos y vuelve a enviarlo. |
| The message couldn't be sent. Try again, or reach me on LinkedIn or Upwork. | No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por LinkedIn o Upwork. |
| This field is required. | Este campo es obligatorio. |
| Enter a valid email address. | Escribe un correo electrónico válido. |
| Choose a reason. | Elige un motivo. |
| Use {max} characters or fewer. | Máximo {max} caracteres. |
| Elsewhere | Otros perfiles |
| Notifications · Close notification (screen-reader names) | Notificaciones · Cerrar notificación |

## Proof assets (approved by Carlos, M6)

The figure captions, screenshot alt text and diagram labels, in both
languages, live where the site reads them: each MDX file's `meta.hero` and
`<Figure>` / `<CodeExcerpt>` blocks in `content/{en,es}/projects/`, and
`figures` in `messages/{en,es}.json`. Carlos approved all of them as written
in M6; they state nothing beyond the case-study facts above, plus these:

- **Fibrant screenshots** use a demo account with made-up data; captions say so.
- **Expressus checkout flow (confirmed):** guest cart → Skydropx shipping quote
  → checkout totals in a transactional database function → Stripe Checkout →
  signed webhook → stock change in a transactional database function.
- **VDC system (confirmed, simplified 2026-10-10):** storefront (free trial,
  installer download) → Revit add-in → licence check → Stripe organisation and
  personal subscriptions.
- **Fibrant analyst flow (confirmed):** question → model selector (Claude,
  ChatGPT, Gemini; usage metered in credits by tier) → static, cache-friendly
  system prompt and per-portfolio memory → tool use, which reads the portfolio
  from Supabase behind row-level security → answer.
- **F1 pipeline (confirmed):** FastF1 ingestion → leakage checks → logistic,
  LightGBM and XGBoost with calibration → event- and season-level backtests →
  `f1-weekend` operator CLI → Supabase sync → Next.js predicted-vs-actual
  dashboard. The forecast pages live under DeepSpace Labs on deepspace.com.mx.
- **Forge Clash flow (confirmed):** Autodesk (APS/ACC) or Procore sign-in →
  model processing and alignment across disciplines → collision detection
  (several algorithms; not named) → 0–10 clash scoring from the priority
  matrix, which feeds both the Three.js viewer and the LLM summary per area.
- **Fibrant analyst screenshot:** the demo account (Pro tier) answering a
  seeded health-check question; same made-up data as the dashboard.
- **VDC storefront screenshot:** kept with the site's own stat strip in
  frame, by Carlos's decision (M6).
- **Code excerpts:** none for the UtahBIM projects. The `GatedExternalCommand`
  and `gjkCollisionDetection` excerpts were removed on 2026-10-10 so the case
  studies don't show how UtahBIM's software works; the code walkthrough stays
  available on request.
- **F1 event screenshot:** the 2026 Azerbaijan Grand Prix race page on
  deepspace.com.mx, predicted points chance against points scored. No metric
  is quoted in its caption; the metrics copy may quote are below.

## F1 backtest metrics (confirmed by Carlos, M7)

Read from the local deepspace-labs repo, `projects/f1_forecast/artifacts/backtests_report/`:
`default-raw-models-20260529/backtest_report.md` (qualifying) and
`race-default-raw-models-20260530/backtest_report.md` (race). Logistic
regression, LightGBM and XGBoost, raw calibration, on 11 non-overlapping
five-event windows rolling from the 2023 season: 1,065 qualifying rows and
1,068 race rows.

Event level, XGBoost against logistic regression. Higher ROC AUC is better
(ranking); lower Brier score is better (probability quality).

| Target | XGBoost ROC AUC | Logistic ROC AUC | XGBoost Brier | Logistic Brier |
| --- | ---: | ---: | ---: | ---: |
| Reaches Q3 | 0.880 | 0.878 | 0.143 | 0.142 |
| Qualifies top 5 | 0.910 | 0.912 | 0.097 | 0.110 |
| Qualifies top 3 | 0.908 | 0.907 | 0.083 | 0.110 |
| Finishes in the points | 0.854 | 0.850 | 0.154 | 0.158 |
| Finishes top 5 | 0.932 | 0.930 | 0.084 | 0.095 |
| Podium | 0.927 | 0.929 | 0.075 | 0.097 |

- **Reading:** the two models rank drivers about equally well; XGBoost has the
  lower Brier score on 5 of the 6 targets (all but Reaches Q3).
- **Production model:** XGBoost, for both qualifying and race
  (`xgboost-qualifying-20260615`, `xgboost-race-default-20260530-01`, per
  `data/operator_runs/20261007_through_16/summary.json`).
- LightGBM and the season-level numbers are in the same reports and are not
  quoted.
