// Résumé PDFs (pt-br and en) built from src/content/site.json, so they never drift from the site.
// No new text lives here: only the layout, the project order and which sections go in. Run: node scripts/cv.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const site = JSON.parse(readFileSync("src/content/site.json", "utf8"));
const SITE = "caiobarilli.github.io"; // same host as SITE_URL in src/app/page-meta.ts
const PROJECTS = ["keeptask", "aws-terraform", "phparrot", "phporto", "uvalab"];
const LANGS = [
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

function project(slug, key, ui, { stack = true } = {}) {
  const p = site.projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Project "${slug}" is missing in site.json`);
  return `<div class="item">
    <div class="row"><h3>${esc(loc(p.name, key))}</h3><span class="meta">${esc(loc(p.type, key))} · ${esc(loc(p.status, key))}</span></div>
    <p>${esc(loc(p.desc, key))}</p>
    ${p.role ? `<p class="role">${esc(loc(p.role, key))}</p>` : ""}
    ${stack ? `<p class="stack">${esc(p.stack.join(" · "))}</p>` : ""}
  </div>`;
}

function build({ key, html }) {
  const ui = site.ui[key];
  const email = contact("E-mail");
  const linkedin = contact("LinkedIn");
  const github = contact("GitHub");
  const name = "Caio Barilli";

  const experience = site.experience
    .map(
      (e) => `<div class="item">
    <div class="row"><h3>${esc(loc(e.role, key))} · ${esc(e.company.name)}</h3><span class="meta">${esc(loc(e.period, key))} · ${esc(loc(e.kind, key))}</span></div>
    <p>${esc(loc(e.summary, key))}</p>
    <p class="stack">${esc(e.keys.join(" · "))}</p>
  </div>`,
    )
    .join("");

  const education = site.education
    .map(
      (ed) => `<div class="item">
    <div class="row"><h3>${esc(loc(ed.title, key))} · ${esc(ed.school)}</h3><span class="meta">${esc(ed.period)}</span></div>
    ${ed.school === "FIAP" ? project("info4all", key, ui, { stack: false }) : ""}
  </div>`,
    )
    .join("");

  const certificates = site.courses
    .filter((c) => c.certificate)
    .map((c) => `<li><span>${esc(c.name)} · ${esc(c.issuer)}</span><span class="meta">${esc(loc(c.date, key))}</span></li>`)
    .join("");

  return `<!doctype html>
<html lang="${html}"><head><meta charset="utf-8"><title>${esc(name)} · ${esc(ui.role)}</title>
<style>
  @page { size: A4; margin: 13mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 9.2pt/1.38 "Segoe UI", Arial, Helvetica, sans-serif; color: #1a1d1a; }
  h1 { margin: 0; font-size: 22pt; letter-spacing: -0.02em; }
  h2 { margin: 11px 0 5px; padding-bottom: 2px; border-bottom: 1px solid #bbb; font-size: 10.5pt; letter-spacing: 0.01em; }
  h3 { margin: 0; font-size: 9.6pt; }
  p { margin: 2px 0 0; }
  a { color: inherit; text-decoration: none; }
  .role-line { margin-top: 2px; font-size: 11pt; color: #444; }
  .links { margin-top: 4px; color: #333; }
  .row { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
  .meta { flex: none; font-size: 8.4pt; color: #555; text-align: right; }
  .item { margin-top: 6px; break-inside: avoid; }
  .item .item { margin-top: 3px; padding-left: 10px; border-left: 2px solid #ccc; }
  /* Education stays whole on one page, title included. */
  .edu { break-inside: avoid; }
  h2 { break-after: avoid; }
  .stack { font-size: 8.4pt; color: #555; }
  .role { font-style: italic; }
  ul { margin: 0; padding: 0; list-style: none; }
  li { display: flex; justify-content: space-between; gap: 12px; margin-top: 2px; }
</style></head><body>
<h1>${esc(name)}</h1>
<div class="role-line">${esc(ui.role)}</div>
<div class="links"><a href="${esc(email.url)}">${esc(email.handle)}</a> · <a href="${esc(linkedin.url)}">${esc(linkedin.handle)}</a> · <a href="${esc(github.url)}">${esc(github.handle)}</a> · <a href="https://${SITE}">${SITE}</a></div>
<h2>${esc(ui.aboutTitle)}</h2>
<p>${esc(ui.cvSummary)}</p>
<h2>${esc(ui.expTitle)}</h2>${experience}
<h2>${esc(ui.projectsTitle)}</h2>${PROJECTS.map((slug) => project(slug, key, ui)).join("")}
<section class="edu"><h2>${esc(ui.eduTitle)}</h2>${education}</section>
<h2>${esc(ui.coursesTitle)}</h2><ul>${certificates}</ul>
</body></html>`;
}

mkdirSync("public/cv", { recursive: true });
const browser = await chromium.launch();
try {
  for (const lang of LANGS) {
    const page = await browser.newPage();
    await page.setContent(build(lang), { waitUntil: "load" });
    // No header/footer: Chromium would print the page address and date there.
    const pdf = await page.pdf({
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      printBackground: false,
      tagged: true, // structure tree for ATS and screen readers
      outline: true,
    });
    writeFileSync(lang.file, pdf);
    console.log(`${lang.file} (${pdf.length} bytes)`);
    await page.close();
  }
} finally {
  await browser.close();
}
