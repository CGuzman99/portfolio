import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Reads ./i18n/request.ts, next-intl's default path.
const withNextIntl = createNextIntlPlugin();

// Turbopack runs the MDX compiler in Rust, so plugins are named by string and
// their options must be serialisable — no functions here.
const withMDX = createMDX({
  options: {
    // GFM footnotes (`[^1]`) and tables.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          // Both themes are emitted as CSS variables; globals.css picks one
          // from the `.dark` class next-themes sets. These two are the GitHub
          // pair whose every token colour clears WCAG AA (4.5:1) on our
          // --background in each theme; plain github-light/dark do not.
          theme: { light: "github-light-high-contrast", dark: "github-dark-default" },
          keepBackground: false,
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withNextIntl(withMDX(nextConfig));
