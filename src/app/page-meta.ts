import type { Metadata } from "next";
import { isLocale, str } from "@/content";
import type { Locale } from "@/content/types";

export const SITE_URL = "https://caiobarilli.github.io";

type Params = { params: Promise<{ locale: string }> };

/**
 * Title, description and link preview (Open Graph and Twitter card) for one page.
 * Next replaces a parent's openGraph instead of merging it, so every page sends the full set.
 */
export function pageMetadata(locale: Locale, title: string, description: string, path: string): Metadata {
  const url = `/${locale}/${path}`;
  const image = { url: `/og-${locale}.png`, width: 1200, height: 630, alt: "Caio Barilli" };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `/en/${path}`, "pt-BR": `/pt-br/${path}` },
    },
    openGraph: {
      type: "website",
      siteName: "Caio Barilli",
      locale: locale === "en" ? "en_US" : "pt_BR",
      url,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** generateMetadata for a section page: its own title and description, from UI strings that already exist. */
export function sectionMetadata(titleKey: string, descriptionKey: string, path: string) {
  return async ({ params }: Params): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    return pageMetadata(locale, `${str(locale, titleKey)} · Caio Barilli`, str(locale, descriptionKey), path);
  };
}
