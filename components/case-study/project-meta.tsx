import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import { normalizeAppLocale } from "@/i18n/config";
import { TagList } from "./tag-list";
import { Timeframe } from "./timeframe";

const linkClass =
  "rounded-sm text-brand underline decoration-border underline-offset-4 transition-colors hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-meta tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-2">{children}</dd>
    </div>
  );
}

/**
 * The case study's facts, straight from the registry: sticky beside the text
 * at 1024px and up, stacked above it below that.
 */
export async function ProjectMeta({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const [t, tProjects] = await Promise.all([
    getTranslations("caseStudy"),
    getTranslations("projects"),
  ]);
  // The client row already links the client; don't repeat it under Links.
  const links = project.links.filter((link) => link.url !== project.client?.url);

  return (
    <aside
      aria-label={t("details")}
      data-testid="project-meta"
      className="text-meta lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:max-h-[calc(100svh-var(--header-height)-4rem)] lg:overflow-y-auto"
    >
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <Row label={t("role")}>
          {project.team[normalizeAppLocale(locale)]}
        </Row>
        <Row label={t("timeframe")}>
          <Timeframe timeframe={project.timeframe} />
        </Row>
        <Row label={t("status")}>{tProjects(`status.${project.status}`)}</Row>
        {project.client && (
          <Row label={t("client")}>
            <a href={project.client.url} className={linkClass}>
              {project.client.name}
            </a>
          </Row>
        )}
        <Row label={t("stack")}>
          <ul className="font-mono">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Row>
        {links.length > 0 && (
          <Row label={t("links")}>
            <ul>
              {links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Row>
        )}
      </dl>
      <div className="mt-6">
        <TagList tags={project.tags} />
      </div>
    </aside>
  );
}
