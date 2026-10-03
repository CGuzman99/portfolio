import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getCaseStudy } from "@/content/mdx";
import type { Project } from "@/content/projects";
import { normalizeAppLocale } from "@/i18n/config";

export async function NextProject({ project }: { project: Project }) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("caseStudy"),
  ]);
  const { meta } = getCaseStudy(project.slug, normalizeAppLocale(locale));

  return (
    <nav aria-label={t("next")} className="mt-16 border-t border-border pt-6">
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <span className="block font-mono text-meta tracking-wider text-muted-foreground uppercase">
          {t("next")}
        </span>
        <span className="mt-2 block font-serif text-h3 font-medium underline decoration-border underline-offset-4 transition-colors group-hover:decoration-brand">
          {meta.title}
          <span aria-hidden="true"> →</span>
        </span>
      </Link>
    </nav>
  );
}
