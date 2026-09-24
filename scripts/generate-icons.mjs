import sharp from "sharp";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptsDir, "..");
const svg = readFileSync(path.join(scriptsDir, "icon-source.svg"));

const targets = [
  { size: 192, out: "public/icons/icon-192.png" },
  { size: 512, out: "public/icons/icon-512.png" },
  { size: 180, out: "public/icons/apple-touch-icon.png" },
];

for (const { size, out } of targets) {
  const outPath = path.join(repoRoot, out);
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(outPath);
  console.log(`wrote ${out} (${size}x${size})`);
}
