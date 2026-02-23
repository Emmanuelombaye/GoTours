import fs from "fs";
import path from "path";
import sharp from "sharp";

const baseDir = "";
const sizes = [320, 640, 1280, 1920];

async function optimize() {
  const villas = fs.readdirSync(baseDir);

  for (const villa of villas) {
    const villaPath = path.join(baseDir, villa);
    if (!fs.statSync(villaPath).isDirectory()) continue;

    const images = fs.readdirSync(villaPath);

    for (const img of images) {
      if (!img.match(/\.(png|jpg|jpeg)$/i)) continue;

      const input = path.join(villaPath, img);
      const name = img.replace(/\.(png|jpg|jpeg)$/i, "");

      for (const size of sizes) {
        await sharp(input)
          .resize(size, null, { withoutEnlargement: true })
          .avif({ quality: 45 })
          .toFile(path.join(villaPath, ${name}-.avif));

        await sharp(input)
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(path.join(villaPath, ${name}-.webp));
      }

      console.log(? Optimized /);
    }
  }

  console.log("? ALL IMAGES OPTIMIZED (AIRBNB LEVEL)");
}

optimize();
