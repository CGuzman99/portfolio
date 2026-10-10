import { expect, test } from "@playwright/test";
import { LOCALES, PROJECT_SLUGS, setLocaleCookie } from "./helpers";

/**
 * SEO plumbing: sitemap, robots, per-page metadata and the share images. None
 * of it depends on the theme, so it runs in the light project only.
 */
test.skip(
  ({ colorScheme }) => colorScheme === "dark",
  "metadata does not change with the theme",
);

const INDEXED = [
  "/",
  "/projects",
  ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`),
  "/about",
  "/contact",
];

const TITLES = {
  en: { "/about": "About — Carlos Guzman", "/": "Carlos Guzman — Software engineer" },
  es: { "/about": "Sobre mí — Carlos Guzman", "/": "Carlos Guzman — Desarrollador de software" },
} as const;

test("robots.txt allows everything and names the sitemap", async ({ request }) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Allow: /");
  expect(body).toMatch(/^Sitemap: https?:\/\/\S+\/sitemap\.xml$/m);
});

test("the sitemap lists every indexed page and leaves out /cv", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  const paths = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, url]) => new URL(url).pathname,
  );
  expect(paths).toEqual(INDEXED);
});

for (const locale of LOCALES) {
  test.describe(`locale ${locale}`, () => {
    test.beforeEach(async ({ context, baseURL }) => {
      await setLocaleCookie(context, baseURL, locale);
    });

    for (const route of INDEXED) {
      test(`${route} has a description, canonical URL and share card`, async ({
        page,
      }) => {
        await page.goto(route);
        const head = page.locator("head");
        await expect(head.locator('meta[name="description"]')).toHaveAttribute(
          "content",
          /\S/,
        );
        const canonical = await head
          .locator('link[rel="canonical"]')
          .getAttribute("href");
        expect(new URL(canonical!).pathname).toBe(route);
        await expect(head.locator('meta[property="og:title"]')).toHaveAttribute(
          "content",
          /— /,
        );
        await expect(head.locator('meta[property="og:image"]')).toHaveCount(1);
        await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute(
          "content",
          "summary_large_image",
        );
      });
    }

    test("titles follow the site template", async ({ page }) => {
      for (const [route, title] of Object.entries(TITLES[locale])) {
        await page.goto(route);
        await expect(page).toHaveTitle(title);
      }
    });

    test("/cv is not indexed", async ({ page }) => {
      await page.goto("/cv");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
    });
  });
}

test("each case study shares its own image, and the other pages the site's", async ({
  page,
  request,
}) => {
  const images = new Set<string>();
  for (const route of ["/about", ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`)]) {
    await page.goto(route);
    const url = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    const { pathname } = new URL(url!);
    expect(pathname).toBe(
      route === "/about" ? "/opengraph-image" : `${route}/opengraph-image/case-study`,
    );
    images.add(pathname);
  }
  expect(images.size).toBe(PROJECT_SLUGS.length + 1);

  // metadataBase may name another host (NEXT_PUBLIC_SITE_URL), so fetch the
  // paths from this server.
  for (const pathname of images) {
    const response = await request.get(pathname);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toBe("image/png");
  }
});
