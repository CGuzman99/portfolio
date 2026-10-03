import { expect, test, type Page } from "@playwright/test";
import { TRIGGER_NAMES, setLocaleCookie } from "./helpers";

const html = (page: Page) => page.locator("html");

test("html lang and copy follow the locale cookie", async ({
  page,
  context,
  baseURL,
}) => {
  await setLocaleCookie(context, baseURL, "es");
  await page.goto("/");
  await expect(html(page)).toHaveAttribute("lang", "es");
  await expect(
    page.getByRole("navigation", { name: "Inicio" }).getByRole("link", {
      name: "Proyectos",
    }),
  ).toBeVisible();

  await setLocaleCookie(context, baseURL, "en");
  await page.reload();
  await expect(html(page)).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("navigation", { name: "Main" }).getByRole("link", {
      name: "Projects",
    }),
  ).toBeVisible();
});

test.describe("first visit with Spanish Accept-Language", () => {
  // The browser locale drives the Accept-Language header Chromium sends.
  test.use({ locale: "es-MX" });

  test("renders Spanish and stores the choice", async ({ page, context }) => {
    // A deep link, not just /, must store the choice: the proxy runs everywhere.
    await page.goto("/this-page-does-not-exist");
    await expect(html(page)).toHaveAttribute("lang", "es");
    const cookies = await context.cookies();
    expect(cookies.find((c) => c.name === "NEXT_LOCALE")?.value).toBe("es");
  });
});

test.describe("first visit with an unsupported Accept-Language", () => {
  test.use({ locale: "fr-FR" });

  test("falls back to English", async ({ page }) => {
    await page.goto("/");
    await expect(html(page)).toHaveAttribute("lang", "en");
  });
});

async function switchToSpanish(page: Page) {
  await page.getByRole("button", { name: TRIGGER_NAMES.en.language }).click();
  await page.getByRole("menuitemradio", { name: "Español" }).click();
  await expect(html(page)).toHaveAttribute("lang", "es");
  await expect(
    page.getByRole("button", { name: TRIGGER_NAMES.es.language }),
  ).toBeVisible();
  await expect(page.getByRole("status").filter({ hasText: /\S/ })).toHaveText(
    "Idioma cambiado a español.",
  );
}

const setMarker = (page: Page) =>
  page.evaluate(() => {
    (window as unknown as { __marker: boolean }).__marker = true;
  });
const hasMarker = (page: Page) =>
  page.evaluate(() => (window as unknown as { __marker?: boolean }).__marker);

test("switching language keeps the URL and refreshes in place", async ({
  page,
  context,
  baseURL,
}) => {
  await setLocaleCookie(context, baseURL, "en");
  await page.goto("/");
  const url = page.url();
  // A full navigation would wipe this marker; a refresh in place keeps it.
  await setMarker(page);

  await switchToSpanish(page);

  expect(page.url()).toBe(url);
  expect(await hasMarker(page)).toBe(true);
  // Keyboard users keep their place: focus is back on the trigger.
  await expect(
    page.getByRole("button", { name: TRIGGER_NAMES.es.language }),
  ).toBeFocused();
  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === "NEXT_LOCALE")?.value).toBe("es");
});

// Next.js answers router.refresh() on a not-found page with a full document
// load, so only the URL and the announcement are asserted here.
test("switching language on the 404 page keeps the URL", async ({
  page,
  context,
  baseURL,
}) => {
  await setLocaleCookie(context, baseURL, "en");
  await page.goto("/this-page-does-not-exist");
  const url = page.url();

  await switchToSpanish(page);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Página no encontrada",
  );
  expect(page.url()).toBe(url);
});

test("unknown URLs return a localized 404", async ({
  page,
  context,
  baseURL,
}) => {
  await setLocaleCookie(context, baseURL, "es");
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Página no encontrada",
  );
});
