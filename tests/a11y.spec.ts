import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import {
  CONTACT_COPY,
  LOCALES,
  MENU_NAMES,
  MOBILE_VIEWPORT,
  PROJECT_SLUGS,
  TRIGGER_NAMES,
  setLocaleCookie,
} from "./helpers";

/**
 * Accessibility gate: every route × both locales (via the NEXT_LOCALE cookie)
 * × both themes (via the Playwright projects in playwright.config.ts). The
 * unknown route exercises the 404 page, which renders inside the site shell.
 */
const routes = [
  "/",
  "/projects",
  "/about",
  "/contact",
  "/cv",
  ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`),
  "/this-page-does-not-exist",
];

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

    test("the contact form's error, open-select and toast states have no accessibility violations", async ({
      page,
    }) => {
      const copy = CONTACT_COPY[locale];
      await page.goto("/contact");

      // Sent straight after load, so it is too fast and shows an error toast.
      await page.getByLabel(copy.name, { exact: true }).fill("Ada Lovelace");
      await page.getByLabel(copy.email, { exact: true }).fill("ada@example.com");
      await page.getByRole("combobox", { name: copy.reason }).click();
      await page.getByRole("option", { name: copy.job }).click();
      await page.getByLabel(copy.message, { exact: true }).fill("Hello.");
      await page.getByRole("button", { name: copy.submit }).click();
      await expect(page.getByText(copy.tooFast)).toBeVisible();
      // Check the toast at rest, not halfway through its fade-in, and the
      // button without the pointer's hover tint.
      await page.mouse.move(0, 0);
      await page.waitForFunction(() =>
        document.getAnimations().every((a) => a.playState !== "running"),
      );
      expect((await axe(page)).violations).toEqual([]);

      await page.getByLabel(copy.name, { exact: true }).clear();
      await page.getByRole("button", { name: copy.submit }).click();
      await expect(page.getByText(copy.required)).toBeVisible();
      expect((await axe(page)).violations).toEqual([]);

      await page.getByRole("combobox", { name: copy.reason }).click();
      await expect(page.getByRole("listbox")).toBeVisible();
      expect((await axe(page)).violations).toEqual([]);
    });

    test("the open mobile menu has no accessibility violations", async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await page.goto("/");
      await page.getByRole("button", { name: MENU_NAMES[locale].open }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      expect((await axe(page)).violations).toEqual([]);
    });
  });
}
