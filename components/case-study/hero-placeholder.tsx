import { getTranslations } from "next-intl/server";

/**
 * Holds the hero's place until M6 produces the screenshot or SVG figure named
 * by the project's `hero` record. Same 16:10 frame the 1440×900 shots will use.
 */
export async function HeroPlaceholder() {
  const t = await getTranslations("caseStudy");

  return (
    <div className="flex aspect-[16/10] items-center justify-center rounded-sm border border-dashed border-border font-mono text-meta text-muted-foreground">
      {t("heroPending")}
    </div>
  );
}
