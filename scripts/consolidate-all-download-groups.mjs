/**
 * Consolidates every duplicate group (2+ identical files) of downloadPDF / downloadExcel.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PAGES = path.join(ROOT, "src/pages");
const SHARED = path.join(ROOT, "src/components/Download");

function walk(dir, name, acc = []) {
  for (const n of fs.readdirSync(dir)) {
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p, name, acc);
    else if (n === name) acc.push(p);
  }
  return acc;
}

function md5(content) {
  return crypto.createHash("md5").update(content).digest("hex");
}

function groupsByHash(files) {
  const map = new Map();
  for (const f of files) {
    const h = md5(fs.readFileSync(f, "utf8"));
    if (!map.has(h)) map.set(h, []);
    map.get(h).push(f);
  }
  return [...map.values()].filter((g) => g.length >= 2);
}

function relImport(fromDir, toFile) {
  let rel = path.relative(fromDir, toFile).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel.replace(/\.js$/, "");
}

function fixFontPath(content) {
  return content.replace(/from\s+["'](?:\.\.\/)+fonts\//g, 'from "../../fonts/');
}

function consolidateFile(basename, sharedBasename) {
  const files = walk(PAGES, basename);
  const groups = groupsByHash(files);
  const importName = basename.replace(".js", "");
  let totalDeleted = 0;

  for (const group of groups) {
    const originalHash = md5(fs.readFileSync(group[0], "utf8"));
    const sharedPath = path.join(SHARED, sharedBasename);
    const variantName =
      groups.length > 1 || group !== groups[0]
        ? null
        : null;

    // Use variant suffix if shared file exists with different content
    let targetPath = sharedPath;
    if (fs.existsSync(sharedPath)) {
      const existingHash = md5(fs.readFileSync(sharedPath, "utf8"));
      if (existingHash !== originalHash) {
        const suffix = originalHash.slice(0, 8);
        targetPath = path.join(
          SHARED,
          sharedBasename.replace(".js", `.${suffix}.js`)
        );
      }
    }

    if (!fs.existsSync(targetPath)) {
      fs.writeFileSync(targetPath, fixFontPath(fs.readFileSync(group[0], "utf8")));
      console.log(`  wrote ${path.basename(targetPath)} (${group.length} copies)`);
    }

    const targetHash = md5(fs.readFileSync(targetPath, "utf8"));

    for (const f of group) {
      if (md5(fs.readFileSync(f, "utf8")) !== originalHash) continue;
      const dir = path.dirname(f);
      const downloadJsx = path.join(dir, "Download.jsx");
      if (fs.existsSync(downloadJsx)) {
        let jsx = fs.readFileSync(downloadJsx, "utf8");
        if (!jsx.startsWith("export { default }")) {
          const importPath = relImport(dir, targetPath);
          const re = new RegExp(
            `import ${importName} from "\\./${importName}";`
          );
          if (re.test(jsx)) {
            jsx = jsx.replace(
              re,
              `import ${importName} from "${importPath}";`
            );
            fs.writeFileSync(downloadJsx, jsx);
          }
        }
      }
      if (path.resolve(f) !== path.resolve(targetPath)) {
        fs.unlinkSync(f);
        totalDeleted++;
      }
    }
  }

  return totalDeleted;
}

console.log("downloadPDF.js groups:");
const d1 = consolidateFile("downloadPDF.js", "downloadPDF.js");
console.log(`  deleted ${d1} duplicate files\n`);

console.log("downloadExcel.js groups:");
const d2 = consolidateFile("downloadExcel.js", "downloadExcel.js");
console.log(`  deleted ${d2} duplicate files`);
