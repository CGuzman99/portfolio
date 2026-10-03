import { expect, test } from "@playwright/test";
import { PROJECT_SLUGS, setLocaleCookie } from "./helpers";

const TITLES = [
  "Fibrant",
  "VDC Plugins for Revit",
  "F1 Forecast Lab",
  "Expressus Café",
  "Forge Clash Insight",
];

const SECTIONS = {
  en: ["Problem", "My role", "Approach", "Outcome"],
  es: ["Problema", "Mi rol", "Enfoque", "Resultado"],
} as const;

test("the index lists every case study in registry order", async ({
  page,
}) => {
  await page.goto("/projects");
  const links = page.getByRole("main").getByRole("listitem").getByRole("link");
  await expect(links).toHaveCount(PROJECT_SLUGS.length);
  for (const [i, slug] of PROJECT_SLUGS.entries()) {
    await expect(links.nth(i)).toHaveAttribute("href", `/projects/${slug}`);
    await expect(links.nth(i)).toHaveText(TITLES[i]);
  }
});

for (const locale of ["en", "es"] as const) {
  test.describe(`locale ${locale}`, () => {
    test.beforeEach(async ({ context, baseURL }) => {
      await setLocaleCookie(context, baseURL, locale);
    });

    for (const [i, slug] of PROJECT_SLUGS.entries()) {
      test(`/projects/${slug} renders its title and sections`, async ({
        page,
      }) => {
        await page.goto(`/projects/${slug}`);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(
          TITLES[i],
        );
        for (const name of SECTIONS[locale]) {
          await expect(
            page.getByRole("heading", { level: 2, name, exact: true }),
          ).toBeVisible();
        }
      });
    }
  });
}

test("next project wraps from the last case study to the first", async ({
  page,
}) => {
  await page.goto(`/projects/${PROJECT_SLUGS.at(-1)}`);
  await page
    .getByRole("navigation", { name: "Next project" })
    .getByRole("link")
    .click();
  await expect(page).toHaveURL(`/projects/${PROJECT_SLUGS[0]}`);
});

test("the metadata column is sticky at 1024px and up", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`/projects/${PROJECT_SLUGS[0]}`);
  const meta = page.getByTestId("project-meta");
  await expect(meta).toHaveCSS("position", "sticky");

  // Beside the text: left of the h1, not above it.
  const metaBox = await meta.boundingBox();
  const titleBox = await page.getByRole("heading", { level: 1 }).boundingBox();
  expect(metaBox!.x + metaBox!.width).toBeLessThanOrEqual(titleBox!.x);
});

for (const width of [390, 1280]) {
  test(`the site header stays in view when scrolled at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(`/projects/${PROJECT_SLUGS[0]}`);
    // Far enough to scroll the header's natural position away, but not past
    // the article, where the metadata column stops sticking.
    await page.mouse.wheel(0, 300);

    const header = page.getByRole("banner");
    await expect(header).toHaveCSS("position", "sticky");
    await expect
      .poll(async () => (await header.boundingBox())!.y)
      .toBe(0);
    // The page really scrolled, so the header is sticking, not just at the top.
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    if (width >= 1024) {
      // The sticky metadata column sits below the header, not under it.
      const headerBox = (await header.boundingBox())!;
      const metaBox = (await page.getByTestId("project-meta").boundingBox())!;
      expect(metaBox.y).toBeGreaterThanOrEqual(headerBox.y + headerBox.height);
    }
  });
}

test("the metadata column stacks below 1024px", async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 800 });
  await page.goto(`/projects/${PROJECT_SLUGS[0]}`);
  const meta = page.getByTestId("project-meta");
  await expect(meta).toHaveCSS("position", "static");

  // Between the title and the body.
  const metaBox = await meta.boundingBox();
  const titleBox = await page.getByRole("heading", { level: 1 }).boundingBox();
  expect(metaBox!.y).toBeGreaterThan(titleBox!.y + titleBox!.height);
});

test("an unknown slug is a 404", async ({ page }) => {
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
});
