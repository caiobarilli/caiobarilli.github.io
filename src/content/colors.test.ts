import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? tsxFiles(path) : path.endsWith(".tsx") ? [path] : [];
  });
}

describe("colors", () => {
  it("lives in tokens: no literal hex color in any component or page", () => {
    const found = tsxFiles("src").flatMap((file) => {
      const hits = readFileSync(file, "utf8").match(/#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3,4}\b/g);
      return hits ? [`${file}: ${hits.join(", ")}`] : [];
    });
    expect(found).toEqual([]);
  });
});
