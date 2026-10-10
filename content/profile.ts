import { z } from "zod";

/**
 * The facts behind About and the CV: links, dates and file paths, once, in one
 * place. The words (bio, role names, skill groups) live per locale in
 * messages/{en,es}.json under `about`.
 *
 * Every value here must trace to docs/content-sources.md.
 */

/** "YYYY" or "YYYY-MM": whichever precision content-sources.md gives. */
export const period = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, "expected YYYY or YYYY-MM");

export const EXPERIENCE_KEYS = [
  "utahbim",
  "fibrant",
  "expressus",
  "upwork",
  "fiverr",
] as const;

const ProfileSchema = z.object({
  links: z.object({
    github: z.url(),
    linkedin: z.url(),
    upwork: z.url(),
  }),
  /** Shown on /cv and its PDFs only, not on the other pages. */
  email: z.email(),
  /** In content-sources.md order; `key` names the role in `about.experience`. */
  experience: z.array(
    z.object({
      key: z.enum(EXPERIENCE_KEYS),
      start: period,
      end: period.nullable(),
    }),
  ),
  education: z.object({ start: period, end: period }),
  cv: z.object({ en: z.string().startsWith("/"), es: z.string().startsWith("/") }),
});

// Parsed at module load, so a bad value fails `next build`, not a visitor.
export const profile = ProfileSchema.parse({
  links: {
    github: "https://github.com/CGuzman99",
    linkedin:
      "https://www.linkedin.com/in/carlos-antonio-guzm%C3%A1n-jim%C3%A9nez-8b7328225",
    upwork: "https://www.upwork.com/freelancers/~01b3da283ab722a8c8",
  },
  email: "carlos@cguzman.dev",
  experience: [
    { key: "utahbim", start: "2025-08", end: null },
    { key: "fibrant", start: "2026", end: null },
    { key: "expressus", start: "2025", end: null },
    { key: "upwork", start: "2024", end: null },
    { key: "fiverr", start: "2024", end: "2025" },
  ],
  education: { start: "2018", end: "2022" },
  cv: {
    en: "/cv/carlos-guzman-cv-en.pdf",
    es: "/cv/carlos-guzman-cv-es.pdf",
  },
});

export type Profile = typeof profile;

/** A skill group as it appears in messages: a name and its items. */
export type SkillGroup = { name: string; items: string };
