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

/** The header's menu button and the panel's close button, below 640px. */
export const MENU_NAMES = {
  en: { open: "Menu", close: "Close menu" },
  es: { open: "Menú", close: "Cerrar menú" },
} as const;

/** A phone-sized viewport, below the `sm` breakpoint. */
export const MOBILE_VIEWPORT = { width: 390, height: 800 } as const;

/**
 * The case studies in registry order. Kept as a literal rather than imported
 * from content/projects.ts, so a project dropped from the registry fails a
 * test instead of silently shrinking the suite.
 */
export const PROJECT_SLUGS = [
  "fibrant",
  "vdc-plugins",
  "f1-forecast-lab",
  "expressus-cafe",
  "forge-clash-insight",
] as const;

/** The contact form's labels and outcomes, as messages/{en,es}.json word them. */
export const CONTACT_COPY = {
  en: {
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    reason: "Reason",
    message: "Message",
    submit: "Send message",
    job: "Job opportunity",
    required: "This field is required.",
    reasonError: "Choose a reason.",
    sent: "Message sent. Thanks, I'll get back to you by email.",
    tooFast: "That was quick. Wait a few seconds and send it again.",
    failed:
      "The message couldn't be sent. Try again, or reach me on LinkedIn or Upwork.",
  },
  es: {
    name: "Nombre",
    email: "Correo electrónico",
    company: "Empresa (opcional)",
    reason: "Motivo",
    message: "Mensaje",
    submit: "Enviar mensaje",
    job: "Oferta de trabajo",
    required: "Este campo es obligatorio.",
    reasonError: "Elige un motivo.",
    sent: "Mensaje enviado. Gracias, te respondo por correo.",
    tooFast: "Fue muy rápido. Espera unos segundos y vuelve a enviarlo.",
    failed:
      "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por LinkedIn o Upwork.",
  },
} as const;

