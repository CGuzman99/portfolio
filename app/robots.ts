import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// /cv is not disallowed: a crawler has to fetch it to read its `noindex`.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl()).toString(),
  };
}
