import { existsSync } from "node:fs";
import path from "node:path";

/** Public URL of a project screenshot, or null while it is still a placeholder. Runs at build time. */
export function shotSrc(file: string): string | null {
  const disk = path.join(process.cwd(), "public", "images", "projects", file);
  return existsSync(disk) ? `/images/projects/${file}` : null;
}
