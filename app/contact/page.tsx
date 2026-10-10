import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/site/contact-form";
import { sectionLabelClass, textLinkClass } from "@/components/site/text-link";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return pageMetadata({ title: t("contactTitle"), path: "/contact" });
}

export default async function ContactPage() {
  const [t, tAbout] = await Promise.all([
    getTranslations("contact"),
    getTranslations("about"),
  ]);
  // No email address here, by rule: it appears on /cv and its PDFs only.
  const profiles = (["github", "linkedin", "upwork"] as const).map((key) => ({
    label: tAbout(`profiles.${key}`),
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

      <div className="mt-12 max-w-text">
        <p>{t("intro")}</p>
        <div className="mt-8">
          <ContactForm />
        </div>

        <section
          aria-labelledby="profiles-title"
          className="mt-16 border-t border-border pt-8"
        >
          <h2 id="profiles-title" className="text-h3 font-medium">
            {t("profilesTitle")}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-meta">
            {profiles.map(({ label, url }) => (
              <li key={label}>
                <a href={url} className={textLinkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
