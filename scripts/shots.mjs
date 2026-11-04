// Converts project screenshots to 16:10 WebP in public/images/projects.
// Sources stay outside the repo; sharp drops their metadata.
// Usage: node scripts/shots.mjs <keeptask-prints-dir> <phparrot-shots-dir>
import sharp from "sharp";

const [keeptask, phparrot] = process.argv.slice(2);
if (!keeptask || !phparrot) {
  console.error("Usage: node scripts/shots.mjs <keeptask-prints-dir> <phparrot-shots-dir>");
  process.exit(1);
}

const W = 1600;
const H = 1000;
const OUT = "public/images/projects";

const jobs = [
  // Keeptask (demo data from the public docs)
  { out: "keeptask-kanban", src: `${keeptask}/03-a-quadro-kanban.png`, crop: { left: 0, top: 0, width: 1280, height: 800 } },
  { out: "keeptask-settings", src: `${keeptask}/13-a-integracoes.png`, crop: { left: 0, top: 0, width: 1280, height: 800 } },
  { out: "keeptask-mobile", src: `${keeptask}/mobile-06-minhas-tarefas-gestao-claro.png`, phone: true },
  // PHParrot (local dev, captured with headless Edge at 1280x800)
  { out: "phparrot-session", src: `${phparrot}/phparrot-fala.png`, crop: { left: 208, top: 16, width: 864, height: 540 } },
  { out: "phparrot-2", src: `${phparrot}/phparrot-leitura.png`, crop: { left: 208, top: 16, width: 864, height: 540 } },
];

for (const job of jobs) {
  const file = `${OUT}/${job.out}.webp`;
  if (job.phone) {
    // Portrait phone screen centered on a neutral 16:10 canvas.
    const phone = await sharp(job.src).resize({ height: H - 80 }).png().toBuffer();
    await sharp({ create: { width: W, height: H, channels: 3, background: "#e3e6df" } })
      .composite([{ input: phone, gravity: "center" }])
      .webp({ quality: 80 })
      .toFile(file);
  } else {
    await sharp(job.src).extract(job.crop).resize(W, H).webp({ quality: 80 }).toFile(file);
  }
  const meta = await sharp(file).metadata();
  console.log(file, `${meta.width}x${meta.height}`, "exif:", Boolean(meta.exif));
}
