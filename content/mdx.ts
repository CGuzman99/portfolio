import type { MDXContent } from "mdx/types";
import { z } from "zod";
import type { AppLocale } from "@/i18n/config";
import type { ProjectSlug } from "./projects";

import * as expressusCafeEn from "./en/projects/expressus-cafe.mdx";
import * as f1ForecastLabEn from "./en/projects/f1-forecast-lab.mdx";
import * as fibrantEn from "./en/projects/fibrant.mdx";
import * as forgeClashInsightEn from "./en/projects/forge-clash-insight.mdx";
import * as vdcPluginsEn from "./en/projects/vdc-plugins.mdx";
import * as expressusCafeEs from "./es/projects/expressus-cafe.mdx";
import * as f1ForecastLabEs from "./es/projects/f1-forecast-lab.mdx";
import * as fibrantEs from "./es/projects/fibrant.mdx";
import * as forgeClashInsightEs from "./es/projects/forge-clash-insight.mdx";
import * as vdcPluginsEs from "./es/projects/vdc-plugins.mdx";

/**
 * Every case study's MDX, in both locales, as *static* imports. This map is
 * what makes a missing file fail the build:
 *
 * - delete an MDX file and its import cannot resolve, so `next build` fails;
 * - add a record to projects.ts without an entry here and `satisfies` fails
 *   the typecheck, which `next build` also runs.
 */
type MDXModule = { default: MDXContent; meta: unknown };

const modules = {
  fibrant: { en: fibrantEn, es: fibrantEs },
  "vdc-plugins": { en: vdcPluginsEn, es: vdcPluginsEs },
  "f1-forecast-lab": { en: f1ForecastLabEn, es: f1ForecastLabEs },
  "expressus-cafe": { en: expressusCafeEn, es: expressusCafeEs },
  "forge-clash-insight": { en: forgeClashInsightEn, es: forgeClashInsightEs },
} satisfies Record<ProjectSlug, Record<AppLocale, MDXModule>>;

/** The words that live in each MDX file's `export const meta`. */
const MetaSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  /** Fig. 1's caption, and the alt text a screenshot hero needs. */
  hero: z.object({
    caption: z.string().min(1),
    alt: z.string().min(1).optional(),
  }),
});

export type CaseStudyMeta = z.infer<typeof MetaSchema>;

export type CaseStudy = { meta: CaseStudyMeta; Content: MDXContent };

// Parsed at module load, so a malformed `meta` fails the build.
const caseStudies = Object.fromEntries(
  Object.entries(modules).map(([slug, locales]) => [
    slug,
    Object.fromEntries(
      Object.entries(locales).map(([locale, mod]) => {
        const parsed = MetaSchema.safeParse(mod.meta);
        if (!parsed.success) {
          throw new Error(
            `content/${locale}/projects/${slug}.mdx: invalid meta export\n${z.prettifyError(parsed.error)}`,
          );
        }
        return [locale, { meta: parsed.data, Content: mod.default }];
      }),
    ),
  ]),
) as Record<ProjectSlug, Record<AppLocale, CaseStudy>>;

export function getCaseStudy(slug: ProjectSlug, locale: AppLocale): CaseStudy {
  return caseStudies[slug][locale];
}
