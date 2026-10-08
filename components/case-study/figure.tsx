import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A captioned figure in the paper's style: "Fig. N — caption". Numbers are
 * passed by the author rather than counted, so the component stays a plain
 * Server Component and a figure keeps its number when others move.
 */
export async function Figure({
  number,
  caption,
  className,
  children,
}: {
  number: number;
  caption: string;
  className?: string;
  children: ReactNode;
}) {
  const t = await getTranslations("mdx");

  return (
    <figure className={cn("my-8", className)}>
      <div className="overflow-hidden rounded-sm border border-border">
        {children}
      </div>
      <figcaption className="mt-2 font-mono text-meta text-muted-foreground">
        {t("figure", { number })} — {caption}
      </figcaption>
    </figure>
  );
}
