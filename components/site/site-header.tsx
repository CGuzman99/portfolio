import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

const linkClass =
  "rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export async function SiteHeader() {
  const t = await getTranslations("nav");

  return (
    <header className="border-b border-border">
      {/* Three sections, justified between: name, nav, toggles. Below sm the
          nav drops to its own row so the name and toggles keep the first. */}
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4 sm:px-8">
        <Link
          href="/"
          className={`${linkClass} font-serif text-h3 leading-none font-medium`}
        >
          Carlos Guzman
        </Link>
        <nav
          aria-label={t("label")}
          className="order-last w-full sm:order-none sm:w-auto"
        >
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
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
