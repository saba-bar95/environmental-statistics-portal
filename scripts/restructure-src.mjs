/**
 * One-time codemod after git mv restructure.
 * Run from repo root: node scripts/restructure-src.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const EXT = new Set([".js", ".jsx", ".mjs", ".scss", ".md", ".mdc"]);

const SHARED_COMPONENTS = [
  "ChartCard",
  "Download",
  "YearDropdown",
  "Info",
  "Socials",
  "LanguageChanger",
  "SearchBar",
  "Header",
  "Footer",
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function reduceRelativePrefix(prefix) {
  if (!prefix.startsWith("../")) return prefix;
  const parts = prefix.match(/\.\.\//g) ?? [];
  if (parts.length <= 1) return "";
  return "../".repeat(parts.length - 1);
}

function fixRelativeToSrc(content, filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const inPages = rel.startsWith("src/pages/");
  const inComponents = rel.startsWith("src/components/");
  const needsDepthFix = inPages || inComponents;

  if (needsDepthFix) {
    content = content.replace(
      /((?:\.\.\/)+)fetchFunctions\//g,
      (_, dots) => `${reduceRelativePrefix(dots)}api/`
    );
    content = content.replace(
      /((?:\.\.\/)+)hooks\//g,
      (_, dots) => `${reduceRelativePrefix(dots)}hooks/`
    );
    content = content.replace(
      /((?:\.\.\/)+)chartRegistry\//g,
      (_, dots) => `${reduceRelativePrefix(dots)}chartRegistry/`
    );
  }

  if (inPages) {
    for (const name of SHARED_COMPONENTS) {
      const re = new RegExp(`((?:\\.\\./)+)${name}/`, "g");
      content = content.replace(re, `$1components/${name}/`);
    }
    // pages/ is two levels shallower than assets/components/Pages/
    for (const target of ["api/", "hooks/", "chartRegistry/"]) {
      content = content.replace(
        new RegExp(`((?:\\.\\./)+)${target.replace("/", "\\/")}`, "g"),
        (_, dots) => `${reduceRelativePrefix(dots)}${target}`
      );
    }
  }

  return content;
}

function transform(content, filePath) {
  let next = content;

  // Absolute Vite paths
  next = next.replaceAll("/src/styles/", "/src/styles/");
  next = next.replaceAll("/src/pages/", "/src/pages/");
  next = next.replaceAll("/src/pages/Homepage/", "/src/pages/Homepage/");

  // Entry-point and doc paths
  next = next.replaceAll("./pages/", "./pages/");
  next = next.replaceAll("./pages/Homepage/", "./pages/Homepage/");
  next = next.replaceAll("../pages/", "../pages/");
  next = next.replaceAll("../pages/Homepage/", "../pages/Homepage/");
  next = next.replaceAll("pages/", "pages/");
  next = next.replaceAll("pages/Homepage/", "pages/Homepage/");
  next = next.replaceAll("api/", "api/");
  next = next.replaceAll("styles/", "styles/");

  // Shared shell components in entry files
  next = next.replaceAll("./components/Header/", "./components/Header/");
  next = next.replaceAll("./components/Footer/", "./components/Footer/");

  // fetchFunctions rename (remaining relative imports outside pages/components fix)
  next = next.replaceAll("api/", "api/");

  next = fixRelativeToSrc(next, filePath);

  return next;
}

const files = walk(ROOT).filter(
  (f) =>
    !f.includes(`${path.sep}node_modules${path.sep}`) &&
    !f.includes(`${path.sep}dist${path.sep}`)
);

let changed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const updated = transform(original, file);
  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    changed++;
  }
}

console.log(`Updated ${changed} files.`);
