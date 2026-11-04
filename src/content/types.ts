export const locales = ["en", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Text in both languages, keyed the way the content source stores it. */
export type Localized = { en: string; pt: string };

export type CategoryId = "all" | "php" | "devops" | "ai" | "ts";

export type Category = { id: CategoryId; en: string; pt: string };

export type Adr = { id: string; title: Localized; body: Localized };

export type Shot = { file: string; caption: Localized; alt: Localized };

export type Project = {
  slug: string;
  name: string;
  cats: Exclude<CategoryId, "all">[];
  main: boolean;
  repo: boolean;
  demo: boolean;
  /** Public product site, when the code itself is private. */
  site?: string;
  /** Course the project was built in. */
  course?: Course;
  /** Extra links shown with the repository (related repos, design files). */
  links?: { label: Localized; url: string }[];
  /** Big numbers shown under the header. */
  highlights?: Highlight[];
  /** Feature groups for the larger case studies. */
  features?: FeatureGroup[];
  tag: Localized;
  year: string;
  type: Localized;
  status: Localized;
  stack: string[];
  shot: string;
  desc: Localized;
  problem: Localized;
  solution: Localized;
  adrs: Adr[];
  shots: Shot[];
};

/** A big number; per language when the format differs (e.g. "~2,000" in English, "~2.000" in Portuguese). */
export type Highlight = { value: string | Localized; label: Localized };

export type FeatureGroup = { title: Localized; items: Localized[] };

export type Article = { date: Localized; title: Localized; summary: Localized; url: string };

export type Experience = {
  period: Localized;
  role: Localized;
  company: { name: string; url: string };
  kind: Localized;
  summary: Localized;
  keys: string[];
};

export type Education = { period: string; title: Localized; school: string };

export type Course = {
  name: string;
  url: string;
  /** Platform or school that issued it. */
  issuer?: string;
  /** Completion date, already formatted per language. */
  date?: Localized;
  /** True when url points to a verifiable certificate, not just the course page. */
  certificate?: boolean;
};

export type Contact = { label: string; handle: string; url: string; pending: boolean };

export type Step = { n: string; title: string; body: string };

/** UI strings; every locale must have the same keys (checked in tests). */
export type UiStrings = Record<string, string | Record<string, string> | Step[]>;

export type SiteContent = {
  ui: { en: UiStrings; pt: UiStrings };
  cats: Category[];
  stack: string[];
  projects: Project[];
  articles: Article[];
  experience: Experience[];
  contacts: Contact[];
  education: Education[];
  courses: Course[];
};
