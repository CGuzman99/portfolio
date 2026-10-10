import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Timeframe } from "@/components/case-study/timeframe";
import { ContractBlock } from "@/components/site/contract-block";
import { Portrait } from "@/components/site/portrait";
import { sectionLabelClass, textLinkClass } from "@/components/site/text-link";
import { profile, type SkillGroup } from "@/content/profile";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return pageMetadata({ title: t("aboutTitle"), path: "/about" });
}

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
    <section aria-labelledby={id} className="border-t border-border pt-8">
      <h2 id={id} className="text-h3 font-medium">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const skills = t.raw("skills") as SkillGroup[];
  const profiles = (["github", "linkedin", "upwork"] as const).map((key) => ({
    label: t(`profiles.${key}`),
    url: profile.links[key],
  }));

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl flex-1 px-6 py-16 outline-none sm:px-8 sm:py-24"
    >
      <p className={sectionLabelClass}>{t("label")}</p>
      <h1 className="mt-6 font-serif text-hero-sm font-medium md:text-hero">
        {t("title")}
      </h1>

      <div className="mt-12 grid gap-8 md:grid-cols-[15rem_minmax(0,1fr)] md:items-center md:gap-12">
        <div className="mx-auto w-full max-w-60 md:mx-0">
          <Portrait />
        </div>
        <div className="max-w-text">
          <p>{t("bio")}</p>
          <p className="mt-4 font-mono text-meta text-muted-foreground">
            {t("location")}
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-text space-y-12">
        <Section id="skills-title" title={t("skillsTitle")}>
          <dl className="space-y-4">
            {skills.map((group) => (
              <div key={group.name}>
                <dt className="font-mono text-meta tracking-wider text-muted-foreground uppercase">
                  {group.name}
                </dt>
                <dd className="mt-1">{group.items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="experience-title" title={t("experienceTitle")}>
          <ul className="space-y-4">
            {profile.experience.map((role) => (
              <li
                key={role.key}
                className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-8"
              >
                <span>{t(`experience.${role.key}`)}</span>
                <span className="shrink-0 font-mono text-meta text-muted-foreground sm:pt-1">
                  <Timeframe timeframe={role} />
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education-title" title={t("educationTitle")}>
          <p>
            {t("education", {
              start: profile.education.start,
              end: profile.education.end,
            })}
          </p>
        </Section>

        <Section id="languages-title" title={t("languagesTitle")}>
          <p>{t("languages")}</p>
        </Section>

        <Section id="credentials-title" title={t("credentialsTitle")}>
          <p>{t("credentials")}</p>
        </Section>

        <Section id="profiles-title" title={t("linksTitle")}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-meta">
            {profiles.map(({ label, url }) => (
              <li key={label}>
                <a href={url} className={textLinkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="cv-title" title={t("cvTitle")}>
          <ul className="space-y-2 font-mono text-meta">
            <li>
              <a href={profile.cv.en} download hrefLang="en" className={textLinkClass}>
                {t("cvEn")}
              </a>
            </li>
            <li>
              <a href={profile.cv.es} download hrefLang="es" className={textLinkClass}>
                {t("cvEs")}
              </a>
            </li>
          </ul>
        </Section>

        <div className="border-t border-border pt-8">
          <ContractBlock />
        </div>
      </div>
    </main>
  );
}
