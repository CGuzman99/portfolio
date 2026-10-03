import { expect, test } from "@playwright/test";
import { setLocaleCookie } from "./helpers";

test.beforeEach(async ({ context, baseURL }) => {
  await setLocaleCookie(context, baseURL, "en");
});

test("the index lists the three featured projects in order", async ({
  page,
}) => {
  await page.goto("/");
  const work = page.getByRole("region", { name: "Selected work" });
  const links = work.getByRole("listitem").getByRole("link");
  await expect(links).toHaveCount(3);
  const expected = [
    ["Fibrant", "/projects/fibrant"],
    ["VDC Plugins for Revit", "/projects/vdc-plugins"],
    ["F1 Forecast Lab", "/projects/f1-forecast-lab"],
  ];
  for (const [i, [name, href]] of expected.entries()) {
    await expect(links.nth(i)).toHaveText(name);
    await expect(links.nth(i)).toHaveAttribute("href", href);
  }
});

test("the contract block names the four kinds of work and no prices", async ({
  page,
}) => {
  await page.goto("/");
  const block = page.getByTestId("contract-block");
  await expect(
    block.getByRole("heading", { name: "Available for contract work" }),
  ).toBeVisible();
  await expect(block.getByRole("list").first().getByRole("listitem")).toHaveCount(4);
  await expect(block.getByRole("link", { name: "Upwork profile" })).toHaveAttribute(
    "href",
    /^https:\/\/www\.upwork\.com\/freelancers\//,
  );
  await expect(block.getByRole("link", { name: "Contact form" })).toHaveAttribute(
    "href",
    "/contact",
  );
  await expect(block).not.toContainText(/[$€]|USD|MXN|\/h(ou)?r/);
});

test("the Spanish home shows the approved supporting line", async ({
  page,
  context,
  baseURL,
}) => {
  await setLocaleCookie(context, baseURL, "es");
  await page.goto("/");
  await expect(page.getByRole("main")).toContainText(
    "Disponible para puestos de tiempo completo y por contrato, en remoto.",
  );
});
