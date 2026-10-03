import { expect, test } from "@playwright/test";
import { setLocaleCookie } from "./helpers";

test.beforeEach(async ({ context, baseURL }) => {
  await setLocaleCookie(context, baseURL, "en");
});

test("printing /cv drops the site header and footer", async ({ page }) => {
  await page.goto("/cv");
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("banner")).toBeHidden();
  await expect(page.getByRole("contentinfo")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Carlos Guzman",
  );
});

test("the CV lists the email and all five projects", async ({ page }) => {
  await page.goto("/cv");
  await expect(
    page.getByRole("link", { name: "carlosantoniogj@gmail.com" }),
  ).toHaveAttribute("href", "mailto:carlosantoniogj@gmail.com");
  await expect(
    page.getByRole("region", { name: "Projects" }).getByRole("heading", {
      level: 3,
    }),
  ).toHaveCount(5);
});

test("/cv is not in the navigation", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("banner").locator('a[href="/cv"]'),
  ).toHaveCount(0);
});

test("/cv is not indexed", async ({ page }) => {
  await page.goto("/cv");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});
