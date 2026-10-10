import { projects } from "@/content/projects";

/**
 * The site's public origin (https://cguzman.dev in production), never
 * hardcoded, so previews and local builds name their own origin:
 * `NEXT_PUBLIC_SITE_URL` wins, then Vercel's own production address (a system
 * env var on every Vercel build), then localhost for local builds.
 */
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

/**
 * Every indexable route, in navigation order. `/cv` is left out: it is
 * `noindex`, and the PDFs are its public face.
 */
export const SITE_ROUTES = [
  "/",
  "/projects",
  ...projects.map(({ slug }) => `/projects/${slug}`),
  "/about",
  "/contact",
] as const;
