import type { BrowserContext } from "@playwright/test";

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

/** Pins the locale the way a returning visitor would: through the cookie. */
export async function setLocaleCookie(
  context: BrowserContext,
  baseURL: string | undefined,
  locale: Locale,
) {
  await context.addCookies([
    { name: "NEXT_LOCALE", value: locale, url: baseURL ?? "http://127.0.0.1" },
  ]);
}

export const TRIGGER_NAMES = {
  // Once mounted the theme trigger names the current choice; System is the
  // default, so that is the name a fresh visit sees.
  en: { language: "Language: EN (English)", theme: "Theme: System" },
  es: { language: "Idioma: ES (español)", theme: "Tema: Sistema" },
} as const;
