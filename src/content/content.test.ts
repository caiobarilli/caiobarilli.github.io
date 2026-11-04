import { describe, expect, it } from "vitest";
import { contentKey, getContent, isLocale, localize, mainProjects, otherProjects, str } from "./index";

const content = getContent();

describe("content", () => {
  it("has the same UI keys in every language", () => {
    expect(Object.keys(content.ui.pt).sort()).toEqual(Object.keys(content.ui.en).sort());
  });

  it("has both languages filled in every localized field", () => {
    const empty: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${path}[${i}]`));
      if (value && typeof value === "object") {
        const obj = value as Record<string, unknown>;
        if ("en" in obj && "pt" in obj && typeof obj.en === "string") {
          if (!obj.en || !obj.pt) empty.push(path);
          return;
        }
        Object.entries(obj).forEach(([k, v]) => walk(v, `${path}.${k}`));
      }
    };
    walk({ ...content, ui: undefined }, "content");
    expect(empty).toEqual([]);
  });

  it("keeps the featured projects in the chosen order", () => {
    expect(mainProjects().map((p) => p.slug)).toEqual(["keeptask", "info4all", "phporto", "phparrot", "uvalab", "aws-terraform"]);
    expect(otherProjects().every((p) => !p.main)).toBe(true);
  });

  it("uses unique project slugs", () => {
    const slugs = content.projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("locales", () => {
  it("maps routes to content keys", () => {
    expect(contentKey("en")).toBe("en");
    expect(contentKey("pt-br")).toBe("pt");
    expect(isLocale("pt-br")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("localizes text and UI strings", () => {
    expect(localize({ en: "Hi", pt: "Oi" }, "pt-br")).toBe("Oi");
    expect(str("en", "featured")).toBe("Featured work");
    expect(() => str("en", "does-not-exist")).toThrow();
  });
});
