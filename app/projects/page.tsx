import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { TagList } from "@/components/case-study/tag-list";
import { Timeframe } from "@/components/case-study/timeframe";
import { getCaseStudy } from "@/content/mdx";
import { projects } from "@/content/projects";
import { normalizeAppLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return pageMetadata({ title: t("projectsTitle"), path: "/projects" });
}

export default async function ProjectsPage() {
  const [locale, t] = await Promise.all([
    getLocale().then(normalizeAppLocale),
    getTranslations("projects"),
  ]);

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl flex-1 px-6 py-16 outline-none sm:px-8 sm:py-24"
    >
      <p className="font-mono text-meta tracking-wider text-muted-foreground uppercase">
        {t("label")}
      </p>
      <h1 className="mt-6 font-serif text-hero-sm font-medium md:text-hero">
        {t("title")}
      </h1>

      <ol className="mt-16 border-t border-border">
        {projects.map((project, index) => {
          const { meta } = getCaseStudy(project.slug, locale);
          return (
            <li
              key={project.slug}
              className="grid gap-x-8 gap-y-2 border-b border-border py-8 md:grid-cols-[4rem_minmax(0,1fr)_14rem]"
            >
              <span
                aria-hidden="true"
                className="font-mono text-meta text-muted-foreground md:pt-2"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="max-w-text">
                <h2 className="text-h2 font-medium">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded-sm underline decoration-border underline-offset-4 transition-colors hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {meta.title}
                  </Link>
                </h2>
                <p className="mt-2 text-muted-foreground">{meta.summary}</p>
              </div>
              <div className="flex flex-col gap-4 md:items-end md:pt-2 md:text-right">
                <p className="font-mono text-meta text-muted-foreground">
                  <Timeframe timeframe={project.timeframe} />
                </p>
                <TagList tags={project.tags} />
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
