import { z } from "zod";

/**
 * The project registry: every *fact* about a case study, once, in one place.
 * Words (title, summary, body) live per locale in content/{en,es}/projects.
 *
 * Every value here must trace to docs/content-sources.md. A fact that is not
 * there is "[PLACEHOLDER]" until Carlos confirms it.
 */

export const TAGS = ["ai", "construction", "ecommerce", "ml-data", "finance"] as const;
export const STATUSES = ["live", "commercial", "prototype"] as const;

/** "YYYY-MM", the precision content-sources.md gives every date in. */
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "expected YYYY-MM");

const link = z.object({
  label: z.string().min(1),
  url: z.url(),
});

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "expected kebab-case"),
  order: z.number().int().positive(),
  featured: z.boolean(),
  status: z.enum(STATUSES),
  timeframe: z.object({ start: month, end: month.nullable() }),
  client: z.object({ name: z.string().min(1), url: z.url() }).nullable(),
  /** "Role and team" from content-sources.md; per locale because it is prose. */
  team: z.object({ en: z.string().min(1), es: z.string().min(1) }),
  stack: z.array(z.string().min(1)).min(1),
  tags: z.array(z.enum(TAGS)).min(1),
  links: z.array(link),
  /**
   * The case study's lead visual (M6). A screenshot is a base path under
   * public/ that `npm run shots` fills with `<src>.light.png` and
   * `<src>.dark.png`; a figure names its SVG component in
   * components/figures/index.ts.
   */
  hero: z.object({
    kind: z.enum(["screenshot", "figure"]),
    src: z.string().min(1),
  }),
});

// The slug narrowed to the registry's own slugs, so content/mdx.ts can demand
// an entry for each one.
export type Project = Omit<z.infer<typeof ProjectSchema>, "slug"> & {
  slug: ProjectSlug;
};
export type ProjectTag = (typeof TAGS)[number];
export type ProjectStatus = (typeof STATUSES)[number];

const UTAHBIM = { name: "UtahBIM", url: "https://www.utahbim.com/" };
const DEEPSPACE = { name: "DeepSpace", url: "https://www.deepspace.com.mx/" };

const records = [
  {
    slug: "fibrant",
    order: 1,
    featured: true,
    status: "live",
    timeframe: { start: "2026-03", end: null },
    client: DEEPSPACE,
    team: { en: "Main developer", es: "Desarrollador principal" },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Stripe",
      "Anthropic API",
      "OpenAI API",
      "Gemini API",
      "decimal.js",
      "TanStack Query",
      "Recharts",
      "Tailwind CSS",
      "shadcn/ui",
      "next-intl",
      "Vitest",
    ],
    tags: ["ai", "finance"],
    links: [{ label: "fibrant.app", url: "https://www.fibrant.app" }],
    hero: { kind: "screenshot", src: "/projects/fibrant/hero" },
  },
  {
    slug: "vdc-plugins",
    order: 2,
    featured: true,
    status: "commercial",
    timeframe: { start: "2026-02", end: null },
    client: UTAHBIM,
    team: {
      en: "Lead developer of the add-in suite; contributor to UtahBIM's subscription app and storefront",
      es: "Desarrollador principal de la suite de add-ins; colaborador en la app de suscripciones y la tienda en línea de UtahBIM",
    },
    stack: [
      "C#",
      ".NET 8",
      "Revit API",
      "Inno Setup",
      "Next.js",
      "TypeScript",
      "Prisma",
      "MySQL",
      "NextAuth",
      "Stripe",
      "Docker",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    tags: ["construction", "ecommerce"],
    links: [
      { label: "vdcplugins.com", url: "https://vdcplugins.com/" },
      { label: "UtahBIM", url: "https://www.utahbim.com/" },
    ],
    hero: { kind: "figure", src: "vdc-system" },
  },
  {
    slug: "f1-forecast-lab",
    order: 3,
    featured: true,
    status: "live",
    timeframe: { start: "2026-05", end: "2026-06" },
    client: DEEPSPACE,
    team: {
      en: "Main developer",
      es: "Desarrollador principal",
    },
    stack: [
      "Python",
      "uv",
      "FastF1",
      "pandas",
      "NumPy",
      "scikit-learn",
      "LightGBM",
      "XGBoost",
      "pytest",
      "Supabase",
      "Next.js",
      "TypeScript",
    ],
    tags: ["ml-data", "ai"],
    links: [{ label: "deepspace.com.mx", url: "https://www.deepspace.com.mx/" }],
    hero: { kind: "screenshot", src: "/projects/f1-forecast-lab/hero" },
  },
  {
    slug: "expressus-cafe",
    order: 4,
    featured: false,
    status: "live",
    timeframe: { start: "2025-07", end: null },
    client: DEEPSPACE,
    team: { en: "Main developer", es: "Desarrollador principal" },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Stripe Checkout",
      "Skydropx",
      "Zod",
      "SWR",
      "Resend",
      "Tailwind CSS",
      "shadcn/ui",
      "Vitest",
    ],
    tags: ["ecommerce"],
    links: [{ label: "expressus.shop", url: "https://www.expressus.shop/" }],
    hero: { kind: "screenshot", src: "/projects/expressus-cafe/hero" },
  },
  {
    slug: "forge-clash-insight",
    order: 5,
    featured: false,
    status: "prototype",
    timeframe: { start: "2025-08", end: "2026-03" },
    client: UTAHBIM,
    team: { en: "Main developer", es: "Desarrollador principal" },
    stack: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Autodesk (APS/ACC)",
      "Procore",
      "Supabase",
      "OpenAI API",
      "GoHighLevel",
      "TanStack Query",
      "Tailwind CSS",
    ],
    tags: ["construction", "ai"],
    links: [{ label: "UtahBIM", url: "https://www.utahbim.com/" }],
    hero: { kind: "figure", src: "forge-clash-flow" },
  },
] as const satisfies readonly z.input<typeof ProjectSchema>[];

export type ProjectSlug = (typeof records)[number]["slug"];

// Parsed at module load, so a bad record fails `next build`, not a visitor.
export const projects: readonly Project[] = (
  z.array(ProjectSchema).parse(records) as Project[]
).toSorted((a, b) => a.order - b.order);

const uniqueSlugs = new Set(projects.map((p) => p.slug));
const uniqueOrders = new Set(projects.map((p) => p.order));
if (uniqueSlugs.size !== projects.length || uniqueOrders.size !== projects.length) {
  throw new Error("content/projects.ts: slugs and orders must be unique");
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The next case study by order, wrapping from the last back to the first. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
