import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// The PDFs come from `node scripts/cv.mjs` (rerun it whenever site.json changes).
describe.each(["pt-br", "en"])("CV in %s", (locale) => {
  const file = `public/cv/caio-barilli-cv-${locale}.pdf`;

  it("exists", () => {
    expect(existsSync(file)).toBe(true);
  });

  it("has at most 2 pages and carries no local path", () => {
    const pdf = readFileSync(file).toString("latin1");
    const pages = pdf.match(/\/Type\s*\/Page[^s]/g) ?? [];
    expect(pages.length).toBeGreaterThanOrEqual(1);
    expect(pages.length).toBeLessThanOrEqual(2);
    expect(pdf).not.toMatch(/[A-Za-z]:\|\/Users\/|\/home\//);
  });
});
