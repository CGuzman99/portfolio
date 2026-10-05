import { expect, test, type Page } from "@playwright/test";
import { CONTACT_COPY, LOCALES, setLocaleCookie } from "./helpers";

/**
 * The contact form. The server runs with CONTACT_DRY_RUN=1 (see
 * playwright.config.ts), so a valid message comes back "sent" without
 * reaching Resend.
 *
 * The action rejects a submit under 3 s after the form mounted, timed with
 * `performance.now()` in the browser. For an honest visitor, Playwright's fake
 * clock fast-forwards past the minimum, so no test sleeps. A too-fast submit
 * needs no help: filling the form takes the test well under 3 s.
 */

async function openForm(page: Page) {
  await page.clock.install();
  await page.goto("/contact");
}

/** A visitor who took their time: ten seconds pass before the submit. */
async function honest(page: Page) {
  await page.clock.fastForward(10_000);
}


for (const locale of LOCALES) {
  const copy = CONTACT_COPY[locale];

  test.describe(`contact form in ${locale}`, () => {
    test.beforeEach(async ({ context, baseURL }) => {
      await setLocaleCookie(context, baseURL, locale);
    });

    /** Fills the required fields; submits nothing. */
    async function fillValid(page: Page) {
      await page.getByLabel(copy.name, { exact: true }).fill("Ada Lovelace");
      await page.getByLabel(copy.email, { exact: true }).fill("ada@example.com");
      await page.getByRole("combobox", { name: copy.reason }).click();
      await page.getByRole("option", { name: copy.job }).click();
      await page.getByLabel(copy.message, { exact: true }).fill("Hello.");
    }

    test("labels every field and links the profiles, but not the email", async ({
      page,
    }) => {
      await page.goto("/contact");
      for (const label of [copy.name, copy.email, copy.company, copy.message]) {
        await expect(page.getByLabel(label, { exact: true })).toBeVisible();
      }
      await expect(
        page.getByRole("combobox", { name: copy.reason }),
      ).toBeVisible();

      const main = page.getByRole("main");
      for (const name of ["GitHub", "LinkedIn", "Upwork"]) {
        await expect(main.getByRole("link", { name })).toBeVisible();
      }
      await expect(page.locator("body")).not.toContainText("@gmail.com");
      await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    });

    test("an empty submit flags each required field and focuses the first", async ({
      page,
    }) => {
      await page.goto("/contact");
      await page.getByRole("button", { name: copy.submit }).click();

      const name = page.getByLabel(copy.name, { exact: true });
      await expect(name).toBeFocused();
      await expect(name).toHaveAttribute("aria-invalid", "true");
      await expect(name).toHaveAccessibleDescription(copy.required);
      await expect(
        page.getByRole("combobox", { name: copy.reason }),
      ).toHaveAccessibleDescription(copy.reasonError);
      // Company is optional.
      await expect(
        page.getByLabel(copy.company, { exact: true }),
      ).not.toHaveAttribute("aria-invalid");
    });

    test("can be filled and sent with the keyboard alone", async ({ page }) => {
      await openForm(page);
      await page.getByLabel(copy.name, { exact: true }).focus();

      await page.keyboard.type("Ada Lovelace");
      await page.keyboard.press("Tab");
      await page.keyboard.type("ada@example.com");
      await page.keyboard.press("Tab"); // company, left empty
      await page.keyboard.press("Tab");
      const reason = page.getByRole("combobox", { name: copy.reason });
      await expect(reason).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("listbox")).toBeVisible();
      await page.keyboard.press("Home");
      await expect(
        page.getByRole("option", { name: copy.job }),
      ).toHaveAttribute("data-highlighted");
      await page.keyboard.press("Enter");
      await expect(reason).toContainText(copy.job);
      await expect(reason).toBeFocused();
      await page.keyboard.press("Tab");
      await page.keyboard.type("Hello from the keyboard.");
      await page.keyboard.press("Tab");
      await expect(page.getByRole("button", { name: copy.submit })).toBeFocused();
      await honest(page);
      await page.keyboard.press("Enter");

      await expect(page.getByText(copy.sent)).toBeVisible();
      await expect(page.getByLabel(copy.name, { exact: true })).toHaveValue("");
    });

    test("rejects a submit faster than a person could type", async ({ page }) => {
      await page.goto("/contact");
      await fillValid(page);
      await page.getByRole("button", { name: copy.submit }).click();
      await expect(page.getByText(copy.tooFast)).toBeVisible();
      await expect(page.getByText(copy.sent)).toHaveCount(0);
    });

    test("rejects a filled honeypot", async ({ page }) => {
      await openForm(page);
      await fillValid(page);
      await honest(page);
      // Out of reach for a person, so `force` skips the actionability checks.
      await page
        .locator("#contact-hp")
        .fill("https://spam.example", { force: true });
      await page.getByRole("button", { name: copy.submit }).click();
      await expect(page.getByText(copy.failed)).toBeVisible();
      await expect(page.getByText(copy.sent)).toHaveCount(0);
    });
  });
}
