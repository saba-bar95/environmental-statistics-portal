import fs from "fs";
import path from "path";
import crypto from "crypto";

function walk(dir, name, acc = []) {
  for (const n of fs.readdirSync(dir)) {
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p, name, acc);
    else if (n === name) acc.push(p);
  }
  return acc;
}

function groupByHash(files) {
  const groups = {};
  for (const f of files) {
    const h = crypto.createHash("md5").update(fs.readFileSync(f)).digest("hex");
    (groups[h] ||= []).push(f);
  }
  return groups;
}

for (const name of ["downloadPDF.js", "downloadExcel.js", "Download.jsx"]) {
  const files = walk("src/pages", name);
  const groups = groupByHash(files);
  console.log(`\n${name}: ${files.length} files, ${Object.keys(groups).length} unique`);
  for (const [, list] of Object.entries(groups).sort((a, b) => b.length - a.length)) {
    const rel = list[0].replace(/\\/g, "/").split("Pages/")[1];
    console.log(`  ${list.length}x  e.g. Pages/${rel}`);
  }
}
