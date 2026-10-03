import type { ReactNode } from "react";

/**
 * Frames a fenced code block (highlighted by rehype-pretty-code) as an excerpt:
 * a mono title bar naming the file, and an optional caption below.
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
  return (
    <figure className="code-excerpt my-8">
      <div className="overflow-hidden rounded-sm border border-border">
        {title && (
          <p className="border-b border-border px-4 py-2 font-mono text-meta text-muted-foreground">
            {title}
          </p>
        )}
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-meta text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
