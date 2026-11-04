import { expect, test } from "@playwright/test";
import { featured, locales, routes } from "./pages";

test.describe("routing", () => {
  test("the root sends an English browser to /en/", async ({ browser }) => {
    const context = await browser.newContext({ locale: "en-US" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/$/);
    await context.close();
  });

  test("the root sends a Portuguese browser to /pt-br/", async ({ browser }) => {
    const context = await browser.newContext({ locale: "pt-BR" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/pt-br\/$/);
    await context.close();
  });

  for (const locale of locales) {
    test(`every ${locale} page answers 200 with the right lang`, async ({ page }) => {
      for (const route of routes) {
        const response = await page.goto(`/${locale}/${route}`);
        expect(response?.status(), route).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale === "en" ? "en" : "pt-BR");
        await expect(page.locator("main h1").first(), route).toBeVisible();
      }
    });
  }

  test("an unknown page shows the 404", async ({ page }) => {
    const response = await page.goto("/en/this-page-does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });

  test("an unknown page under /pt-br/ shows the 404 in Portuguese", async ({ page }) => {
    const response = await page.goto("/pt-br/projects/this-page-does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Página não encontrada" })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.getByRole("link", { name: "Voltar ao início" })).toHaveAttribute("href", "/pt-br/");
  });
});

test.describe("home", () => {
  test("shows the featured projects in the chosen order", async ({ page }) => {
    await page.goto("/en/");
    const titles = page.locator("section[aria-labelledby=h-featured] article h3");
    await expect(titles).toHaveText(featured);
  });

  test("the hero links to the projects page", async ({ page }) => {
    await page.goto("/en/");
    await page.getByRole("link", { name: "See the work" }).click();
    await expect(page).toHaveURL(/\/en\/projects\/$/);
  });
});

test.describe("header", () => {
  test("the language switch keeps the current page", async ({ page }) => {
    await page.goto("/en/about/");
    await page.getByRole("link", { name: "PT", exact: true }).click();
    await expect(page).toHaveURL(/\/pt-br\/about\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "Sobre" })).toBeVisible();
  });

  test("the theme switch flips the theme and survives a reload", async ({ page }) => {
    await page.goto("/en/");
    const html = page.locator("html");
    const before = await html.getAttribute("data-theme");
    await page.getByRole("button", { name: "Switch theme" }).click();
    const after = before === "light" ? "dark" : "light";
    await expect(html).toHaveAttribute("data-theme", after);
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", after);
  });

  test("the chosen theme survives a language switch", async ({ page }) => {
    await page.goto("/pt-br/projects/");
    const html = page.locator("html");
    await page.evaluate(() => localStorage.setItem("cb-theme", "light"));
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.getByRole("link", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/projects\/$/);
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("the mobile menu opens and navigates", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the menu button only exists on small screens");
    await page.goto("/en/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.locator("#mobile-nav").getByRole("link", { name: "Experience" }).click();
    await expect(page).toHaveURL(/\/en\/experience\/$/);
  });
});

test.describe("projects", () => {
  test("the TypeScript filter shows only TypeScript projects", async ({ page }) => {
    await page.goto("/en/projects/");
    await page.getByRole("button", { name: "TypeScript", exact: true }).click();
    await expect(page.getByText(/^\d+ projects$/)).toHaveText("4 projects");
  });

  test("the card image and title open the case study", async ({ page }) => {
    await page.goto("/en/projects/");
    await page.getByRole("heading", { name: "PHPorto" }).getByRole("link").click();
    await expect(page).toHaveURL(/\/en\/projects\/phporto\/$/);
  });

  test("the product and source links sit in the page header, above the case study", async ({ page }) => {
    await page.goto("/en/projects/keeptask/");
    const header = page.locator("article > header");
    await expect(header.getByRole("link", { name: "Product site ↗" })).toHaveAttribute("href", "https://keeptask.io");
    await page.goto("/en/projects/phporto/");
    await expect(header.getByRole("link", { name: "Source on GitHub ↗" })).toHaveAttribute("href", /^https:\/\/github\.com\/caiobarilli\//);
  });

  test("the lightbox opens, moves with the arrows and closes with Esc", async ({ page }) => {
    await page.goto("/en/projects/keeptask/");
    const dialog = page.getByRole("dialog");
    await page.getByRole("button", { name: /^Expand image:/ }).first().click();
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(/1 \/ \d+/);
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText(/2 \/ \d+/);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
