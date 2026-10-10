import { expect, test } from "@playwright/test";
import { EMAIL, setLocaleCookie } from "./helpers";

const HEADINGS = {
  en: ["Skills", "Experience", "Education", "Languages", "Credentials", "CV"],
  es: ["Habilidades", "Experiencia", "Formación", "Idiomas", "Credenciales", "CV"],
} as const;

for (const locale of ["en", "es"] as const) {
  test(`About has every section in ${locale}`, async ({
    page,
    context,
    baseURL,
  }) => {
    await setLocaleCookie(context, baseURL, locale);
    await page.goto("/about");
    for (const name of HEADINGS[locale]) {
      await expect(
        page.getByRole("heading", { level: 2, name, exact: true }),
      ).toBeVisible();
    }
  });
}

test("both CV links serve a PDF", async ({ page, request, context, baseURL }) => {
  await setLocaleCookie(context, baseURL, "en");
  await page.goto("/about");
  for (const name of ["Download CV (English, PDF)", "Download CV (Spanish, PDF)"]) {
    const href = await page.getByRole("link", { name }).getAttribute("href");
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("application/pdf");
  }
});

test("the profile links point at Carlos's profiles", async ({
  page,
  context,
  baseURL,
}) => {
  await setLocaleCookie(context, baseURL, "en");
  await page.goto("/about");
  const profiles = page.getByRole("region", { name: "Profiles" });
  await expect(profiles.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/CGuzman99",
  );
  await expect(profiles.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/carlos-antonio-guzm%C3%A1n-jim%C3%A9nez-8b7328225",
  );
  await expect(profiles.getByRole("link", { name: "Upwork" })).toHaveAttribute(
    "href",
    "https://www.upwork.com/freelancers/~01b3da283ab722a8c8",
  );
});

test("the email stays off About", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("body")).not.toContainText(EMAIL);
  await expect(page.locator("body")).not.toContainText("@cguzman.dev");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});
