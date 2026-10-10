import { SITE_IMAGE_ALT, SITE_NAME } from "@/lib/metadata";
import { OG_CONTENT_TYPE, OG_SIZE, brandParts, ogImage } from "@/lib/og";
import { siteUrl } from "@/lib/site";
import en from "@/messages/en.json";

// English only, and static: one URL serves both languages, and link-preview
// crawlers send no locale cookie, so they read the English page anyway.
export const alt = SITE_IMAGE_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    label: SITE_NAME,
    title: brandParts(en.home.headline),
    footer: new URL(siteUrl()).host,
    titleSize: 72,
  });
}
