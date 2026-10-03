import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Timeframe } from "@/components/case-study/timeframe";
import { getCaseStudy } from "@/content/mdx";
import { profile, type SkillGroup } from "@/content/profile";
import { projects } from "@/content/projects";
import { normalizeAppLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  // The PDFs are the public face of this page; the page itself stays unlisted.
  return { title: t("cvTitle"), robots: { index: false } };
}

// Ink, not brand green: these links are read off paper, where colour is noise.
const linkClass =
  "rounded-sm underline decoration-border underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-8 print:mt-5">
      <h2
        id={id}
        className="border-b border-border pb-1 font-mono text-meta font-normal tracking-wider text-muted-foreground uppercase"
      >
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Strips the scheme, for a printed URL a reader can retype. */
function display(url: string) {
  return decodeURI(url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""));
}

/**
 * The print-styled CV: the source of the two PDFs in public/cv, rendered by
 * scripts/cv.mts (`npm run cv`). Not linked from the navigation.
 */
export default async function CvPage() {
  const [locale, t, tAbout, tHome, tCase] = await Promise.all([
    getLocale().then(normalizeAppLocale),
    getTranslations("cv"),
    getTranslations("about"),
    getTranslations("home"),
    getTranslations("caseStudy"),
  ]);
  const skills = tAbout.raw("skills") as SkillGroup[];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const contacts = [
    { label: profile.email, url: `mailto:${profile.email}` },
    ...(siteUrl ? [{ label: display(siteUrl), url: siteUrl }] : []),
    { label: display(profile.links.github), url: profile.links.github },
    { label: display(profile.links.linkedin), url: profile.links.linkedin },
    { label: display(profile.links.upwork), url: profile.links.upwork },
  ];

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 text-meta leading-relaxed outline-none sm:px-8 print:max-w-none print:p-0 print:text-[10pt]"
    >
      <header>
        <h1 className="font-serif text-h2 font-medium">{t("name")}</h1>
        <p className="mt-1 font-serif text-h3">
          {tHome.rich("headline", { brand: (chunks) => chunks })}
        </p>
        <p className="mt-2 text-muted-foreground">{tAbout("location")}</p>
        <ul
          aria-label={t("contactLabel")}
          className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono"
        >
          {contacts.map(({ label, url }) => (
            <li key={url}>
              <a href={url} className={linkClass}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <p className="mt-6">{tAbout("bio")}</p>

      <Section id="cv-skills" title={tAbout("skillsTitle")}>
        <dl className="grid gap-x-4 gap-y-1 sm:grid-cols-[9rem_minmax(0,1fr)] print:grid-cols-[9rem_minmax(0,1fr)]">
          {skills.map((group) => (
            <div key={group.name} className="contents">
              <dt className="font-medium">{group.name}</dt>
              <dd>{group.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="cv-experience" title={tAbout("experienceTitle")}>
        <ul className="space-y-1">
          {profile.experience.map((role) => (
            <li
              key={role.key}
              className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 print:flex-row print:justify-between print:gap-6"
            >
              <span>{tAbout(`experience.${role.key}`)}</span>
              <span className="shrink-0 font-mono text-muted-foreground">
                <Timeframe timeframe={role} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="cv-projects" title={t("projectsTitle")}>
        <ul className="space-y-4">
          {projects.map((project) => {
            const { meta } = getCaseStudy(project.slug, locale);
            return (
              <li key={project.slug} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 print:flex-row print:justify-between print:gap-6">
                  <h3 className="font-serif text-body font-medium">
                    {meta.title}
                    {project.client && (
                      <span className="font-sans text-meta font-normal text-muted-foreground">
                        {" "}
                        · {project.client.name}
                      </span>
                    )}
                  </h3>
                  <span className="shrink-0 font-mono text-muted-foreground">
                    <Timeframe timeframe={project.timeframe} />
                  </span>
                </div>
                <p className="text-muted-foreground">
                  <span className="sr-only">{tCase("role")}: </span>
                  {project.team[locale]}
                </p>
                <p className="mt-1">{meta.summary}</p>
                <p className="mt-1 font-mono text-muted-foreground">
                  <span className="sr-only">{t("stackLabel")}: </span>
                  {project.stack.join(" · ")}
                </p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="cv-education" title={tAbout("educationTitle")}>
        <p>
          {tAbout("education", {
            start: profile.education.start,
            end: profile.education.end,
          })}
        </p>
      </Section>

      <div className="grid gap-x-8 sm:grid-cols-2 print:grid-cols-2">
        <Section id="cv-languages" title={tAbout("languagesTitle")}>
          <p>{tAbout("languages")}</p>
        </Section>
        <Section id="cv-credentials" title={tAbout("credentialsTitle")}>
          <p>{tAbout("credentials")}</p>
        </Section>
      </div>
    </main>
  );
}
