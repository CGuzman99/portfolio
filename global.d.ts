import type en from "./messages/en.json";
import type { LOCALES } from "./i18n/config";

// Typed `t()` keys and locales for next-intl.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof LOCALES)[number];
    Messages: typeof en;
  }
}
