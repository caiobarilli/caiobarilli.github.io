import data from "./site.json";
import { locales, type Locale, type Localized, type Project, type SiteContent } from "./types";

const site = data as SiteContent;

/** Single entry point for content: pages read through here, never from the JSON directly. */
export function getContent(): SiteContent {
  return site;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Route locale ("pt-br") to the key the content uses ("pt"). */
export function contentKey(locale: Locale): keyof Localized {
  return locale === "en" ? "en" : "pt";
}

export function localize(text: Localized, locale: Locale): string {
  return text[contentKey(locale)];
}

export function ui(locale: Locale) {
  return getContent().ui[contentKey(locale)];
}

/** UI string by key; throws at build time if a key is missing or not text. */
export function str(locale: Locale, key: string): string {
  const value = ui(locale)[key];
  if (typeof value !== "string") throw new Error(`Missing UI string "${key}" for ${locale}`);
  return value;
}

export function navLabel(locale: Locale, key: string): string {
  const nav = ui(locale).nav;
  if (!nav || typeof nav !== "object" || Array.isArray(nav) || typeof nav[key] !== "string") {
    throw new Error(`Missing nav label "${key}" for ${locale}`);
  }
  return nav[key];
}

/** GitHub repository names, which differ in case from the slugs. */
const REPOS: Record<string, string> = {
  phparrot: "PHParrot",
  phporto: "PHPorto",
  uvalab: "uvalab-sage-theme",
  mern: "MERN",
  mean: "MEAN",
  nestauth: "NestAuth",
  "nextjs-tailwind-store": "nextjs-tailwind-store",
};

export function repoUrl(project: Project): string | null {
  const name = REPOS[project.slug];
  return project.repo && name ? `https://github.com/caiobarilli/${name}` : null;
}

export function mainProjects(): Project[] {
  return getContent().projects.filter((p) => p.main);
}

export function otherProjects(): Project[] {
  return getContent().projects.filter((p) => !p.main);
}
