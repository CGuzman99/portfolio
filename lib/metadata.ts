import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import en from "@/messages/en.json";

export const SITE_NAME = "Carlos Guzman";

/** Every share image's size and type (lib/og.tsx renders them). */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** The root share image is English (app/opengraph-image.tsx), so is its alt. */
export const SITE_IMAGE_ALT = en.meta.title;

/** Joins a page title to the site name, as the layout's title template does. */
export const TITLE_TEMPLATE = `%s — ${SITE_NAME}`;

export function ogLocale(locale: string): string {
  return locale === "es" ? "es_MX" : "en_US";
}

/**
 * One page's metadata. Next replaces `openGraph` wholesale rather than merging
 * it with the layout's, and the title template does not reach `og:title`, so
 * every page restates the shared fields here with its full title and the site
 * description as fallbacks.
 */
export async function pageMetadata({
  title,
  description,
  path,
  ownImage = false,
}: {
  /** Shown through the title template; omit on Home for the site title. */
  title?: string;
  /** Omit to use the site description. */
  description?: string;
  /** The page's one URL, relative to `metadataBase`. */
  path: string;
  /** The page's segment has its own opengraph-image file. */
  ownImage?: boolean;
}): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("meta")]);
  const fullTitle = title ? TITLE_TEMPLATE.replace("%s", title) : t("title");
  const fullDescription = description ?? t("description");

  return {
    ...(title && { title }),
    description: fullDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      url: path,
      title: fullTitle,
      description: fullDescription,
      // A page's `openGraph` hides the root opengraph-image from child
      // segments, so name it again — except where the segment has its own
      // image file, which only applies while `images` is left unset.
      ...(!ownImage && {
        images: [
          { url: "/opengraph-image", ...OG_SIZE, type: OG_CONTENT_TYPE, alt: SITE_IMAGE_ALT },
        ],
      }),
    },
  };
}
