import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  isAppLocale,
  pickFromAcceptLanguage,
} from "./i18n/config";

/**
 * First-visit locale detection. With no valid NEXT_LOCALE cookie, pick one
 * from Accept-Language and write it on both the request (so this render uses
 * it) and the response (so it sticks). The URL never changes.
 */
export function proxy(request: NextRequest) {
  if (isAppLocale(request.cookies.get(LOCALE_COOKIE)?.value)) {
    return NextResponse.next();
  }

  const locale =
    pickFromAcceptLanguage(request.headers.get("accept-language")) ??
    DEFAULT_LOCALE;

  request.cookies.set(LOCALE_COOKIE, locale);
  const response = NextResponse.next({ request });
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: LOCALE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
