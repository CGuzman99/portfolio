import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Accessibility smoke test. M2 extends `routes` with the EN/ES locale cookie
 * and the rest of the site map; the theme axis comes from the Playwright
 * projects in playwright.config.ts.
 */
const routes = ["/"];

for (const route of routes) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test("the theme follows the system colour scheme", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const expected = testInfo.project.name === "chromium-dark";
  await expect
    .poll(() => page.locator("html").evaluate((el) => el.classList.contains("dark")))
    .toBe(expected);
});
