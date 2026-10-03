import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("notFoundTitle") };
}

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-text flex-1 px-6 py-16 outline-none sm:px-8 sm:py-24"
    >
      <p className="font-mono text-meta tracking-wider text-muted-foreground uppercase">
        {t("label")}
      </p>
      <h1 className="mt-6 font-serif text-h2 font-medium">{t("title")}</h1>
      <p className="mt-4">{t("body")}</p>
      <p className="mt-8">
        <Link
          href="/"
          className="rounded-sm text-brand underline decoration-border underline-offset-4 transition-colors hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("home")}
        </Link>
      </p>
    </main>
  );
}
