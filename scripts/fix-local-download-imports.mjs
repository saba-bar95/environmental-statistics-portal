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

let changed = 0;
for (const file of walk(path.resolve("src/pages"))) {
  let content = fs.readFileSync(file, "utf8");
  const updated = content
    .replaceAll('from "../components/Download/Download"', 'from "../Download/Download"')
    .replaceAll("from '../components/Download/Download'", "from '../Download/Download'")
    .replace(
      /from "((?:\.\.\/)+)components\/Download\/(HorizontalBarDownload|HeatmapDownload)"/g,
      'from "$1Download/$2"'
    );
  if (updated !== content) {
    fs.writeFileSync(file, updated, "utf8");
    changed++;
  }
}

console.log(`Fixed local Download imports in ${changed} files.`);
