/**
 * `npm run shots`: captures the case-study screenshots into
 * public/projects/<slug>/<name>.{light,dark}.png at 1440×900.
 *
 * Fibrant is shot from the demo account. The login is kept as a Playwright
 * storage state in tests/.auth/fibrant.json (git-ignored); when it is missing
 * or expired the script signs in with FIBRANT_DEMO_EMAIL and
 * FIBRANT_DEMO_PASSWORD, read from the environment or .env.local.
 *
 *   npm run shots                     every target
 *   npm run shots -- --only fibrant   one case study
 *
 * Run with Node's type stripping; only node: built-ins and @playwright/test.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page,
} from "@playwright/test";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "projects");
const AUTH_FILE = path.join(ROOT, "tests", ".auth", "fibrant.json");
const VIEWPORT = { width: 1440, height: 900 };
const THEMES = ["light", "dark"] as const;

if (existsSync(path.join(ROOT, ".env.local"))) {
  process.loadEnvFile(path.join(ROOT, ".env.local"));
}

const FIBRANT_URL = (process.env.FIBRANT_URL ?? "http://localhost:3000").replace(/\/$/, "");
/** The demo portfolio; its name on screen proves the right account is in. */
const FIBRANT_PORTFOLIO = "US Growth";

type Target = {
  slug: string;
  name: string;
  url: string;
  /** Shots behind the Fibrant login. */
  auth?: boolean;
  /** Text that must be on screen before the shot is taken. */
  waitForText?: string;
  /** Text of the section to scroll to the top of the viewport. */
  scrollTo?: RegExp;
  /**
   * A link-like row (in <main>) to click before the shot, and the URL it must
   * land on: for pages reached by client-side navigation, not by address.
   */
  open?: { text: string; url: RegExp };
};

const TARGETS: Target[] = [
  {
    slug: "fibrant",
    name: "hero",
    url: `${FIBRANT_URL}/dashboard`,
    auth: true,
    waitForText: FIBRANT_PORTFOLIO,
  },
  {
    slug: "fibrant",
    name: "analyst",
    url: `${FIBRANT_URL}/ai-analyst`,
    auth: true,
    waitForText: FIBRANT_PORTFOLIO,
    // The demo account's seeded conversation, from the recent list.
    scrollTo: /^Give me a health check/,
    open: { text: "New conversation", url: /\/ai-analyst\/chat\/(?!new)[^/]+$/ },
  },
  { slug: "vdc-plugins", name: "storefront", url: "https://vdcplugins.com/" },
  {
    slug: "f1-forecast-lab",
    name: "hero",
    url: "https://www.deepspace.com.mx/labs/f1-forecast",
  },
  {
    slug: "f1-forecast-lab",
    name: "event",
    url: "https://www.deepspace.com.mx/labs/f1-forecast/2026/azerbaijan-grand-prix",
    // The race's predicted-vs-actual table, in either of the site's languages.
    scrollTo: /predicci[oó]n vs resultado|predict\w* vs\.? actual/i,
  },
  { slug: "expressus-cafe", name: "hero", url: "https://www.expressus.shop/" },
];

function selectedTargets(): Target[] {
  const index = process.argv.indexOf("--only");
  if (index === -1) return TARGETS;
  const slug = process.argv[index + 1];
  const targets = TARGETS.filter((t) => t.slug === slug);
  if (targets.length === 0) throw new Error(`No targets for --only ${slug}`);
  return targets;
}

/** Signs in to Fibrant if the saved storage state no longer reaches the dashboard. */
async function ensureFibrantLogin(browser: Browser) {
  if (existsSync(AUTH_FILE)) {
    const context = await browser.newContext({ storageState: AUTH_FILE });
    const page = await context.newPage();
    await page.goto(`${FIBRANT_URL}/dashboard`);
    const signedIn = new URL(page.url()).pathname.startsWith("/dashboard");
    await context.close();
    if (signedIn) return;
  }

  const email = process.env.FIBRANT_DEMO_EMAIL;
  const password = process.env.FIBRANT_DEMO_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "Fibrant needs a login: set FIBRANT_DEMO_EMAIL and FIBRANT_DEMO_PASSWORD.",
    );
  }

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${FIBRANT_URL}/login`);
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.locator('form button[type="submit"]').click();
  await page.waitForURL((url) => url.pathname.startsWith("/dashboard"), {
    timeout: 30_000,
  });
  mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
  await context.storageState({ path: AUTH_FILE });
  await context.close();
  console.log("Signed in to Fibrant; storage state saved.");
}

async function settle(page: Page, target: Target) {
  await page.waitForLoadState("networkidle").catch(() => {
    // Some sites poll forever; `load` plus the checks below are enough.
  });
  if (target.waitForText) {
    await page
      .getByText(target.waitForText, { exact: false })
      .first()
      .waitFor({ state: "visible", timeout: 30_000 });
  }
  if (target.scrollTo) {
    const section = page.getByText(target.scrollTo).last();
    await section.waitFor({ state: "visible", timeout: 30_000 });
    // scrollIntoView also scrolls a nested panel (Fibrant's chat); the window
    // then backs off 96px so a fixed site header doesn't cover the section.
    // "instant": a page with `scroll-behavior: smooth` would otherwise still
    // be scrolling when the shot is taken.
    await section.evaluate((el) => {
      el.scrollIntoView({ block: "start", behavior: "instant" });
      window.scrollBy({ top: -96, behavior: "instant" });
    });
  }
  await page.evaluate(() => document.fonts.ready);
  // Lazy images and chart animations get a moment to finish.
  await page.waitForTimeout(1_500);
}

async function shoot(context: BrowserContext, target: Target, theme: string) {
  const page = await context.newPage();
  await page.goto(target.url, { waitUntil: "load", timeout: 60_000 });
  if (target.auth && new URL(page.url()).pathname.startsWith("/login")) {
    throw new Error(`${target.url} redirected to the login page`);
  }
  if (target.open) {
    await page.getByRole("main").getByText(target.open.text).first().click();
    await page.waitForURL(target.open.url, { timeout: 30_000 });
  }
  await settle(page, target);

  const dir = path.join(OUT_DIR, target.slug);
  mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${target.name}.${theme}.png`);
  await page.screenshot({ path: file });
  await page.close();
  console.log(`Wrote ${path.relative(ROOT, file)}`);
  return file;
}

function digest(file: string) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

async function main() {
  const targets = selectedTargets();
  const browser = await chromium.launch();
  try {
    if (targets.some((t) => t.auth)) await ensureFibrantLogin(browser);

    const files: Record<string, Record<string, string>> = {};
    for (const theme of THEMES) {
      for (const auth of [false, true]) {
        const group = targets.filter((t) => !!t.auth === auth);
        if (group.length === 0) continue;
        const context = await browser.newContext({
          viewport: VIEWPORT,
          deviceScaleFactor: 1,
          colorScheme: theme,
          reducedMotion: "reduce",
          ...(auth ? { storageState: AUTH_FILE } : {}),
        });
        for (const target of group) {
          const key = `${target.slug}/${target.name}`;
          files[key] ??= {};
          files[key][theme] = await shoot(context, target, theme);
        }
        await context.close();
      }
    }

    const identical = Object.entries(files)
      .filter(([, f]) => f.light && f.dark && digest(f.light) === digest(f.dark))
      .map(([key]) => key);
    if (identical.length > 0) {
      console.log(`No dark theme (light and dark match): ${identical.join(", ")}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
