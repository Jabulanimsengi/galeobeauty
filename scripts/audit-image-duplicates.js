const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DEFAULT_ROOT = path.join(process.cwd(), "public", "images");

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

function getFileHash(file) {
  const hash = crypto.createHash("sha1");
  hash.update(fs.readFileSync(file));
  return hash.digest("hex");
}

function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_ROOT;

  if (!fs.existsSync(root)) {
    console.error(`Image root not found: ${root}`);
    process.exit(1);
  }

  const files = walk(root);
  const groups = new Map();

  for (const file of files) {
    const hash = getFileHash(file);
    const list = groups.get(hash) ?? [];
    list.push(file);
    groups.set(hash, list);
  }

  const duplicates = [...groups.values()]
    .filter((group) => group.length > 1)
    .sort((a, b) => b.length - a.length);

  console.log(`Scanned ${files.length} images under ${path.relative(process.cwd(), root)}`);
  console.log("");

  if (duplicates.length === 0) {
    console.log("No duplicate image files found.");
    return;
  }

  console.log(`Found ${duplicates.length} duplicate image group(s):`);
  console.log("");

  duplicates.slice(0, 30).forEach((group, index) => {
    console.log(`Group ${index + 1}:`);
    group.forEach((file) => {
      console.log(`  - ${path.relative(process.cwd(), file)}`);
    });
    console.log("");
  });
}

main();
