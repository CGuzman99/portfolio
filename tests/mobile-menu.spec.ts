import { expect, test } from "@playwright/test";
import {
  MENU_NAMES,
  MOBILE_VIEWPORT,
  TRIGGER_NAMES,
  setLocaleCookie,
} from "./helpers";

test.beforeEach(async ({ context, baseURL }) => {
  await setLocaleCookie(context, baseURL, "en");
});

test("from 640px the nav and toggles are inline and there is no menu button", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 800 });
  await page.goto("/");
  const banner = page.getByRole("banner");
  await expect(banner.getByRole("navigation")).toBeVisible();
  await expect(
    banner.getByRole("button", { name: TRIGGER_NAMES.en.language }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: MENU_NAMES.en.open }),
  ).toBeHidden();
});

test.describe("below 640px", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");
  });

  test("the menu button holds the nav and both toggles", async ({ page }) => {
    const banner = page.getByRole("banner");
    await expect(banner.getByRole("navigation")).toBeHidden();
    await expect(
      banner.getByRole("button", { name: TRIGGER_NAMES.en.language }),
    ).toBeHidden();

    await page.getByRole("button", { name: MENU_NAMES.en.open }).click();
    const menu = page.getByRole("dialog", { name: MENU_NAMES.en.open });
    await expect(menu).toBeVisible();
    for (const name of ["Projects", "About", "Contact"]) {
      await expect(menu.getByRole("link", { name })).toBeVisible();
    }
    await expect(
      menu.getByRole("button", { name: TRIGGER_NAMES.en.language }),
    ).toBeVisible();
    await expect(
      menu.getByRole("button", { name: TRIGGER_NAMES.en.theme }),
    ).toBeVisible();
  });

  test("Escape closes the menu and returns focus to its button", async ({
    page,
  }) => {
    const trigger = page.getByRole("button", { name: MENU_NAMES.en.open });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("the close button closes the menu", async ({ page }) => {
    await page.getByRole("button", { name: MENU_NAMES.en.open }).click();
    await page.getByRole("button", { name: MENU_NAMES.en.close }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("following a link navigates and closes the menu", async ({ page }) => {
    await page.getByRole("button", { name: MENU_NAMES.en.open }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL("/projects");
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("the language toggle in the menu switches the locale", async ({
    page,
  }) => {
    await page.getByRole("button", { name: MENU_NAMES.en.open }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: TRIGGER_NAMES.en.language })
      .click();
    await page.getByRole("menuitemradio", { name: "Español" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    // Announced from the panel, not from the hidden header toggle.
    await expect(
      page.getByRole("dialog").getByRole("status").filter({ hasText: /\S/ }),
    ).toHaveText("Idioma cambiado a español.");
  });

  test("Escape in a toggle's dropdown closes only the dropdown", async ({
    page,
  }) => {
    await page.getByRole("button", { name: MENU_NAMES.en.open }).click();
    const theme = page
      .getByRole("dialog")
      .getByRole("button", { name: TRIGGER_NAMES.en.theme });
    await theme.click();
    await expect(page.getByRole("menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).toBeHidden();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(theme).toBeFocused();
  });

  test("widening past 640px closes an open menu", async ({ page }) => {
    await page.getByRole("button", { name: MENU_NAMES.en.open }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
