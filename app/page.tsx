/**
 * M1 placeholder. This page exists to exercise every design token so M2 has
 * something real to run its contrast and axe checks against. Home is built
 * for real in M4 from docs/content-sources.md.
 */

const swatches = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "muted", className: "bg-muted" },
  { name: "muted-foreground", className: "bg-muted-foreground" },
  { name: "border", className: "bg-border" },
  { name: "brand", className: "bg-brand" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-text flex-1 px-6 py-16 sm:px-8 sm:py-24">
      <p className="font-mono text-meta text-muted-foreground uppercase tracking-wider">
        § 01 &nbsp;Scaffold
      </p>

      <h1 className="mt-6 font-serif text-hero-sm font-medium md:text-hero">
        Software engineer building web platforms, desktop tools and{" "}
        <span className="text-brand">AI features</span>.
      </h1>

      <p className="mt-8 text-balance">
        I&rsquo;ve built an e-commerce platform with Stripe, a multi-currency
        investment tracker with an AI analyst, Revit add-ins and a 3D
        clash-detection tool for the construction industry, and an ML
        forecasting pipeline. Open to full-time and contract roles, remote.
      </p>

      <h2 className="mt-16 font-serif text-h2">Type scale</h2>

      <dl className="mt-6 space-y-4 border-t border-border pt-6">
        <div>
          <dt className="font-mono text-meta text-muted-foreground">
            Serif / headline / 44—32 px
          </dt>
          <dd className="font-serif text-h2">
            Geometry, financial math and models that have to be right
          </dd>
        </div>
        <div>
          <dt className="font-mono text-meta text-muted-foreground">
            Sans / body / 17 px / 1.65
          </dt>
          <dd>
            Server Components everywhere except the toggles and the contact
            form; facts live once in TypeScript, words live per locale in MDX.
          </dd>
        </div>
        <div>
          <dt className="font-mono text-meta text-muted-foreground">
            Mono / metadata / 13 px
          </dt>
          <dd className="font-mono text-meta">
            0123456789 · § 01 · Fig. 1 · ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </dd>
        </div>
      </dl>

      <h3 className="mt-16 font-serif text-h3">Palette</h3>

      <figure className="mt-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map((swatch) => (
            <div
              key={swatch.name}
              className="flex flex-col gap-2 bg-background p-4"
            >
              <span
                aria-hidden="true"
                className={`h-10 rounded-sm border border-border ${swatch.className}`}
              />
              <span className="font-mono text-meta text-muted-foreground">
                {swatch.name}
              </span>
            </div>
          ))}
        </div>
        <figcaption className="mt-3 font-mono text-meta text-muted-foreground">
          Fig. 1 &mdash; Near-monochrome page with one deep-green accent. The
          theme follows the system, so switching your OS appearance repaints
          every swatch above.
        </figcaption>
      </figure>

      <p className="mt-16 border-t border-border pt-6 font-mono text-meta text-muted-foreground">
        Milestone 1 of 8 ·{" "}
        <a
          className="text-brand underline decoration-border underline-offset-4 transition-colors hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          href="https://github.com/CGuzman99/portfolio"
        >
          CGuzman99/portfolio
        </a>
      </p>
    </main>
  );
}
