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

  test("the hero has an e-mail button and a LinkedIn link", async ({ page }) => {
    await page.goto("/en/");
    const hero = page.locator("main section").first();
    await expect(hero.getByRole("button", { name: "E-mail" }).or(hero.getByRole("link", { name: "E-mail" }))).toHaveCount(1);
    await expect(hero.getByRole("link", { name: "LinkedIn ↗" })).toHaveAttribute("href", "https://www.linkedin.com/in/caio-barilli");
  });

  const emailPages: [string, string][] = [["/en/", "Copied!"]];
  for (const [path, copied] of emailPages) {
    test(`the e-mail button on ${path} copies the address on desktop and is a mailto: link on a phone`, async ({ page, context, isMobile }) => {
      await page.goto(path);
      if (isMobile) {
        const link = page.getByRole("link", { name: "E-mail", exact: true });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", "mailto:caiobarilli@gmail.com");
        await expect(page.getByRole("button", { name: "E-mail", exact: true })).toHaveCount(0);
        return;
      }
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      const button = page.getByRole("button", { name: "E-mail", exact: true });
      const done = page.getByRole("button", { name: copied });
      await expect(button).toBeVisible();
      await expect(page.getByRole("link", { name: "E-mail", exact: true })).toHaveCount(0);
      // The page is static: retry the click until React has hydrated the handler.
      await expect(async () => {
        await button.click();
        await expect(page.locator("[aria-live=polite]").first()).toHaveText(copied, { timeout: 500 });
      }).toPass();
      await expect(done).toBeVisible();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("caiobarilli@gmail.com");
      await expect(button).toBeVisible({ timeout: 4000 });
      await expect(page.locator("[aria-live=polite]").first()).toHaveText("");
    });
  }

  test("the contact page links each language to its own résumé PDF, above the e-mail row and only once", async ({ page, request }) => {
    const links: [string, string, string][] = [
      ["/en/contact/", "Download résumé", "/cv/caio-barilli-cv-en.pdf"],
      ["/pt-br/contact/", "Baixar currículo", "/cv/caio-barilli-cv-pt-br.pdf"],
    ];
    for (const [path, name, file] of links) {
      await page.goto(path);
      const link = page.getByRole("link", { name: `${name} PDF`, exact: true });
      await expect(link).toHaveAttribute("href", file);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).not.toHaveAttribute("download");
      await expect(page.locator('a[href^="/cv/"]')).toHaveCount(1);
      expect((await request.get(file)).status()).toBe(200);
      const cv = await link.boundingBox();
      const mail = await page.getByText("caiobarilli@gmail.com", { exact: true }).locator("visible=true").boundingBox();
      expect(cv!.y + cv!.height).toBeLessThanOrEqual(mail!.y);
      expect(cv!.height).toBeGreaterThanOrEqual(44);
    }
    await page.goto("/en/");
    await expect(page.locator('a[href^="/cv/"]')).toHaveCount(0);
  });

  const contactCases: [string, string][] = [["/pt-br/contact/", "Copiado!"], ["/en/contact/", "Copied!"]];
  for (const [path, copied] of contactCases) {
    test(`on ${path} the address itself is the e-mail control, with no separate button`, async ({ page, context, isMobile }) => {
      await page.goto(path);
      const address = page.getByText("caiobarilli@gmail.com", { exact: true }).locator("visible=true");
      await expect(address).toBeVisible();
      // No standalone "E-mail" button or link: the row is the control.
      await expect(page.getByRole("button", { name: "E-mail", exact: true })).toHaveCount(0);
      await expect(page.getByRole("link", { name: "E-mail", exact: true })).toHaveCount(0);
      if (isMobile) {
        const link = page.getByRole("link", { name: /caiobarilli@gmail.com/ });
        await expect(link).toBeVisible();
        await expect(link).toContainText("↗");
        await expect(link.locator("svg")).toHaveCount(0);
        await expect(link).toHaveAttribute("href", "mailto:caiobarilli@gmail.com");
        await expect(page.getByRole("button", { name: /caiobarilli@gmail.com/ })).toHaveCount(0);
        return;
      }
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      const row = page.getByRole("button", { name: /caiobarilli@gmail.com/ });
      // Desktop: a copy icon, not the "opens a link" arrow.
      await expect(row).not.toContainText("↗");
      await expect(row.locator('svg[data-icon="copy"]')).toBeVisible();
      const before = await address.boundingBox();
      // The page is static: retry the click until React has hydrated the handler.
      await expect(async () => {
        await row.click();
        await expect(page.locator("[aria-live=polite]").first()).toHaveText(copied, { timeout: 500 });
      }).toPass();
      await expect(row.getByText(copied, { exact: true })).toBeVisible();
      await expect(row.locator('svg[data-icon="check"]')).toBeVisible();
      expect(await address.boundingBox()).toEqual(before);
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("caiobarilli@gmail.com");
      await expect(row.getByText(copied, { exact: true })).toBeHidden({ timeout: 4000 });
      expect((await row.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    });
  }

  for (const width of [375, 320]) {
    test(`on a ${width}px phone every contact address sits on one line`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "phone layout");
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/pt-br/contact/");
      for (const text of ["caiobarilli@gmail.com", "github.com/caiobarilli", "linkedin.com/in/caio-barilli", "medium.com/@caiobarilli"]) {
        const address = page.getByText(text, { exact: true }).locator("visible=true");
        await expect(address).toBeVisible();
        const lines = await address.evaluate((el) => {
          const range = document.createRange();
          range.selectNodeContents(el);
          return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
        });
        expect(lines, text).toBe(1);
        const row = await address.locator("xpath=ancestor::*[self::a or self::button][1]").boundingBox();
        expect(row!.height).toBeGreaterThanOrEqual(44);
      }
    });
  }

  test("on the contact page a blocked clipboard leaves the address selected", async ({ page, isMobile }) => {
    test.skip(isMobile, "phones use the mailto: link");
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("blocked")) } });
    });
    await page.goto("/en/contact/");
    await expect(async () => {
      await page.getByRole("button", { name: /caiobarilli@gmail.com/ }).click();
      expect(await page.evaluate(() => window.getSelection()?.toString())).toBe("caiobarilli@gmail.com");
    }).toPass();
  });

  test("when the clipboard is blocked the button shows the address", async ({ page, isMobile }) => {
    test.skip(isMobile, "phones use the mailto: link");
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("blocked")) } });
    });
    await page.goto("/en/");
    await expect(async () => {
      await page.getByRole("button", { name: "E-mail", exact: true }).click();
      await expect(page.locator("main section").first().getByRole("button", { name: "caiobarilli@gmail.com" })).toBeVisible({ timeout: 500 });
    }).toPass();
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
    await expect(page).toHaveTitle("Caio Barilli · Full Stack Engineer");
    await expect(page.getByText("Sep 4, 2026 · In Portuguese")).toBeVisible();
    await page.goto("/pt-br/");
    await expect(page.getByText("4 set 2026", { exact: true })).toBeVisible();
    await page.goto("/pt-br/projects/keeptask/");
    await expect(page.getByText("~2.000", { exact: true })).toBeVisible();
    await page.goto("/en/projects/keeptask/");
    await expect(page.getByText("~2,000", { exact: true })).toBeVisible();
  });

  test("a phone downloads the smaller copies of the screenshots", async ({ browser }) => {
    // Same screen as the Lighthouse mobile run (Moto G Power: 412px wide, 1.75x).
    const context = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true });
    const page = await context.newPage();
    await page.goto("/en/");
    const card = page.locator("section[aria-labelledby=h-featured] article img").nth(1);
    await card.scrollIntoViewIfNeeded();
    await expect.poll(() => card.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(/\/images\/projects\/w\/.+-720\.webp$/);
    await context.close();
  });

  test("the AWS project title follows the language and PHParrot shows it is still in development", async ({ page }) => {
    await page.goto("/pt-br/projects/aws-terraform/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Plataforma AWS com Terraform");
    await page.goto("/en/projects/aws-terraform/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("AWS platform with Terraform");
    await page.goto("/pt-br/projects/phparrot/");
    await expect(page.getByText("Em desenvolvimento", { exact: true })).toBeVisible();
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
  test("keyboard focus keeps a pill button round", async ({ page, isMobile }) => {
    test.skip(isMobile, "needs a keyboard");
    await page.goto("/pt-br/");
    const target = page.getByRole("link", { name: "Ver os projetos" });
    for (let i = 0; i < 20 && !(await target.evaluate((el) => el === document.activeElement)); i++) await page.keyboard.press("Tab");
    await expect(target).toBeFocused();
    const { radius, height } = await target.evaluate((el) => ({
      radius: parseFloat(getComputedStyle(el).borderTopLeftRadius),
      height: el.getBoundingClientRect().height,
    }));
    expect(radius).toBeGreaterThanOrEqual(height / 2);
  });

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

test.describe("narrow header", () => {
  test("at 320px nothing in the header passes the window and the page does not scroll sideways", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout");
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/pt-br/");
    const { rights, width, scroll } = await page.evaluate(() => ({
      rights: [...document.querySelectorAll("header a, header button")].filter((e) => (e as HTMLElement).offsetParent).map((e) => e.getBoundingClientRect().right),
      width: window.innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(rights.length).toBeGreaterThan(0);
    for (const right of rights) expect(right).toBeLessThanOrEqual(width);
    expect(scroll).toBeLessThanOrEqual(width);
  });

  for (const width of [320, 360]) {
    test(`at ${width}px the theme button lives in the open menu and switches the theme`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "phone layout");
      await page.setViewportSize({ width, height: 700 });
      await page.goto("/en/");
      await expect(page.locator("header > div").getByRole("button", { name: "Switch theme" })).toHaveCount(0);
      await page.getByRole("button", { name: "Menu" }).click();
      const button = page.locator("#mobile-nav").getByRole("button", { name: "Switch theme" });
      await expect(button).toBeVisible();
      expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      const html = page.locator("html");
      const before = await html.getAttribute("data-theme");
      const after = before === "light" ? "dark" : "light";
      await expect(async () => {
        await button.click();
        await expect(html).toHaveAttribute("data-theme", after, { timeout: 500 });
      }).toPass();
      expect(await page.evaluate(() => localStorage.getItem("cb-theme"))).toBe(after);
    });
  }

  test("at 375px the theme button stays in the header", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout");
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto("/en/");
    await expect(page.locator("header > div").getByRole("button", { name: "Switch theme" })).toBeVisible();
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.locator("#mobile-nav").getByRole("button", { name: "Switch theme" })).toHaveCount(0);
  });

  // The right gap should equal the left padding at every phone width.
  for (const width of [320, 321, 323, 360, 374, 375, 414]) {
    test(`at ${width}px the header's right gap is at least its left padding`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "phone layout");
      await page.setViewportSize({ width, height: 700 });
      await page.goto("/pt-br/");
      const { pad, gap } = await page.evaluate(() => {
        const header = document.querySelector("header > div") as HTMLElement;
        const right = Math.max(...[...header.querySelectorAll("a, button, span[aria-current]")].filter((e) => (e as HTMLElement).offsetParent).map((e) => e.getBoundingClientRect().right));
        return { pad: parseFloat(getComputedStyle(header).paddingLeft), gap: window.innerWidth - right };
      });
      expect(gap).toBeGreaterThanOrEqual(pad - 0.5);
    });
  }
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

  test("each case study link names its project", async ({ page }) => {
    await page.goto("/pt-br/projects/");
    await expect(page.getByRole("link", { name: "Ler o estudo de caso: Keeptask" })).toHaveAttribute("href", "/pt-br/projects/keeptask/");
    await page.goto("/en/");
    await expect(page.getByRole("link", { name: "Read the case study: Keeptask" })).toBeVisible();
  });

  test("the Keeptask case states the author's role, between the description and the problem", async ({ page }) => {
    await page.goto("/pt-br/projects/keeptask/");
    const role = page.getByText(/^Meu papel: do design e da arquitetura/);
    await expect(role).toBeVisible();
    await expect(role).toContainText("O deploy e a operação em produção ficaram com o time.");
    await page.goto("/en/projects/keeptask/");
    await expect(page.getByText(/^My role: from design and architecture/)).toBeVisible();
    await page.goto("/pt-br/projects/phporto/");
    await expect(page.getByText(/^Meu papel:/)).toHaveCount(0);
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

test.describe("experience", () => {
  const pages: [string, string, string, string[]][] = [
    [
      "/en/experience/",
      "Earlier experience",
      "Internship · VAD Estúdio Multimídia",
      [
        "Short contracts and freelance work (Layer Up, Zebra Deluxe, Meeta Solutions, QuikDev)",
        "Full Stack Developer · CTC (formerly Interaktiv)",
        "Front-end developer and front-end tech lead · Zebra Deluxe Comunicação",
        "Full Stack WordPress Developer · 3xceler",
        "Full Stack Developer · Shape Web",
        "Front-end developer and front-end tech lead · 123Carros",
        "Front-end developer (freelance) · WebSide",
        "Developer and tech lead · Capital Mídia",
        "Internship · VAD Estúdio Multimídia",
      ],
    ],
    [
      "/pt-br/experience/",
      "Experiência anterior",
      "Estágio · VAD Estúdio Multimídia",
      [
        "Contratos curtos e freelances (Layer Up, Zebra Deluxe, Meeta Solutions, QuikDev)",
        "Desenvolvedor Full Stack · CTC (antiga Interaktiv)",
        "Desenvolvedor front-end e líder técnico do front · Zebra Deluxe Comunicação",
        "Desenvolvedor Full Stack WordPress · 3xceler",
        "Desenvolvedor Full Stack · Shape Web",
        "Desenvolvedor front-end e líder técnico do front · 123Carros",
        "Desenvolvedor front-end (freelance) · WebSide",
        "Programador e líder técnico · Capital Mídia",
        "Estágio · VAD Estúdio Multimídia",
      ],
    ],
  ];
  for (const [path, title, last, titles] of pages) {
    test(`${path} lists the 9 earlier jobs after the main ones, and Layer Up is not a main job`, async ({ page }) => {
      await page.goto(path);
      const items = page.getByTestId("earlier-experience").locator("> li");
      await expect(items).toHaveCount(9);
      await expect(items.last()).toContainText(last);
      expect(await items.locator("span.font-semibold").allTextContents()).toEqual(titles);
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      // The main timeline is the <ol>: only KeepCloud and AgroNegociar.
      const main = page.locator("main ol > li");
      await expect(main).toHaveCount(2);
      await expect(main.filter({ hasText: "Layer Up" })).toHaveCount(0);
      // Compact: no links inside the section.
      await expect(page.getByTestId("earlier-experience").locator("a")).toHaveCount(0);
      const order = await page.locator("main h2").allTextContents();
      expect(order.indexOf(title)).toBeGreaterThan(0);
    });

    test(`${path} keeps each earlier job in one block: title, then period, then note`, async ({ page }) => {
      await page.goto(path);
      const items = page.getByTestId("earlier-experience").locator("> li");
      for (const li of await items.all()) {
        const text = ((await li.textContent()) ?? "").replace(/s+/g, " ");
        const period = (await li.locator("span.font-mono").textContent()) ?? "";
        const title = ((await li.locator("span.font-semibold").textContent()) ?? "").replace(/s+/g, " ");
        expect(text.startsWith(title + period)).toBe(true);
      }
    });
  }
});

test.describe("experience, KeepCloud", () => {
  const cases: [string, string, string][] = [
    ["/en/experience/", "Remote", "Built Keeptask, a B2B task and project management platform"],
    ["/pt-br/experience/", "Remoto", "Construí o Keeptask, plataforma B2B de gestão de tarefas e projetos"],
  ];
  for (const [path, mode, lead] of cases) {
    test(`${path} says remote and opens with the Keeptask line`, async ({ page }) => {
      await page.goto(path);
      const job = page.locator("main ol > li").first();
      await expect(job).toContainText(`KeepCloud ↗ · ${mode}`);
      await expect(job.locator("p").first()).toHaveText(new RegExp(`^${lead}`));
      await expect(job.getByTestId("experience-highlights").locator("li")).toHaveCount(3);
    });
  }
});

test.describe("about", () => {
  const cases: [string, string][] = [
    ["/en/about/", "I started as an intern in 2013"],
    ["/pt-br/about/", "Comecei como estagiário em 2013"],
  ];
  for (const [path, start] of cases) {
    test(`${path} opens the story at 2013, not repeating the years in the intro`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByText(start, { exact: false })).toBeVisible();
      await expect(page.getByText(/dez anos|ten years/)).toHaveCount(0);
    });
  }
});
