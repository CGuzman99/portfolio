import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isAppLocale,
  pickFromAcceptLanguage,
  type AppLocale,
} from "./config";

// `satisfies` makes a key missing from the Spanish file a type error.
const messages = { en, es: es satisfies typeof en } as const;

// The NEXT_LOCALE cookie wins, then the browser's Accept-Language, then
// English. proxy.ts normally sets the cookie on the first visit; the header
// fallback covers requests the proxy matcher skips.
async function detectLocale(): Promise<AppLocale> {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isAppLocale(cookieLocale)) return cookieLocale;
  return (
    pickFromAcceptLanguage(headerList.get("accept-language")) ?? DEFAULT_LOCALE
  );
}

export default getRequestConfig(async ({ locale }) => {
  // `getTranslations({ locale })` passes an explicit locale; honour it instead
  // of re-detecting from the request.
  const resolved = isAppLocale(locale) ? locale : await detectLocale();

  return {
    locale: resolved,
    messages: messages[resolved],
  };
});
