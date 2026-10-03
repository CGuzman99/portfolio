"use client";

import { LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { setLocale } from "@/app/actions/locale";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, isAppLocale } from "@/i18n/config";

// The locale a switch is heading to, kept across the refresh.
const PENDING_KEY = "locale-switch";

function readPending(): string | null {
  try {
    return sessionStorage.getItem(PENDING_KEY);
  } catch {
    return null;
  }
}

function writePending(locale: string | null) {
  try {
    if (locale) sessionStorage.setItem(PENDING_KEY, locale);
    else sessionStorage.removeItem(PENDING_KEY);
  } catch {
    // Storage blocked: the switch still works, it just isn't announced.
  }
}

/**
 * EN / ES switcher. Writes the NEXT_LOCALE cookie through a server action and
 * refreshes in place, so the URL never changes. The status region announces
 * the change once the new locale renders — in the new language, because `t`
 * re-renders with the new messages.
 *
 * The pending switch goes through sessionStorage rather than component state
 * because refreshing the 404 page remounts the whole tree, toggle included.
 * The effect writes the message into the (otherwise empty) status node.
 */
export function LanguageToggle() {
  const active = useLocale();
  const router = useRouter();
  const t = useTranslations("language");
  const [pending, startTransition] = useTransition();
  const status = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Below sm a second toggle lives in the menu panel while the header one is
    // display:none. Only a rendered instance may consume the pending switch,
    // or the announcement lands in a status node no screen reader can hear.
    if (readPending() !== active || !status.current?.checkVisibility()) return;
    writePending(null);
    status.current.textContent = t("changed", { name: t(`names.${active}`) });
  }, [active, t]);

  function switchLocale(next: unknown) {
    if (pending || !isAppLocale(next) || next === active) return;
    writePending(next);
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="font-mono text-meta"
              // Not `disabled`: focus returns here when the menu closes, and a
              // disabled button would drop it to <body> mid-switch.
              aria-busy={pending}
              aria-label={t("trigger", {
                code: active.toUpperCase(),
                name: t(`names.${active}`),
              })}
            />
          }
        >
          <LanguagesIcon aria-hidden="true" />
          {active.toUpperCase()}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t("menu")}</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={active} onValueChange={switchLocale}>
              {LOCALES.map((locale) => (
                <DropdownMenuRadioItem
                  key={locale}
                  value={locale}
                  lang={locale}
                  closeOnClick
                >
                  {t(`native.${locale}`)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <span ref={status} role="status" className="sr-only" />
    </>
  );
}
