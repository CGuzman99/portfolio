import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { HeroPlaceholder } from "@/components/case-study/hero-placeholder";
import { NextProject } from "@/components/case-study/next-project";
import { ProjectMeta } from "@/components/case-study/project-meta";
import { getCaseStudy } from "@/content/mdx";
import { getNextProject, getProject, projects } from "@/content/projects";
import { normalizeAppLocale } from "@/i18n/config";

// Only registry slugs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

async function load(params: PageProps<"/projects/[slug]">["params"]) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const locale = normalizeAppLocale(await getLocale());
  return { project, locale, ...getCaseStudy(project.slug, locale) };
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { meta } = await load(params);
  return { title: meta.title };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const [{ project, locale, meta, Content }, t] = await Promise.all([
    load(params),
    getTranslations("caseStudy"),
  ]);

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl flex-1 px-6 py-16 outline-none sm:px-8 sm:py-24"
    >
      {/* The metadata column is 240px wide and sticky beside the text at
          1024px and up, and stacks between the title and the body below that
          (docs/decisions.md, Layout). DOM order matches the stacked order. */}
      <article className="grid gap-12 lg:grid-cols-[var(--container-meta)_minmax(0,1fr)] lg:gap-x-16">
        <header className="max-w-text lg:col-start-2">
          <h1 className="font-serif text-hero-sm font-medium md:text-hero">
            {meta.title}
          </h1>
          <p className="mt-6 text-muted-foreground">{meta.summary}</p>
        </header>
        <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <ProjectMeta project={project} locale={locale} />
        </div>
        <div className="max-w-text lg:col-start-2">
          <HeroPlaceholder />
          <div className="prose-paper mt-8">
            <Content />
          </div>
          <p className="mt-16 font-mono text-meta text-muted-foreground">
            {t("walkthrough")}
          </p>
          <NextProject project={getNextProject(project.slug)} />
        </div>
      </article>
    </main>
  );
}
