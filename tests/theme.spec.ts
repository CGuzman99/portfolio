import { expect, test } from "@playwright/test";
import { TRIGGER_NAMES, setLocaleCookie } from "./helpers";

const isDark = (page: import("@playwright/test").Page) =>
  page.locator("html").evaluate((el) => el.classList.contains("dark"));

test.beforeEach(async ({ context, baseURL }) => {
  await setLocaleCookie(context, baseURL, "en");
});

test("the theme follows the system colour scheme", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const expected = testInfo.project.name === "chromium-dark";
  await expect.poll(() => isDark(page)).toBe(expected);
});

test("the theme toggle overrides and restores the system theme", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  // The name tracks the choice, so match on its stable prefix.
  const trigger = page.getByRole("button", { name: /^Theme: / });
  await expect(trigger).toHaveAccessibleName(TRIGGER_NAMES.en.theme);

  await trigger.click();
  await page.getByRole("menuitemradio", { name: "Dark" }).click();
  await expect.poll(() => isDark(page)).toBe(true);
  await expect(trigger).toHaveAccessibleName("Theme: Dark");
  await expect(page.getByRole("status").filter({ hasText: /\S/ })).toHaveText(
    "Theme set to Dark.",
  );

  await trigger.click();
  await page.getByRole("menuitemradio", { name: "Light" }).click();
  await expect.poll(() => isDark(page)).toBe(false);

  await trigger.click();
  await page.getByRole("menuitemradio", { name: "System" }).click();
  await expect
    .poll(() => isDark(page))
    .toBe(testInfo.project.name === "chromium-dark");
});
