import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCaseStudy } from "@/content/mdx";
import { getProject, projects } from "@/content/projects";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

// English only, and static, like app/opengraph-image.tsx.
const LOCALE = "en";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) return [];
  const { meta } = getCaseStudy(project.slug, LOCALE);
  return [
    { id: "case-study", alt: `${meta.title} — ${meta.summary}`, size, contentType },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const [{ meta }, t] = [
    getCaseStudy(project.slug, LOCALE),
    await getTranslations({ locale: LOCALE, namespace: "meta" }),
  ];
  return ogImage({
    label: `${t("projectsTitle")} · ${String(project.order).padStart(2, "0")}`,
    title: meta.title,
    body: meta.summary,
    footer: t("title"),
  });
}
