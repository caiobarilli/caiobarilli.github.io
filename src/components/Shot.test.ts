import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SHOT_WIDTHS, shotSrcSet } from "./Shot";

const dir = path.join(process.cwd(), "public", "images", "projects");

describe("Shot", () => {
  it("lists the smaller copies and the original in the srcset", () => {
    expect(shotSrcSet("/images/projects/keeptask-kanban.webp")).toBe(
      "/images/projects/w/keeptask-kanban-480.webp 480w, /images/projects/w/keeptask-kanban-960.webp 960w, /images/projects/w/keeptask-kanban-1280.webp 1280w, /images/projects/keeptask-kanban.webp 1600w",
    );
  });

  it("has every smaller copy on disk (run scripts/sizes.mjs after adding a print)", () => {
    const missing = readdirSync(dir)
      .filter((f) => f.endsWith(".webp"))
      .flatMap((f) => SHOT_WIDTHS.map((w) => `w/${f.replace(/\.webp$/, "")}-${w}.webp`))
      .filter((f) => !existsSync(path.join(dir, f)));
    expect(missing).toEqual([]);
  });
});
