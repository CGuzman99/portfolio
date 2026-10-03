export const LOCALES = ["en", "es"] as const;

export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

// The cookie next-intl's own middleware writes; Fibrant uses the same name.
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isAppLocale(value: unknown): value is AppLocale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}

export function normalizeAppLocale(value: unknown): AppLocale {
  return isAppLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Picks the best supported locale from an Accept-Language header, honouring
 * q-values and matching on the primary subtag (`es-MX` → `es`). Lives here,
 * not in request.ts, so proxy.ts can use it without pulling in message JSON.
 */
export function pickFromAcceptLanguage(
  header: string | null,
): AppLocale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return {
        tag: tag.trim().toLowerCase().split("-")[0],
        quality: q ? Number.parseFloat(q.slice(2)) || 0 : 1,
      };
    })
    .filter(({ quality }) => quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    if (isAppLocale(tag)) return tag;
  }
  return null;
}
