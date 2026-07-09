/**
 * Migrates standard loading/error/empty JSX blocks to ChartStateCards.
 * Skips non-standard blocks (heatmaps, YearDropdown in empty state, etc.)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PAGES = path.join(ROOT, "src/pages");
const COMPONENTS = path.join(ROOT, "src/components");

const SKIP_FILES = new Set([
  "HeatmapChart.jsx", // non-standard markup
]);

function chartCardImportPath(filePath) {
  const fileDir = path.dirname(filePath);
  const rel = path.relative(fileDir, COMPONENTS).replace(/\\/g, "/");
  const prefix = rel === "" ? "." : rel;
  return `${prefix}/ChartCard/ChartStateCards`;
}

function extractMeta(block) {
  const meta = {
    id: null,
    title: null,
    unit: null,
    ref: null,
    style: null,
    headerStyle: null,
    icon: null,
  };

  const idM = block.match(/id=\{([^}]+)\}/);
  if (idM) meta.id = idM[1].trim();

  const titleM = block.match(/<h1>\s*\{([^}]+(?:\?[^}]+\}[^}]*)?)\}\s*<\/h1>/s);
  if (titleM) meta.title = titleM[1].trim();

  const unitM = block.match(/<p>\s*\{([^}]+(?:\?[^}]+\}[^}]*)?)\}\s*<\/p>/);
  if (unitM) meta.unit = unitM[1].trim();

  const refM = block.match(/ref=\{(\w+)\}/);
  if (refM) meta.ref = refM[1];

  const wrapStyle = block.match(
    /<div\s+className="chart-wrapper"[^>]*\sstyle=\{([^}]+)\}/,
  );
  if (wrapStyle) meta.style = wrapStyle[1].trim();

  const headerStyleM = block.match(
    /<div className="header"\s+style=\{([^}]+)\}>/,
  );
  if (headerStyleM) meta.headerStyle = headerStyleM[1].trim();

  const llM = block.match(/<div className="ll">\s*([\s\S]*?)\s*<\/div>/);
  if (llM && llM[1].trim() && !llM[1].includes("download-placeholder")) {
    meta.icon = llM[1].trim();
  }

  return meta;
}

function cardProps(meta, extra = "") {
  const lines = [
    `        id={${meta.id}}`,
    `        title={${meta.title}}`,
    `        unit={${meta.unit}}`,
    `        language={language}`,
  ];
  if (meta.icon) lines.push(`        icon={${meta.icon}}`);
  if (meta.ref) lines.push(`        ref={${meta.ref}}`);
  if (meta.style) lines.push(`        style={${meta.style}}`);
  if (meta.headerStyle) lines.push(`        headerStyle={${meta.headerStyle}}`);
  if (extra) lines.push(extra);
  return lines.join("\n");
}

function isStandardLoading(block) {
  return (
    block.includes('className="loading-container"') &&
    block.includes("loading-spinner") &&
    block.includes("მონაცემების ჩატვირთვა") &&
    !block.includes("heatmap-container")
  );
}

function isStandardError(block) {
  return (
    block.includes('className="error-container"') &&
    block.includes("error-icon") &&
    block.includes("ხელახლა ჩატვირთვა")
  );
}

function isStandardEmpty(block) {
  return (
    block.includes('className="empty-state"') &&
    block.includes("No data available") &&
    !block.includes("YearDropdown")
  );
}

function migrateFile(filePath) {
  if (SKIP_FILES.has(path.basename(filePath)))
    return { file: filePath, status: "skip-file" };

  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes("ChartLoadingCard"))
    return { file: filePath, status: "already" };
  if (!content.includes("loading-container"))
    return { file: filePath, status: "no-loading" };

  let changed = false;
  const needs = { loading: false, error: false, empty: false };

  // Loading
  const loadCond = /if\s*\(\s*isLoading\s*\)\s*\{/;
  if (loadCond.test(content)) {
    const m = content.match(loadCond);
    const snippet = content.slice(m.index, m.index + 2500);
    if (isStandardLoading(snippet)) {
      const meta = extractMeta(snippet);
      if (meta.id && meta.title && meta.unit) {
        const replacement = `if (isLoading) {
    return (
      <ChartLoadingCard
${cardProps(meta)}
      />
    );
  }`;
        const re =
          /if\s*\(\s*isLoading\s*\)\s*\{\s*return\s*\([\s\S]*?\);\s*\}/;
        if (re.test(content)) {
          content = content.replace(re, replacement);
          changed = true;
          needs.loading = true;
        }
      }
    }
  }

  // Error
  const errCond = /if\s*\(\s*error\s*\)\s*\{/;
  if (errCond.test(content)) {
    const m = content.match(errCond);
    const snippet = content.slice(m.index, m.index + 2500);
    if (isStandardError(snippet)) {
      const meta = extractMeta(snippet);
      if (meta.id && meta.title && meta.unit) {
        const replacement = `if (error) {
    return (
      <ChartErrorCard
${cardProps(meta, "        error={error}")}
      />
    );
  }`;
        const re = /if\s*\(\s*error\s*\)\s*\{\s*return\s*\([\s\S]*?\);\s*\}/;
        if (re.test(content)) {
          content = content.replace(re, replacement);
          changed = true;
          needs.error = true;
        }
      }
    }
  }

  // Empty - several condition patterns
  const emptyPatterns = [
    {
      cond: /if\s*\(\s*!chartData\s*\|\|\s*chartData\.length\s*===\s*0\s*\)\s*\{/,
      re: /if\s*\(\s*!chartData\s*\|\|\s*chartData\.length\s*===\s*0\s*\)\s*\{\s*return\s*\([\s\S]*?\);\s*\}/,
    },
    {
      cond: /if\s*\(\s*chartData\.length\s*===\s*0\s*\)\s*\{/,
      re: /if\s*\(\s*chartData\.length\s*===\s*0\s*\)\s*\{\s*return\s*\([\s\S]*?\);\s*\}/,
    },
    {
      cond: /if\s*\(\s*!chartData\s*\|\|\s*chartData\.length\s*<\s*1\s*\)\s*\{/,
      re: /if\s*\(\s*!chartData\s*\|\|\s*chartData\.length\s*<\s*1\s*\)\s*\{\s*return\s*\([\s\S]*?\);\s*\}/,
    },
  ];

  for (const { cond, re } of emptyPatterns) {
    if (!cond.test(content)) continue;
    const m = content.match(cond);
    const snippet = content.slice(m.index, m.index + 2500);
    if (!isStandardEmpty(snippet)) continue;
    const meta = extractMeta(snippet);
    if (!meta.id || !meta.title || !meta.unit) continue;
    const replacement = `${m[0]}
    return (
      <ChartEmptyCard
${cardProps(meta)}
      />
    );
  }`;
    // Fix replacement - use full match for condition only
    const condStr = m[0];
    const replacement2 = `${condStr}
    return (
      <ChartEmptyCard
${cardProps(meta)}
      />
    );
  }`;
    if (re.test(content)) {
      content = content.replace(re, replacement2);
      changed = true;
      needs.empty = true;
      break;
    }
  }

  if (!changed) return { file: filePath, status: "unchanged" };

  const imports = [];
  if (needs.loading) imports.push("ChartLoadingCard");
  if (needs.error) imports.push("ChartErrorCard");
  if (needs.empty) imports.push("ChartEmptyCard");

  const importLine = `import {\n  ${imports.join(",\n  ")},\n} from "${chartCardImportPath(filePath)}";\n`;

  if (!content.includes("ChartStateCards")) {
    const lastImport = content.lastIndexOf("\nimport ");
    const endOfLine = content.indexOf("\n", lastImport + 1);
    content =
      content.slice(0, endOfLine + 1) +
      importLine +
      content.slice(endOfLine + 1);
  }

  fs.writeFileSync(filePath, content);
  return { file: filePath, status: "migrated", ...needs };
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith(".jsx")) files.push(p);
  }
  return files;
}

const results = [];
for (const file of walk(PAGES)) {
  results.push(migrateFile(file));
}

const migrated = results.filter((r) => r.status === "migrated");
const unchanged = results.filter((r) => r.status === "unchanged");
const already = results.filter((r) => r.status === "already");

console.log(`Migrated: ${migrated.length}`);
console.log(`Already done: ${already.length}`);
console.log(`Unchanged (non-standard or manual): ${unchanged.length}`);
if (unchanged.length) {
  console.log("\nUnchanged files:");
  unchanged.forEach((r) =>
    console.log(" ", r.file.replace(ROOT + path.sep, "")),
  );
}
