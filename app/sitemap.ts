import type { MetadataRoute } from "next";
import { SITE_ROUTES, siteUrl } from "@/lib/site";

// One URL per page serves both languages, so there are no alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return SITE_ROUTES.map((path) => ({ url: new URL(path, base).toString() }));
}
