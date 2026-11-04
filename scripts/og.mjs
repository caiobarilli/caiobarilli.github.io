// Link-preview image (Open Graph, 1200x630) per language, plus the app icons.
// Text comes from site.json, so the card always matches the site. Run: node scripts/og.mjs
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const site = JSON.parse(readFileSync("src/content/site.json", "utf8"));
const BG = "#0d0f0e";
const INK = "#e8ebe6";
const MUTED = "#9aa198";
const ACCENT = "#b9e64c"; // sRGB of the site's oklch(0.88 0.19 128)

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The role line uses " · " as separator; break it into two lines so it never overflows.
function roleLines(role) {
  const parts = role.split(" · ");
  return [parts[0], parts.slice(1).join(" · ")].filter(Boolean);
}

async function card(lang, file) {
  const ui = site.ui[lang];
  const [line1, line2] = roleLines(ui.role);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${ACCENT}"/>
  <text x="80" y="150" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="30" fill="${MUTED}"><tspan fill="${ACCENT}">caio@wsl</tspan>:~$ whoami</text>
  <text x="80" y="300" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="104" letter-spacing="-3" fill="${INK}">Caio Barilli</text>
  <text x="80" y="380" font-family="'Segoe UI', Arial, sans-serif" font-size="40" fill="${INK}">${esc(line1)}</text>
  <text x="80" y="432" font-family="'Segoe UI', Arial, sans-serif" font-size="34" fill="${MUTED}">${esc(line2 ?? "")}</text>
  <text x="80" y="560" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="28" fill="${ACCENT}">caiobarilli.github.io</text>
</svg>`;

  const size = 260;
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`);
  const photo = await sharp("public/images/caio-480.webp")
    .resize(size, size)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(Buffer.from(svg))
    .composite([{ input: photo, left: 1200 - 80 - size, top: 120 }])
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log("wrote", file);
}

// Icon: the "~/" prompt from the header, on the dark background.
const icon = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${BG}"/>
  <text x="32" y="43" text-anchor="middle" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-weight="700" font-size="30" fill="${ACCENT}">~/</text>
</svg>`;

await card("en", "public/og-en.png");
await card("pt", "public/og-pt-br.png");
writeFileSync("src/app/icon.svg", icon(64));
await sharp(Buffer.from(icon(180))).png().toFile("src/app/apple-icon.png");
console.log("wrote src/app/icon.svg and src/app/apple-icon.png");
