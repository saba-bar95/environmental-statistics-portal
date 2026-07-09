/**
 * Consolidates identical downloadPDF.js, downloadExcel.js, and Download.jsx copies
 * into src/components/Download/. Updates imports; deletes local duplicates.
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

function largestGroup(files) {
  const groups = new Map();
  for (const f of files) {
    const h = md5(fs.readFileSync(f, "utf8"));
    if (!groups.has(h)) groups.set(h, []);
    groups.get(h).push(f);
  }
  return [...groups.values()].sort((a, b) => b.length - a.length)[0];
}

function relImport(fromDir, toFile) {
  let rel = path.relative(fromDir, toFile).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel.replace(/\.js$/, "");
}

function fixFontPath(content) {
  return content.replace(/from\s+["'](?:\.\.\/)+fonts\//g, 'from "../../fonts/');
}

function consolidateHelper(basename, sharedBasename = basename) {
  const files = walk(PAGES, basename);
  const group = largestGroup(files);
  if (!group || group.length < 2) {
    console.log(`Skip ${basename}: largest group has ${group?.length ?? 0} files`);
    return;
  }

  const originalHash = md5(fs.readFileSync(group[0], "utf8"));
  const sharedContent = fixFontPath(fs.readFileSync(group[0], "utf8"));
  const sharedPath = path.join(SHARED, sharedBasename);

  if (!fs.existsSync(sharedPath)) {
    fs.writeFileSync(sharedPath, sharedContent);
    console.log(`Created ${sharedBasename} (${group.length} identical copies)`);
  }

  const importName = basename.replace(".js", "");
  let deleted = 0;
  let updated = 0;

  for (const f of files) {
    if (md5(fs.readFileSync(f, "utf8")) !== originalHash) continue;

    const dir = path.dirname(f);
    const downloadJsx = path.join(dir, "Download.jsx");

    if (fs.existsSync(downloadJsx)) {
      const stub = fs.readFileSync(downloadJsx, "utf8");
      if (!stub.startsWith("export { default }")) {
        const importPath = relImport(dir, sharedPath);
        let jsx = stub;
        const re = new RegExp(`import ${importName} from "\\./${importName}";`);
        if (re.test(jsx)) {
          jsx = jsx.replace(re, `import ${importName} from "${importPath}";`);
          fs.writeFileSync(downloadJsx, jsx);
          updated++;
        }
      }
    }

    if (path.resolve(f) !== path.resolve(sharedPath)) {
      fs.unlinkSync(f);
      deleted++;
    }
  }

  console.log(`  ${basename}: ${updated} imports updated, ${deleted} files removed`);
}

consolidateHelper("downloadPDF.js");
consolidateHelper("downloadExcel.js");

// ChartDownload.jsx — largest identical Download.jsx group
const downloadJsxFiles = walk(PAGES, "Download.jsx");
const dGroup = largestGroup(downloadJsxFiles);
if (dGroup && dGroup.length >= 2) {
  const originalHash = md5(fs.readFileSync(dGroup[0], "utf8"));
  let canonical = fs.readFileSync(dGroup[0], "utf8");

  canonical = canonical.replace(
    /import ["'][^"']*Download\/Download\.scss["'];/,
    'import "./Download.scss";'
  );
  canonical = canonical.replace(
    /import downloadPNG from ["'][^"']*Download\/downloadPNG["'];/,
    'import downloadPNG from "./downloadPNG";'
  );
  canonical = canonical.replace(
    /import downloadJPG from ["'][^"']*Download\/downloadJPG["'];/,
    'import downloadJPG from "./downloadJPG";'
  );
  canonical = canonical.replace(
    /import (\w+) from ["'][^"']*Download\/Svgs\/(\w+)["'];/g,
    'import $1 from "./Svgs/$2";'
  );
  canonical = canonical.replace(
    /import downloadExcel from "\.\/downloadExcel";/,
    'import downloadExcel from "./downloadExcel";'
  );
  canonical = canonical.replace(
    /import downloadPDF from "\.\/downloadPDF";/,
    'import downloadPDF from "./downloadPDF";'
  );

  const chartDownloadPath = path.join(SHARED, "ChartDownload.jsx");
  if (!fs.existsSync(chartDownloadPath)) {
    fs.writeFileSync(chartDownloadPath, canonical);
    console.log(`Created ChartDownload.jsx (${dGroup.length} identical copies)`);
  }

  let replaced = 0;
  for (const f of downloadJsxFiles) {
    if (md5(fs.readFileSync(f, "utf8")) !== originalHash) continue;
    const dir = path.dirname(f);
    const rel = relImport(dir, chartDownloadPath);
    const stub = `export { default } from "${rel}";\n`;
    fs.writeFileSync(f, stub);
    replaced++;
  }
  console.log(`  Download.jsx: ${replaced} re-export stubs`);
}

console.log("\nDone. Run npm run build to verify.");
