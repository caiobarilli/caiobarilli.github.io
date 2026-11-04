import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { build, LANGS } from "../../scripts/cv-html.mjs";
import { getContent } from "./index";

// The PDFs come from `node scripts/cv.mjs` (rerun it whenever site.json changes).
describe.each(["pt-br", "en"])("CV in %s", (locale) => {
  const file = `public/cv/caio-barilli-cv-${locale}.pdf`;

  it("exists", () => {
    expect(existsSync(file)).toBe(true);
  });

  it("is tagged, with a structure tree and headings", () => {
    const pdf = readFileSync(file).toString("latin1");
    expect(pdf).toMatch(/\/MarkInfo\s*<<[^>]*\/Marked\s+true/);
    expect(pdf).toMatch(/\/StructTreeRoot\s+\d+\s+0\s+R/);
    expect(pdf).toMatch(/\/S\s*\/H1\b/);
  });

  it("has at most 2 pages and carries no local path", () => {
    const pdf = readFileSync(file).toString("latin1");
    const pages = pdf.match(/\/Type\s*\/Page[^s]/g) ?? [];
    expect(pages.length).toBeGreaterThanOrEqual(1);
    expect(pages.length).toBeLessThanOrEqual(2);
    expect(pdf).not.toMatch(/[A-Za-z]:\|\/Users\/|\/home\//);
  });
});

describe.each(LANGS.map((l) => [l.locale, l] as const))("CV page in %s", (_locale, lang) => {
  const site = getContent();
  const ui = site.ui[lang.key] as Record<string, string>;
  const html = build(lang) as string;
  const h2 = [...html.matchAll(/<h2>(.*?)<\/h2>/g)].map((m) => m[1]);

  it("uses the résumé title for the headline and the document title", () => {
    expect(html).toContain(`<div class="role-line">${ui.cvTitle}</div>`);
    expect(html).toContain(`<title>Caio Barilli · ${ui.cvTitle}</title>`);
    expect(html).toMatch(/<h1>Caio Barilli<\/h1>/);
  });

  it("orders the sections: summary, skills, experience, earlier, projects, education, courses", () => {
    expect(h2).toEqual([ui.cvSummaryTitle, ui.cvSkillsTitle, ui.expTitle, ui.earlierTitle, ui.projectsTitle, ui.eduTitle, ui.coursesTitle]);
    expect(html).toContain(ui.cvSkills);
  });

  it("lists only the 4 résumé courses", () => {
    const names = site.courses.filter((c) => c.cv).map((c) => c.name);
    expect(names).toHaveLength(4);
    const items = (html.split(`<h2>${ui.coursesTitle}</h2>`)[1] ?? "").match(/<li>/g) ?? [];
    expect(items).toHaveLength(4);
    for (const n of names) expect(html).toContain(n);
  });

  it("shows the location line only when the language has one", () => {
    expect(html.includes("Based in São Paulo")).toBe(lang.key === "en");
  });
});
