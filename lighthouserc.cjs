/**
 * Lighthouse CI: every page, at a 95 budget in all four categories — except
 * mobile performance, at 90 (below).
 *
 * One run covers one theme × locale × form factor, picked by env vars, so the
 * workflow (.github/workflows/lighthouse.yml) fans the combinations out as a
 * matrix and `npm run lhci` audits one of them locally:
 *
 *   LIGHTHOUSE_BASE_URL        site to audit; unset = `next start` on
 *                              localhost (run `npm run build` first)
 *   LIGHTHOUSE_PRESET          mobile (default) | desktop
 *   LIGHTHOUSE_THEME           light (default) | dark — the theme follows the
 *                              system, so this sets Chrome's colour scheme
 *   LIGHTHOUSE_LOCALE          en (default) | es — sent as the NEXT_LOCALE cookie
 *   LIGHTHOUSE_DEPLOYMENT_URL  set when the base URL is a Vercel deployment
 *                              URL rather than the public production domain
 *   VERCEL_AUTOMATION_BYPASS_SECRET  gets past Vercel deployment protection
 *
 * Not LHCI_*: LHCI reads every LHCI_* variable as one of its own CLI options,
 * so LHCI_PRESET=desktop would reach `lhci assert --preset`.
 */

const PORT = 3000;
const base = (process.env.LIGHTHOUSE_BASE_URL || `http://localhost:${PORT}`).replace(
  /\/$/,
  "",
);
const preset = process.env.LIGHTHOUSE_PRESET === "desktop" ? "desktop" : "mobile";
const dark = process.env.LIGHTHOUSE_THEME === "dark";
const locale = process.env.LIGHTHOUSE_LOCALE === "es" ? "es" : "en";
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

// Kept literal, like tests/helpers.ts, so a page dropped from the site fails
// here instead of silently shrinking the audit. lib/site.ts SITE_ROUTES, plus
// /cv, which is unlisted but still a page.
const ROUTES = [
  "/",
  "/projects",
  "/projects/fibrant",
  "/projects/vdc-plugins",
  "/projects/f1-forecast-lab",
  "/projects/expressus-cafe",
  "/projects/forge-clash-insight",
  "/about",
  "/contact",
  "/cv",
];

const budget = ["error", { minScore: 0.95 }];

// Mobile performance is held at 90, not 95: Carlos's call in M8. On Vercel,
// mobile scored 92–96 best-of-3 while desktop scored 100 on every page.
// Lantern's simulated mobile LCP (~2.8 s) counts every byte loaded before
// first paint on a 1.6 Mbps link, and the measured levers were small:
// dropping 94 KB of header JS moved it 0.1 s, dropping font preloads nothing.
const performanceBudget =
  preset === "mobile" ? ["error", { minScore: 0.9 }] : budget;

const quality = {
  "categories:performance": performanceBudget,
  "categories:accessibility": budget,
  "categories:best-practices": budget,
};

// Two more exceptions, both about being indexed rather than quality, and
// neither decided by the site's code:
// - /cv is `noindex` on purpose (its PDFs are its public face), so Lighthouse's
//   is-crawlable audit fails by design and the SEO category cannot reach 95.
//   It keeps the other three budgets.
// - Vercel sends `X-Robots-Tag: noindex` on every deployment URL, preview and
//   production alike; only the production domain is indexable. There
//   is-crawlable is skipped, which drops it from the SEO score, and the rest of
//   the category still has to reach 95.
const isDeploymentUrl = Boolean(process.env.LIGHTHOUSE_DEPLOYMENT_URL);

module.exports = {
  ci: {
    collect: {
      url: ROUTES.map((route) => `${base}${route}`),
      ...(!process.env.LIGHTHOUSE_BASE_URL && {
        startServerCommand: `npm run start -- --port ${PORT}`,
        startServerReadyPattern: "Ready",
      }),
      numberOfRuns: 3,
      settings: {
        ...(preset === "desktop" && { preset: "desktop" }),
        ...(isDeploymentUrl && { skipAudits: ["is-crawlable"] }),
        // Blink's PreferredColorScheme enum: 0 is dark, 1 is light.
        chromeFlags: `--blink-settings=preferredColorScheme=${dark ? 0 : 1}`,
        extraHeaders: JSON.stringify({
          Cookie: `NEXT_LOCALE=${locale}`,
          ...(bypass && { "x-vercel-protection-bypass": bypass }),
        }),
      },
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: "^(?!.*/cv$)",
          assertions: { ...quality, "categories:seo": budget },
        },
        { matchingUrlPattern: "/cv$", assertions: quality },
      ],
    },
    // Reports stay local (and become a workflow artifact); nothing is sent to
    // Lighthouse's public temporary storage.
    upload: {
      target: "filesystem",
      outputDir: `.lighthouseci/${preset}-${dark ? "dark" : "light"}-${locale}`,
    },
  },
};
