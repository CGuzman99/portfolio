import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { LOCALES, TRIGGER_NAMES, setLocaleCookie } from "./helpers";

/**
 * Accessibility gate: every route × both locales (via the NEXT_LOCALE cookie)
 * × both themes (via the Playwright projects in playwright.config.ts). The
 * unknown route exercises the 404 page, which renders inside the site shell.
 */
const routes = ["/", "/this-page-does-not-exist"];

function axe(page: Page) {
  return new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
}

for (const locale of LOCALES) {
  test.describe(`locale ${locale}`, () => {
    test.beforeEach(async ({ context, baseURL }) => {
      await setLocaleCookie(context, baseURL, locale);
    });

    for (const route of routes) {
      test(`${route} has no accessibility violations`, async ({ page }) => {
        await page.goto(route);
        expect((await axe(page)).violations).toEqual([]);
      });
    }

    for (const menu of ["language", "theme"] as const) {
      test(`the open ${menu} menu has no accessibility violations`, async ({
        page,
      }) => {
        await page.goto("/");
        await page
          .getByRole("button", { name: TRIGGER_NAMES[locale][menu] })
          .click();
        await expect(page.getByRole("menu")).toBeVisible();
        expect((await axe(page)).violations).toEqual([]);
      });
    }
  });
}
