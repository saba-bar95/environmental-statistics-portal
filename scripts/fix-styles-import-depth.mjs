import fs from "node:fs";
import path from "node:path";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(js|jsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function depthToSrc(filePath) {
  const rel = path.relative(path.join("src"), path.dirname(filePath));
  return rel.split(path.sep).filter(Boolean).length;
}

let changed = 0;
for (const file of walk(path.resolve("src/pages"))) {
  let content = fs.readFileSync(file, "utf8");
  const depth = depthToSrc(file);
  const prefix = "../".repeat(depth);

  const updated = content.replace(
    /import "((?:\.\.\/)+)styles\/([^"]+)"/g,
    (_, _dots, rest) => `import "${prefix}styles/${rest}"`
  );

  if (updated !== content) {
    fs.writeFileSync(file, updated, "utf8");
    changed++;
  }
}

console.log(`Fixed styles import depth in ${changed} files.`);
