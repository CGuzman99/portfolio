/**
 * `npm run cv`: renders /cv to public/cv/carlos-guzman-cv-{en,es}.pdf.
 *
 * Runs after `next build` (the npm script does both): it starts the production
 * server, prints /cv once per locale through Chromium, and stops the server.
 * Run with Node's type stripping; only node: built-ins and @playwright/test.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { chromium, type Browser } from "@playwright/test";

const ROOT = path.resolve(import.meta.dirname, "..");
const PORT = Number(process.env.CV_PORT ?? 3100);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUT_DIR = path.join(ROOT, "public", "cv");
const LOCALES = ["en", "es"] as const;

function startServer(): ChildProcess {
  if (!existsSync(path.join(ROOT, ".next", "BUILD_ID"))) {
    throw new Error("No production build found. Run `npm run build` first.");
  }
  // The node binary with Next's JS entry, never npx.cmd: spawning a .cmd on
  // Windows fails with EINVAL, silently.
  const next = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  return spawn(process.execPath, [next, "start", "--port", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "ignore", "inherit"],
  });
}

async function waitForServer(server: ChildProcess, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`next start exited with code ${server.exitCode}`);
    }
    try {
      const response = await fetch(`${BASE_URL}/cv`);
      if (response.ok) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`The server did not answer on ${BASE_URL} in time`);
}

async function main() {
  const server = startServer();
  let browser: Browser | undefined;
  try {
    await waitForServer(server);
    browser = await chromium.launch();
    mkdirSync(OUT_DIR, { recursive: true });

    for (const locale of LOCALES) {
      const context = await browser.newContext({ colorScheme: "light" });
      await context.addCookies([
        { name: "NEXT_LOCALE", value: locale, url: BASE_URL },
      ]);
      const page = await context.newPage();
      await page.goto(`${BASE_URL}/cv`, { waitUntil: "load" });
      const lang = await page.locator("html").getAttribute("lang");
      if (lang !== locale) {
        throw new Error(`/cv rendered lang="${lang}", expected "${locale}"`);
      }
      await page.evaluate(() => document.fonts.ready);

      const file = path.join(OUT_DIR, `carlos-guzman-cv-${locale}.pdf`);
      await page.pdf({
        path: file,
        format: "Letter",
        printBackground: true,
        preferCSSPageSize: true,
      });
      console.log(`Wrote ${path.relative(ROOT, file)}`);
      await context.close();
    }
  } finally {
    await browser?.close();
    server.kill();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
