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

  test("the 404 has the site header, and its language switch keeps the address", async ({ page }) => {
    await page.goto("/pt-br/projects/this-page-does-not-exist/");
    const header = page.locator("header");
    await expect(header.getByRole("link", { name: /caio\.barilli/ })).toHaveAttribute("href", "/pt-br/");
    await expect(header.getByRole("link", { name: "EN", exact: true })).toHaveAttribute("href", "/en/projects/this-page-does-not-exist/");
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

  test("the hero has an e-mail and a LinkedIn link", async ({ page }) => {
    await page.goto("/en/");
    const hero = page.locator("main section").first();
    await expect(hero.getByRole("link", { name: "E-mail" })).toHaveAttribute("href", /^mailto:/);
    await expect(hero.getByRole("link", { name: "LinkedIn ↗" })).toHaveAttribute("href", "https://www.linkedin.com/in/caio-barilli");
  });

  test("pages carry a link preview, and the sitemap and robots exist", async ({ page, request }) => {
    const pages: [string, string][] = [["/pt-br/projects/keeptask/", "og-pt-br.png"], ["/en/", "og-en.png"]];
    for (const [path, image] of pages) {
      await page.goto(path);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `https://caiobarilli.github.io/${image}`);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://caiobarilli.github.io${path}`);
    }
    const root = await (await request.get("/index.html")).text();
    expect(root).toContain('property="og:image" content="https://caiobarilli.github.io/og-en.png"');
    for (const file of ["/og-en.png", "/og-pt-br.png", "/icon.svg", "/apple-icon.png", "/robots.txt"]) {
      expect((await request.get(file)).status(), file).toBe(200);
    }
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("https://caiobarilli.github.io/en/projects/info4all/");
  });

  test("the home title carries the role, numbers follow the language and articles say they are in Portuguese", async ({ page }) => {
    await page.goto("/en/");
    await expect(page).toHaveTitle("Caio Barilli · PHP & Laravel Engineer");
    await expect(page.getByText("Sep 4, 2026 · In Portuguese")).toBeVisible();
    await page.goto("/pt-br/");
    await expect(page.getByText("4 set 2026", { exact: true })).toBeVisible();
    await page.goto("/pt-br/projects/keeptask/");
    await expect(page.getByText("~2.000", { exact: true })).toBeVisible();
    await page.goto("/en/projects/keeptask/");
    await expect(page.getByText("~2,000", { exact: true })).toBeVisible();
  });

  test("the static 404 never links to the internal _not-found route", async ({ request }) => {
    const html = await (await request.get("/404.html")).text();
    expect(html).not.toContain('href="/_not-found');
  });

  test("every section page has its own title", async ({ page }) => {
    const titles = new Set<string>();
    for (const path of ["/pt-br/", "/pt-br/projects/", "/pt-br/experience/", "/pt-br/about/", "/pt-br/contact/"]) {
      await page.goto(path);
      titles.add(await page.title());
    }
    expect(titles.size).toBe(5);
    await page.goto("/pt-br/projects/");
    await expect(page).toHaveTitle("Projetos · Caio Barilli");
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

  test("a tap on the lightbox image zooms it in and out", async ({ page }) => {
    await page.goto("/en/projects/keeptask/");
    await page.getByRole("button", { name: /^Expand/ }).first().click();
    const dialog = page.getByRole("dialog");
    const box = dialog.locator("[data-zoomed]");
    const img = box.locator("img");
    const before = (await img.boundingBox())?.width ?? 0;
    await img.click();
    await expect(box).toHaveAttribute("data-zoomed", "true");
    expect((await img.boundingBox())?.width ?? 0).toBeGreaterThan(before * 1.5);
    await img.click();
    await expect(box).toHaveAttribute("data-zoomed", "false");
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
