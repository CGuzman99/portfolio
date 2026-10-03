import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ContractBlock } from "@/components/site/contract-block";
import { sectionLabelClass, textLinkClass } from "@/components/site/text-link";
import { getCaseStudy } from "@/content/mdx";
import { projects } from "@/content/projects";
import { normalizeAppLocale } from "@/i18n/config";

export default async function Home() {
  const [locale, t] = await Promise.all([
    getLocale().then(normalizeAppLocale),
    getTranslations("home"),
  ]);
  const featured = projects.filter((project) => project.featured);

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl flex-1 px-6 py-16 outline-none sm:px-8 sm:py-24"
    >
      <section aria-labelledby="home-title" className="max-w-text">
        <p className={sectionLabelClass}>{t("label")}</p>
        <h1
          id="home-title"
          className="mt-6 font-serif text-hero-sm font-medium md:text-hero"
        >
          {t.rich("headline", {
            brand: (chunks) => <span className="text-brand">{chunks}</span>,
          })}
        </h1>
        <p className="mt-6 text-muted-foreground">{t("supporting")}</p>
      </section>

      <section aria-labelledby="work-title" className="mt-24">
        <p className={sectionLabelClass}>{t("workLabel")}</p>
        <h2 id="work-title" className="mt-2 text-h2 font-medium">
          {t("workTitle")}
        </h2>
        <ol className="mt-8 border-t border-border">
          {featured.map((project, index) => {
            const { meta } = getCaseStudy(project.slug, locale);
            return (
              <li
                key={project.slug}
                className="grid gap-x-8 gap-y-2 border-b border-border py-8 md:grid-cols-[4rem_minmax(0,1fr)]"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-meta text-muted-foreground md:pt-2"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="max-w-text">
                  <h3 className="text-h3 font-medium">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="rounded-sm underline decoration-border underline-offset-4 transition-colors hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {meta.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-muted-foreground">{meta.summary}</p>
                  <p className="mt-4 font-mono text-meta text-muted-foreground">
                    <span className="sr-only">{t("stackLabel")}: </span>
                    {project.stack.join(" · ")}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 font-mono text-meta">
          <Link href="/projects" className={textLinkClass}>
            {t("allProjects")}
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </section>

      <div className="mt-24 max-w-text">
        <ContractBlock label={t("contractLabel")} />
      </div>

      <section
        aria-labelledby="cta-title"
        className="mt-24 max-w-text border-t border-border pt-8"
      >
        <h2 id="cta-title" className="text-h3 font-medium">
          {t("ctaTitle")}
        </h2>
        <p className="mt-4 font-mono text-meta">
          <Link href="/contact" className={textLinkClass}>
            {t("ctaLink")}
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </section>
    </main>
  );
}
