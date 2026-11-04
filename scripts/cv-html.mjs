// Résumé HTML (pt-br and en) built from src/content/site.json, so they never drift from the site.
// No new text lives here: only the layout, the project order and which sections go in. Printed to PDF by scripts/cv.mjs.
import { readFileSync } from "node:fs";

const site = JSON.parse(readFileSync("src/content/site.json", "utf8"));
const SITE = "caiobarilli.github.io"; // same host as SITE_URL in src/app/page-meta.ts
const PROJECTS = ["aws-terraform", "phparrot", "phporto", "uvalab"];
export const LANGS = [
  { locale: "pt-br", key: "pt", file: "public/cv/caio-barilli-cv-pt-br.pdf", html: "pt-BR" },
  { locale: "en", key: "en", file: "public/cv/caio-barilli-cv-en.pdf", html: "en" },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const loc = (v, key) => (typeof v === "string" ? v : v[key]);

function contact(label) {
  const c = site.contacts.find((x) => x.label === label && !x.pending);
  if (!c) throw new Error(`Contact "${label}" is missing in site.json`);
  return c;
}

// One compact block per project: name, type and status in the title line, then the description. No stack (the skills line covers it).
function project(slug, key, { desc = true } = {}) {
  const p = site.projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Project "${slug}" is missing in site.json`);
  return `<div class="item">
    <h3>${esc(loc(p.name, key))} · <span class="meta">${esc(loc(p.type, key))} · ${esc(loc(p.status, key))}</span></h3>
    ${desc ? `<p>${esc(loc(p.desc, key))}</p>` : ""}
  </div>`;
}

export function build({ key, html }) {
  const ui = site.ui[key];
  const email = contact("E-mail");
  const linkedin = contact("LinkedIn");
  const github = contact("GitHub");
  const name = "Caio Barilli";

  const experience = site.experience
    .map(
      (e) => `<div class="item">
    <div class="row"><h3>${esc(loc(e.role, key))} · ${esc(e.company.name)}</h3><span class="meta">${esc(loc(e.period, key))} · ${esc(loc(e.kind, key))}</span></div>
    ${e.summary ? `<p>${esc(loc(e.summary, key))}</p>` : ""}
    ${e.highlights ? `<ul class="points">${e.highlights.map((h) => `<li>${esc(loc(h, key))}</li>`).join("")}</ul>` : ""}
  </div>`,
    )
    .join("");

  const earlier = site.earlierExperience
    .map(
      (e) => `<li><div class="line">${esc(loc(e.role, key))}${e.company ? ` · ${esc(loc(e.company, key))}` : ""} · <span class="meta">${esc(e.period)}</span></div></li>`,
    )
    .join("");

  const education = site.education
    .map(
      (ed) => `<div class="item">
    <h3>${esc(loc(ed.title, key))} · ${esc(loc(ed.school, key))} · <span class="meta">${esc(ed.period)}</span></h3>
    ${loc(ed.school, "pt") === "FIAP" ? project("info4all", key, { desc: false }) : ""}
  </div>`,
    )
    .join("");


  return `<!doctype html>
<html lang="${html}"><head><meta charset="utf-8"><title>${esc(name)} · ${esc(ui.cvTitle)}</title>
<style>
  @page { size: A4; margin: 11mm 14mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 9.2pt/1.32 "Segoe UI", Arial, Helvetica, sans-serif; color: #1a1d1a; }
  h1 { margin: 0; font-size: 22pt; letter-spacing: -0.02em; }
  h2 { margin: 9px 0 4px; padding-bottom: 2px; border-bottom: 1px solid #bbb; font-size: 10.5pt; letter-spacing: 0.01em; }
  h3 { margin: 0; font-size: 9.6pt; }
  p { margin: 2px 0 0; }
  a { color: inherit; text-decoration: none; }
  .role-line { margin-top: 2px; font-size: 11pt; color: #444; }
  .links { margin-top: 4px; color: #333; }
  .row { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
  .meta { flex: none; font-size: 8.4pt; font-weight: 400; color: #555; text-align: right; }
  .item { margin-top: 5px; break-inside: avoid; }
  .item .item { margin-top: 3px; padding-left: 10px; border-left: 2px solid #ccc; }
  /* Education stays whole on one page, title included. */
  .edu { break-inside: avoid; }
  h2 { break-after: avoid; }
  .stack { font-size: 8.4pt; color: #555; }
  .role { font-style: italic; }
  ul { margin: 0; padding: 0; list-style: none; }
  /* Dates sit right after the title in the same line: a right-aligned date is read as a separate column by text extractors (ATS). */
  li { margin-top: 1px; }
  .points { margin-top: 2px; padding-left: 14px; }
  .points li { list-style: disc; }
</style></head><body>
<h1>${esc(name)}</h1>
<div class="role-line">${esc(ui.cvTitle)}</div>
<div class="links"><a href="${esc(email.url)}">${esc(email.handle)}</a> · <a href="${esc(linkedin.url)}">${esc(linkedin.handle)}</a> · <a href="${esc(github.url)}">${esc(github.handle)}</a> · <a href="https://${SITE}">${SITE}</a></div>
${ui.cvLocation ? `<div class="links">${esc(ui.cvLocation)}</div>` : ""}
<h2>${esc(ui.cvSummaryTitle)}</h2>
<p>${esc(ui.cvSummary)}</p>
<h2>${esc(ui.cvSkillsTitle)}</h2>
<p>${esc(ui.cvSkills)}</p>
<h2>${esc(ui.expTitle)}</h2>${experience}
<h2>${esc(ui.earlierTitle)}</h2><ul class="earlier">${earlier}</ul>
<h2>${esc(ui.projectsTitle)}</h2>${PROJECTS.map((slug) => project(slug, key)).join("")}
<section class="edu"><h2>${esc(ui.eduTitle)}</h2>${education}</section>
</body></html>`;
}
