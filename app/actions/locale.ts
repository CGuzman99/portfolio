"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  normalizeAppLocale,
} from "@/i18n/config";

export async function setLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, normalizeAppLocale(locale), {
    maxAge: LOCALE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
  // The locale is resolved per request in i18n/request.ts, so every cached
  // layout above the toggle has to be dropped for the new language to render.
  revalidatePath("/", "layout");
}
