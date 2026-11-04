import content from "../src/content/site.json" with { type: "json" };

export const locales = ["en", "pt-br"] as const;

/** Every route of the static export, per locale. */
export const routes = [
  "",
  "projects/",
  "experience/",
  "about/",
  "contact/",
  ...content.projects.map((p) => `projects/${p.slug}/`),
];

export const featured = content.projects.filter((p) => p.main).map((p) => (typeof p.name === "string" ? p.name : p.name.en));
