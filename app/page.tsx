import { getTranslations } from "next-intl/server";

/**
 * M2 placeholder: the localized hero only, so the shell has a real page to run
 * its locale and axe checks against. Home is built for real in M4.
 */
export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-text flex-1 px-6 py-16 outline-none sm:px-8 sm:py-24"
    >
      <p className="font-mono text-meta tracking-wider text-muted-foreground uppercase">
        {t("label")}
      </p>
      <h1 className="mt-6 font-serif text-hero-sm font-medium md:text-hero">
        {t.rich("headline", {
          brand: (chunks) => <span className="text-brand">{chunks}</span>,
        })}
      </h1>
    </main>
  );
}
