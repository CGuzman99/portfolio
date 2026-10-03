import { getTranslations } from "next-intl/server";
import type { ComponentProps } from "react";

/**
 * Footnotes come from remark-gfm: write `text[^1]` and `[^1]: note` in MDX.
 * remark-gfm emits the numbered refs, the back-links and `aria-describedby`;
 * these two renderers only localise its heading and set the section in the
 * paper's footnote style.
 */

// remark-gfm's id for the footnotes heading, which every ref points at.
export const FOOTNOTE_LABEL_ID = "footnote-label";

export async function FootnotesHeading(props: ComponentProps<"h2">) {
  const t = await getTranslations("mdx");
  // remark-gfm writes an English "Footnotes"; keep its id, swap the text.
  return (
    <h2
      id={props.id}
      className="font-mono text-meta tracking-wider text-muted-foreground uppercase"
    >
      {t("footnotes")}
    </h2>
  );
}

export function FootnotesSection(props: ComponentProps<"section">) {
  return (
    <section
      {...props}
      className="mt-16 border-t border-border pt-6 text-meta text-muted-foreground"
    />
  );
}
