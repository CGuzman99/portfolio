"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
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

const THEMES = ["light", "dark", "system"] as const;
type Theme = (typeof THEMES)[number];

function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

const noopSubscribe = () => () => {};

/** False on the server and during hydration, true once mounted. */
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Light / Dark / System. The stored theme only exists in the browser, so the
 * trigger renders the plain "Theme" name on the server and during hydration,
 * then names the current choice ("Theme: System") once mounted. The icon swaps
 * by CSS, so it never mismatches.
 */
export function ThemeToggle() {
  const t = useTranslations("theme");
  const locale = useLocale();
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const current: Theme = isTheme(theme) ? theme : "system";
  // Tagged with the locale so a later language switch, which re-renders this
  // text in the new language, does not read the old announcement out again.
  const [announced, setAnnounced] = useState<{
    theme: Theme;
    locale: string;
  } | null>(null);

  function choose(next: unknown) {
    if (!isTheme(next)) return;
    setTheme(next);
    setAnnounced({ theme: next, locale });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={
                mounted
                  ? t("triggerCurrent", { theme: t(current) })
                  : t("trigger")
              }
            />
          }
        >
          <SunIcon aria-hidden="true" className="dark:hidden" />
          <MoonIcon aria-hidden="true" className="hidden dark:block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t("menu")}</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={current}
              onValueChange={choose}
            >
              {THEMES.map((option) => (
                <DropdownMenuRadioItem
                  key={option}
                  value={option}
                  closeOnClick
                >
                  {t(option)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <span role="status" className="sr-only">
        {announced?.locale === locale
          ? t("changed", { theme: t(announced.theme) })
          : ""}
      </span>
    </>
  );
}
