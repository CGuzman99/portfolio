import { Figure } from "@/components/case-study/figure";
import { Screenshot } from "@/components/case-study/screenshot";
import { figures } from "@/components/figures";
import type { CaseStudyMeta } from "@/content/mdx";
import type { Project } from "@/content/projects";

/**
 * The case study's lead visual, always Fig. 1: the screenshot pair or the SVG
 * figure the project's `hero` record names, captioned from the MDX `meta`.
 */
export function Hero({
  project,
  hero,
}: {
  project: Project;
  hero: CaseStudyMeta["hero"];
}) {
  const { kind, src } = project.hero;
  let visual;
  if (kind === "screenshot") {
    if (!hero.alt) {
      throw new Error(`${project.slug}: a screenshot hero needs meta.hero.alt`);
    }
    visual = <Screenshot src={src} alt={hero.alt} priority />;
  } else {
    const FigureComponent = figures[src];
    if (!FigureComponent) {
      throw new Error(`${project.slug}: no figure named "${src}" in components/figures`);
    }
    visual = <FigureComponent />;
  }

  return (
    <Figure number={1} caption={hero.caption} className="mt-0">
      {visual}
    </Figure>
  );
}
