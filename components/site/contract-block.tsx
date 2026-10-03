import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { sectionLabelClass, textLinkClass } from "./text-link";

const KINDS = ["web", "ai", "desktop", "data"] as const;

/**
 * "Available for contract work", on Home and About: the four kinds of work and
 * how to start. No prices and no booking link, by rule (CLAUDE.md).
 */
export async function ContractBlock({
  label,
}: {
  /** The "§ 0N" label, numbered by the page it sits on. */
  label?: string;
}) {
  const t = await getTranslations("contract");

  return (
    <section aria-labelledby="contract-title" data-testid="contract-block">
      {label && (
        <p className={sectionLabelClass}>
          {label}
        </p>
      )}
      <h2 id="contract-title" className={cn(label && "mt-2", "text-h2 font-medium")}>
        {t("title")}
      </h2>
      <ul className="mt-6 list-disc space-y-2 pl-6">
        {KINDS.map((kind) => (
          <li key={kind}>{t(`kinds.${kind}`)}</li>
        ))}
      </ul>
      <p className="mt-6 text-muted-foreground">{t("terms")}</p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-meta">
        <li>
          <a href={profile.links.upwork} className={textLinkClass}>
            {t("upwork")}
          </a>
        </li>
        <li>
          <Link href="/contact" className={textLinkClass}>
            {t("contact")}
          </Link>
        </li>
      </ul>
    </section>
  );
}
