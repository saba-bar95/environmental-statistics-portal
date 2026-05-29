/**
 * Checks rendered chart counts on pages and that Emissions search metadata is in sync.
 * Run: npm run audit:charts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pagesDir = path.join(root, "src/assets/components/Pages");

/**
 * Documented expectations. Update when Charts.jsx or page chart lists change.
 * search = entries in Charts.jsx (or page chartInfo export)
 * rendered = chart components on the page
 */
const routes = [
  { key: "climate/disasters", search: 9, rendered: 9, file: "Climate/Disasters/Disasters.jsx" },
  { key: "climate/temperature", search: 6, rendered: 6, file: "Climate/Temperature/Temperature.jsx" },
  {
    key: "climate/precipitation",
    search: 11,
    rendered: 10,
    file: "Climate/Precipitation/Precipitation.jsx",
    note: "ChartInfo[7] ScatterCharts is commented out in JSX",
  },
  { key: "climate/emissions", search: 12, rendered: 12, file: "Climate/Emissions/Emissions.jsx", fromChartInfo: true },
  { key: "air", search: 3, rendered: 3, file: "Air/Air.jsx" },
  { key: "energy", search: 10, rendered: 10, file: "Energy/Energy.jsx" },
  { key: "transport", search: 10, rendered: 10, file: "Transport/Transport.jsx" },
  { key: "waste", search: 6, rendered: 6, file: "Waste/Waste.jsx" },
  { key: "other", search: 6, rendered: 6, file: "Other/Other.jsx" },
  { key: "reports", search: 11, rendered: 11, file: "Reports/Reports.jsx" },
  { key: "water/majors", search: 2, rendered: 2, file: "Water/Majors/Majors.jsx" },
  { key: "water/protection", search: 5, rendered: 5, file: "Water/Protection/Protection.jsx" },
  { key: "water/supplyandlosses", search: 13, rendered: 13, file: "Water/SupplyAndLosses/SupplyAndLosses.jsx" },
  {
    key: "biodiversity/protectedareas",
    search: 8,
    rendered: 7,
    file: "Biodiversity/ProtectedAreas/ProtectedAreas.jsx",
    note: "info[0] is map/header metadata, not a chart wrapper",
  },
  {
    key: "biodiversity/forestarea/forestresources",
    search: 3,
    rendered: 3,
    file: "Biodiversity/ForestArea/ForestResources/ForestResources.jsx",
  },
  {
    key: "biodiversity/forestandfieldfires",
    search: 1,
    rendered: 1,
    file: "Biodiversity/ForestAndFieldFires/ForestAndFieldFires.jsx",
  },
];

function countRenderedChartBindings(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const patterns = [
    /chartInfo=\{ChartInfo\[\d+\]\}/g,
    /chartInfo=\{Charts\.[\w.]+\[\d+\]\}/g,
    /chartInfo=\{info\[\d+\]\}/g,
    /chartInfo=\{info\d\[\d+\]\}/g,
  ];
  let max = 0;
  for (const re of patterns) {
    max = Math.max(max, (content.match(re) ?? []).length);
  }
  return max;
}

async function main() {
  const chartInfoUrl = pathToFileURL(
    path.join(root, "src/assets/components/Pages/Climate/Emissions/chartInfo.js")
  ).href;
  const { emissionsChartInfo, emissionsSearchCharts } = await import(chartInfoUrl);

  console.log("Chart registry audit\n");

  if (emissionsChartInfo.length !== emissionsSearchCharts.length) {
    console.log(
      `FAIL  emissions chartInfo (${emissionsChartInfo.length}) !== search export (${emissionsSearchCharts.length})`
    );
  } else {
    console.log(`OK    emissions chartInfo ↔ search export (${emissionsChartInfo.length} charts)`);
  }

  let issues = 0;
  console.log("\nRoute checks (rendered vs documented expectations):\n");

  for (const route of routes) {
    const filePath = path.join(pagesDir, route.file);
    const rendered = countRenderedChartBindings(filePath);
    const search = route.fromChartInfo ? emissionsSearchCharts.length : route.search;
    const searchOk = !route.fromChartInfo || search === route.search;
    const renderedOk = rendered === route.rendered;
    const ok = searchOk && renderedOk;

    if (!ok) issues++;
    console.log(
      `${ok ? "OK" : "WARN"}  ${route.key.padEnd(42)} search=${String(search).padStart(2)}  rendered=${String(rendered).padStart(2)}`
    );
    if (route.note) console.log(`       note: ${route.note}`);
  }

  console.log(
    issues
      ? `\n${issues} route(s) differ from expectations — update scripts/audit-charts.mjs or fix Charts.jsx.`
      : "\nAll checked routes match expectations."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
