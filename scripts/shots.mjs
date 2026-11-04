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
  { out: "keeptask-task", src: `${keeptask}/05-d-detalhe-subtarefas.png`, crop: { left: 0, top: 0, width: 1280, height: 800 } },
  { out: "keeptask-poker", src: `${keeptask}/19-p-consenso-gravado.png`, crop: { left: 0, top: 0, width: 1280, height: 800 } },
  { out: "keeptask-settings", src: `${keeptask}/13-a-integracoes.png`, crop: { left: 0, top: 0, width: 1280, height: 800 } },
  { out: "keeptask-mobile", phones: ["mobile-06-minhas-tarefas-gestao-claro.png", "mobile-29-cronometro-rodando-claro.png", "mobile-37-offline-lista-faixa-e-fila-claro.png"].map((f) => `${keeptask}/${f}`) },
  { out: "keeptask-mobile-2", phones: ["mobile-05-biometria-pergunta-claro.png", "mobile-43-push-bandeja-claro.png"].map((f) => `${keeptask}/${f}`) },
  // PHParrot (local dev, captured with headless Edge at 1280x800)
  { out: "phparrot-session", src: `${phparrot}/phparrot-fala.png`, crop: { left: 208, top: 16, width: 864, height: 540 } },
  { out: "phparrot-2", src: `${phparrot}/phparrot-leitura.png`, crop: { left: 208, top: 16, width: 864, height: 540 } },
];

for (const job of jobs) {
  const file = `${OUT}/${job.out}.webp`;
  if (job.phones) {
    // Portrait phone screens side by side on a neutral 16:10 canvas.
    const phoneH = H - 80;
    const gap = 60;
    const phones = await Promise.all(job.phones.map((src) => sharp(src).resize({ height: phoneH }).png().toBuffer({ resolveWithObject: true })));
    let left = Math.round((W - phones.reduce((sum, p) => sum + p.info.width, 0) - gap * (phones.length - 1)) / 2);
    const layers = phones.map((p) => {
      const layer = { input: p.data, left, top: (H - phoneH) / 2 };
      left += p.info.width + gap;
      return layer;
    });
    await sharp({ create: { width: W, height: H, channels: 3, background: "#e3e6df" } })
      .composite(layers)
      .webp({ quality: 82 })
      .toFile(file);
  } else {
    await sharp(job.src).extract(job.crop).resize(W, H).webp({ quality: 80 }).toFile(file);
  }
  const meta = await sharp(file).metadata();
  console.log(file, `${meta.width}x${meta.height}`, "exif:", Boolean(meta.exif));
}
