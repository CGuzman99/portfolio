import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { CodeExcerpt } from "@/components/case-study/code-excerpt";
import { Figure } from "@/components/case-study/figure";
import { Screenshot } from "@/components/case-study/screenshot";
import {
  ExpressusCheckoutFigure,
  F1PipelineFigure,
  FibrantAnalystFigure,
  ForgeClashFlowFigure,
  VdcSystemFigure,
} from "@/components/figures";
import {
  FOOTNOTE_LABEL_ID,
  FootnotesHeading,
  FootnotesSection,
} from "@/components/case-study/footnote";

/**
 * Required by @next/mdx in the App Router. Typography for plain markdown lives
 * in the `.prose-paper` rules in globals.css; this map only swaps in elements
 * that need behaviour, plus the components MDX files may use without an
 * import.
 */
const components = {
  h2: (props: ComponentProps<"h2">) =>
    props.id === FOOTNOTE_LABEL_ID ? (
      <FootnotesHeading {...props} />
    ) : (
      <h2 {...props} />
    ),
  section: (props: ComponentProps<"section">) =>
    "data-footnotes" in props ? (
      <FootnotesSection {...props} />
    ) : (
      <section {...props} />
    ),
  // A code block scrolls sideways; keyboard users need to be able to reach it.
  pre: (props: ComponentProps<"pre">) => <pre tabIndex={0} {...props} />,
  Figure,
  CodeExcerpt,
  Screenshot,
  ExpressusCheckoutFigure,
  F1PipelineFigure,
  FibrantAnalystFigure,
  ForgeClashFlowFigure,
  VdcSystemFigure,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
