// Builds the profile photos from a local original that is NOT committed.
// sharp drops EXIF/GPS and other metadata unless asked to keep it.
// Usage: node scripts/photo.mjs "<path to original.jpg>"
import sharp from "sharp";

const source = process.argv[2];
if (!source) {
  console.error("Usage: node scripts/photo.mjs <original>");
  process.exit(1);
}

// Square crop around the face of the 1152x1728 original.
const crop = { left: 176, top: 170, width: 800, height: 800 };

for (const size of [96, 480]) {
  const out = `public/images/caio-${size}.webp`;
  await sharp(source).extract(crop).resize(size, size).webp({ quality: 82 }).toFile(out);
  const meta = await sharp(out).metadata();
  console.log(out, `${meta.width}x${meta.height}`, "exif:", Boolean(meta.exif));
}
