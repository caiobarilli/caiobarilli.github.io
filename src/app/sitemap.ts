import type { MetadataRoute } from "next";
import { getContent } from "@/content";
import { SITE_URL } from "./page-meta";

export const dynamic = "force-static";

/** Every page in both languages, built from the content, so a new project is listed on its own. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "projects/", "experience/", "about/", "contact/", ...getContent().projects.map((p) => `projects/${p.slug}/`)];
  return paths.map((path) => ({
    url: `${SITE_URL}/en/${path}`,
    alternates: { languages: { en: `${SITE_URL}/en/${path}`, "pt-BR": `${SITE_URL}/pt-br/${path}` } },
  }));
}
