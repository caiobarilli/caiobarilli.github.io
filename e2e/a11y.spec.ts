import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { locales, routes } from "./pages";

// WCAG 2.2 A and AA, checked on every page of the static export in both themes.
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const theme of ["dark", "light"] as const) {
  test.describe(`accessibility, ${theme} theme`, () => {
    test.skip(({ isMobile }) => isMobile, "the desktop run covers the same markup");

    for (const locale of locales) {
      test(`every ${locale} page has no WCAG A/AA violations`, async ({ page }) => {
        await page.addInitScript((value) => localStorage.setItem("cb-theme", value), theme);
        for (const route of routes) {
          await page.goto(`/${locale}/${route}`);
          await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
          const { violations, passes } = await new AxeBuilder({ page }).withTags(tags).analyze();
          expect(passes.length, "axe evaluated rules").toBeGreaterThan(10);
          const summary = violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target.join(" ")}`);
          expect(summary, `/${locale}/${route}`).toEqual([]);
        }
      });
    }
  });
}
