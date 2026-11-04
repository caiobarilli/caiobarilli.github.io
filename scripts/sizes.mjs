// Writes smaller copies of every project screenshot to public/images/projects/w/<name>-<width>.webp,
// so phones download a print sized for their screen instead of the 1600px original (the site is a
// static export, so there is no image server to resize on request). Run again after adding a print.
// Usage: node scripts/sizes.mjs
import { mkdirSync, readdirSync } from "node:fs";
import sharp from "sharp";

// Keep in sync with SHOT_WIDTHS in src/components/Shot.tsx.
const WIDTHS = [480, 720, 960, 1280];
const DIR = "public/images/projects";
const OUT = `${DIR}/w`;

mkdirSync(OUT, { recursive: true });
for (const file of readdirSync(DIR).filter((f) => f.endsWith(".webp"))) {
  const name = file.slice(0, -".webp".length);
  for (const width of WIDTHS) {
    const out = `${OUT}/${name}-${width}.webp`;
    const info = await sharp(`${DIR}/${file}`).resize({ width }).webp({ quality: 78 }).toFile(out);
    console.log(out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
  }
}
