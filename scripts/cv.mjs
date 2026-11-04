// Résumé PDFs (pt-br and en). The HTML comes from scripts/cv-html.mjs. Run: node scripts/cv.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { build, LANGS } from "./cv-html.mjs";

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
