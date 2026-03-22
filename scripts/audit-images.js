const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DEFAULT_ROOT = path.join(process.cwd(), "public", "images");
const LARGE_FILE_BYTES = 500 * 1024;
const LARGE_DIMENSION = 2200;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_ROOT;

  if (!fs.existsSync(root)) {
    console.error(`Image root not found: ${root}`);
    process.exit(1);
  }

  const files = walk(root);
  const rows = [];

  for (const file of files) {
    const stats = fs.statSync(file);
    const metadata = await sharp(file).metadata();

    rows.push({
      file: path.relative(process.cwd(), file),
      sizeKB: Math.round(stats.size / 1024),
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
      needsAttention:
        stats.size >= LARGE_FILE_BYTES ||
        (metadata.width ?? 0) > LARGE_DIMENSION ||
        (metadata.height ?? 0) > LARGE_DIMENSION,
    });
  }

  const sorted = rows.sort((a, b) => b.sizeKB - a.sizeKB);
  const flagged = sorted.filter((row) => row.needsAttention);

  console.log(`Scanned ${rows.length} images under ${path.relative(process.cwd(), root)}`);
  console.log("");

  if (flagged.length === 0) {
    console.log("No oversized images found.");
    return;
  }

  console.log("Largest images needing attention:");
  console.table(
    flagged.slice(0, 30).map((row) => ({
      file: row.file,
      sizeKB: row.sizeKB,
      dimensions: `${row.width}x${row.height}`,
    }))
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
