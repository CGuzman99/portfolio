import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 font-mono text-meta text-muted-foreground sm:flex-row sm:justify-between sm:px-8">
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        <p>{t("location")}</p>
      </div>
    </footer>
  );
}
