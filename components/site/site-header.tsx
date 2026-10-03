import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageToggle } from "./language-toggle";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

const linkClass =
  "rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function Brand() {
  return (
    <Link
      href="/"
      className={`${linkClass} font-serif text-h3 leading-none font-medium`}
    >
      Carlos Guzman
    </Link>
  );
}

export async function SiteHeader() {
  const t = await getTranslations("nav");

  return (
    // Sticky so the nav and toggles are always in reach. It is opaque, and its
    // height is the --header-height token, which the sticky metadata column
    // and scroll-padding-top (anchors, focus) both clear.
    <header className="sticky top-0 z-40 border-b border-border bg-background print:hidden">
      {/* From sm up: name, nav and toggles, justified between. Below sm the
          nav and toggles move into the menu panel. */}
      <div className="mx-auto flex h-(--header-height) w-full max-w-5xl items-center justify-between gap-8 px-6 sm:px-8">
        <Brand />
        <nav aria-label={t("label")} className="hidden sm:block">
          <ul className="flex items-center gap-6 font-mono text-meta leading-none text-muted-foreground">
            {NAV.map(({ href, key }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <div className="sm:hidden">
          <MobileMenu
            label={t("menu")}
            closeLabel={t("closeMenu")}
            brand={<Brand />}
          >
            <nav aria-label={t("label")}>
              <ul className="font-mono text-body">
                {NAV.map(({ href, key }) => (
                  <li key={href} className="border-b border-border">
                    <Link href={href} className={`${linkClass} block py-4`}>
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Pulled out by the ghost buttons' padding so the icons line up
                with the links above. */}
            <div className="-mx-2 flex items-center justify-between pt-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
