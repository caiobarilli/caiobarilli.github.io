import type { Metadata } from "next";
import { isLocale, str } from "@/content";

type Params = { params: Promise<{ locale: string }> };

/** generateMetadata for a section page: its own title and description, from UI strings that already exist. */
export function sectionMetadata(titleKey: string, descriptionKey: string) {
  return async ({ params }: Params): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    return { title: `${str(locale, titleKey)} · Caio Barilli`, description: str(locale, descriptionKey) };
  };
}
