import type { ReactNode } from "react";
import { labelScrollRegions } from "./scroll-region";

/**
 * Frames a fenced code block (highlighted by rehype-pretty-code) as an excerpt:
 * a mono title bar naming the file, and an optional caption below. The title
 * and caption name the code block for screen readers.
 *
 * ```mdx
 * <CodeExcerpt title="LicenseGate.cs" caption="…">
 * ```cs
 * …
 * ```
 * </CodeExcerpt>
 * ```
 */
export function CodeExcerpt({
  title,
  caption,
  children,
}: {
  title?: string;
  caption?: string;
  children: ReactNode;
}) {
  // A page shows each file once, so the file name makes a unique id.
  const base = `excerpt-${(title ?? caption ?? "code").replace(/[^a-z0-9]+/gi, "-")}`;
  const titleId = title ? `${base}-title` : undefined;
  const captionId = caption ? `${base}-caption` : undefined;
  const labelledBy = [titleId, captionId].filter(Boolean).join(" ");

  return (
    <figure className="code-excerpt my-8">
      <div className="overflow-hidden rounded-sm border border-border">
        {title && (
          <p
            id={titleId}
            className="border-b border-border px-4 py-2 font-mono text-meta text-muted-foreground"
          >
            {title}
          </p>
        )}
        {labelledBy ? labelScrollRegions(children, labelledBy) : children}
      </div>
      {caption && (
        <figcaption
          id={captionId}
          className="mt-2 font-mono text-meta text-muted-foreground"
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
