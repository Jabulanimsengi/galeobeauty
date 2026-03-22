const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DEFAULT_ROOT = path.join(process.cwd(), "public", "images");
const DEFAULT_MAX_WIDTH = 2200;
const DEFAULT_MIN_BYTES = 350 * 1024;
const DEFAULT_QUALITY = 82;

function getArgValue(flag, fallback) {
  const match = process.argv.find((arg) => arg.startsWith(`${flag}=`));
  if (!match) return fallback;
  return match.slice(flag.length + 1);
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

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

function buildPipeline(file, metadata, maxWidth, quality) {
  const extension = path.extname(file).toLowerCase();
  let pipeline = sharp(file).rotate();

  if ((metadata.width ?? 0) > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return pipeline.jpeg({ quality, mozjpeg: true });
  }

  if (extension === ".png") {
    return pipeline.png({ quality, compressionLevel: 9, palette: true, effort: 10 });
  }

  if (extension === ".webp") {
    return pipeline.webp({ quality, effort: 6 });
  }

  return pipeline.avif({ quality: Math.min(quality, 65), effort: 6 });
}

async function main() {
  const root = path.resolve(getArgValue("--dir", DEFAULT_ROOT));
  const maxWidth = Number(getArgValue("--max-width", DEFAULT_MAX_WIDTH));
  const minBytes = Number(getArgValue("--min-bytes", DEFAULT_MIN_BYTES));
  const quality = Number(getArgValue("--quality", DEFAULT_QUALITY));
  const write = hasFlag("--write");

  if (!fs.existsSync(root)) {
    console.error(`Image root not found: ${root}`);
    process.exit(1);
  }

  const files = walk(root);
  let processed = 0;
  let savedBytes = 0;

  for (const file of files) {
    const original = fs.statSync(file);
    const metadata = await sharp(file).metadata();

    const shouldResize = (metadata.width ?? 0) > maxWidth;
    if (!shouldResize && original.size < minBytes) {
      continue;
    }

    const optimizedBuffer = await buildPipeline(file, metadata, maxWidth, quality).toBuffer();

    if (optimizedBuffer.length >= original.size) {
      continue;
    }

    processed += 1;
    savedBytes += original.size - optimizedBuffer.length;

    console.log(
      `${path.relative(process.cwd(), file)}: ${Math.round(original.size / 1024)}KB -> ${Math.round(optimizedBuffer.length / 1024)}KB`
    );

    if (write) {
      const tempPath = `${file}.tmp`;
      fs.writeFileSync(tempPath, optimizedBuffer);
      fs.renameSync(tempPath, file);
    }
  }

  console.log("");
  console.log(
    `${write ? "Optimized" : "Dry run checked"} ${processed} image(s). Potential savings: ${Math.round(savedBytes / 1024)}KB`
  );

  if (!write) {
    console.log("Re-run with --write to update files in place.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
