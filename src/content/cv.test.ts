import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { build, LANGS } from "../../scripts/cv-html.mjs";
import { getContent } from "./index";

// Text extraction is what an ATS does (pdftotext, from poppler). Without it on the PATH the reading-order test is skipped.
const pdfText = (file: string) => execFileSync("pdftotext", ["-enc", "UTF-8", file, "-"], { encoding: "utf8" }).replace(/\s+/g, " ");
const hasPdftotext = !spawnSync("pdftotext", ["-v"]).error;

// The PDFs come from `node scripts/cv.mjs` (rerun it whenever site.json changes).
const localizeCompany = (c: string | { en: string; pt: string }, key: string) => (typeof c === "string" ? c : c[key as "en" | "pt"]);

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

describe.each(LANGS.map((l) => [l.locale, l] as const))("CV reading order in %s", (_locale, lang) => {
  const site = getContent();
  const earlier = site.earlierExperience.map((e) => ({
    role: e.role[lang.key as "en" | "pt"],
    company: e.company ? localizeCompany(e.company, lang.key) : undefined,
    period: e.period,
    note: e.note?.[lang.key as "en" | "pt"],
  }));

  it.skipIf(!hasPdftotext)("puts each education period right after the course and school", () => {
    const text = pdfText(lang.file);
    const ui = site.ui[lang.key as "en" | "pt"] as Record<string, string>;
    let from = text.indexOf(ui.eduTitle ?? "");
    expect(from).toBeGreaterThanOrEqual(0);
    for (const ed of site.education) {
      const head = `${localizeCompany(ed.title, lang.key)} · ${localizeCompany(ed.school, lang.key)} · ${ed.period}`;
      const at = text.indexOf(head, from);
      expect(at, `"${head}" in order`).toBeGreaterThanOrEqual(from);
      from = at + head.length;
    }
  });

  it.skipIf(!hasPdftotext)("keeps role, company, period and note together, in that order, in each earlier job", () => {
    const text = pdfText(lang.file);
    let from = text.indexOf((site.ui[lang.key as "en" | "pt"] as Record<string, string>).earlierTitle ?? "");
    expect(from).toBeGreaterThanOrEqual(0);
    for (const e of earlier) {
      const head = [e.role, e.company, e.period].filter(Boolean).join(" · ");
      const at = text.indexOf(head, from);
      expect(at, `"${head}" in order`).toBeGreaterThanOrEqual(from);
      const end = at + head.length;
      if (e.note) expect(text.slice(end, end + e.note.length + 3)).toContain(e.note);
      from = end;
    }
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
    const names = site.courses.filter((c) => c.cv).map((c) => (typeof c.name === "string" ? c.name : c.name[lang.key as "en" | "pt"]));
    expect(names).toHaveLength(4);
    const items = (html.split(`<h2>${ui.coursesTitle}</h2>`)[1] ?? "").match(/<li>/g) ?? [];
    expect(items).toHaveLength(4);
    for (const n of names) expect(html).toContain(n);
  });

  it("lists AWS, PHParrot, PHPorto and Uvalab as projects, without Keeptask (it is under Experience)", () => {
    const section = (html.split(`<h2>${ui.projectsTitle}</h2>`)[1] ?? "").split("<section")[0] ?? "";
    const names = [...section.matchAll(/<h3>(.*?)<\/h3>/g)].map((m) => m[1]);
    expect(names).toEqual([lang.key === "en" ? "AWS platform with Terraform" : "Plataforma AWS com Terraform", "PHParrot", "PHPorto", "Uvalab"]);
    expect(section).not.toContain("Keeptask");
  });

  it.runIf(lang.key === "en")("has no loose Portuguese in the English résumé", () => {
    for (const t of ["Cloud Computing — AWS Discovery Day", "Advanced Web Development with PHP, Laravel and Vue.js", "WordPress Theme Development with WooCommerce", "Building Quality CRUDs", "FIAP (Brazilian technology university)", "Senac (Brazilian technical college)", "364 hours", "CTC (formerly Interaktiv)", "a Brazilian accounting startup"]) {
      expect(html).toContain(t);
    }
    for (const t of ["Computação", "Criação de Temas", "Como criar", "antiga", "364 h<"]) expect(html).not.toContain(t);
  });

  it("leaves out the KeepCloud details text, which repeats the highlights", () => {
    const kc = site.experience[0];
    expect(kc?.details).toBeTruthy();
    expect(html).not.toContain(kc!.details![lang.key as "en" | "pt"]);
    for (const h of kc!.highlights!) expect(html).toContain(h[lang.key as "en" | "pt"]);
  });

  it("shows the location line only when the language has one", () => {
    expect(html.includes("Based in São Paulo")).toBe(lang.key === "en");
  });
});
