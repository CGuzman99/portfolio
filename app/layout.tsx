import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SITE_NAME, TITLE_TEMPLATE, ogLocale } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("meta")]);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t("title"), template: TITLE_TEMPLATE },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      title: t("title"),
      description: t("description"),
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()]);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${plexSerif.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <NextIntlClientProvider>
            <a
              href="#main"
              className="sr-only rounded-sm bg-background px-4 py-2 print:hidden font-mono text-meta focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:outline-2 focus:outline-ring"
            >
              {t("skipLink")}
            </a>
            <SiteHeader />
            {children}
            <SiteFooter />
          </NextIntlClientProvider>
        </ThemeProvider>
        {/* Only on Vercel: elsewhere /_vercel/insights/script.js is a 404,
            and that console error costs Lighthouse best-practice points. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
