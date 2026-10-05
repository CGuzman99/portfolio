import { createCn } from "cn/config";

/**
 * `cn` taught the site's own type scale (app/globals.css). Unconfigured, it
 * reads `text-body` or `text-meta` as a colour and drops the real colour class
 * it "conflicts" with, e.g. a button's `text-primary-foreground`.
 *
 * shadcn's CLI writes `import { cn } from "cn"` into components/ui; point new
 * components at "@/lib/utils" instead.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "hero-sm", "h2", "h3", "body", "meta"] }],
    },
  },
});
