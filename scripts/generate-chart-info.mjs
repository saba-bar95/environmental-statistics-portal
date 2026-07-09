/**
 * One-time generator: creates page chartInfo.js from legacyRawCharts.js
 * Run: node scripts/generate-chart-info.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { legacyRawCharts } from "../src/chartRegistry/legacyRawCharts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pagesRoot = path.join(root, "src/pages");

function stripPaths(charts) {
  return charts.map(({ title_ge, title_en, chartID, search, ...rest }) => {
    const entry = { title_ge, title_en };
    if (chartID) entry.chartID = chartID;
    if (search === false) entry.search = false;
    return entry;
  });
}

function getSearchPath(charts) {
  const first = charts[0];
  return { path_ge: first.path_ge, path_en: first.path_en };
}

function writeChartInfo({ filePath, exportName, route, searchPath, charts }) {
  const relHelpers = path
    .relative(path.dirname(filePath), path.join(root, "src/chartRegistry"))
    .replace(/\\/g, "/");
  const prefix = exportName.replace(/ChartInfo$/, "");
  const constPrefix = prefix.replace(/([A-Z])/g, "_$1").toUpperCase().replace(/^_/, "");
  const routeConst = `${constPrefix}_ROUTE`;
  const pathConst = `${constPrefix}_SEARCH_PATH`;

  const content = `import { definePageCharts } from "${relHelpers}/helpers.js";

export const ${routeConst} = ${JSON.stringify(route)};

export const ${pathConst} = {
  path_ge: ${JSON.stringify(searchPath.path_ge)},
  path_en: ${JSON.stringify(searchPath.path_en)},
};

const chartDefinitions = ${JSON.stringify(stripPaths(charts), null, 2)};

export const ${exportName} = definePageCharts(
  ${routeConst},
  ${pathConst},
  chartDefinitions
);
`;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log("wrote", path.relative(root, filePath), `(${charts.length} charts)`);
}

const jobs = [
  {
    file: "Other/chartInfo.js",
    exportName: "otherChartInfo",
    route: "other",
    charts: legacyRawCharts.other,
  },
  {
    file: "Waste/chartInfo.js",
    exportName: "wasteChartInfo",
    route: "waste",
    charts: legacyRawCharts.waste,
  },
  {
    file: "Transport/chartInfo.js",
    exportName: "transportChartInfo",
    route: "transport",
    charts: legacyRawCharts.transport,
  },
  {
    file: "Energy/chartInfo.js",
    exportName: "energyChartInfo",
    route: "energy",
    charts: legacyRawCharts.energy,
  },
  {
    file: "Air/chartInfo.js",
    exportName: "airChartInfo",
    route: "air",
    charts: legacyRawCharts.air,
  },
  {
    file: "Reports/chartInfo.js",
    exportName: "reportsChartInfo",
    route: "reports",
    charts: legacyRawCharts.reports,
  },
  {
    file: "Climate/Disasters/chartInfo.js",
    exportName: "disastersChartInfo",
    route: "climate/disasters",
    charts: legacyRawCharts.climate[0].disasters,
  },
  {
    file: "Climate/Temperature/chartInfo.js",
    exportName: "temperatureChartInfo",
    route: "climate/temperature",
    charts: legacyRawCharts.climate[1].temperature,
  },
  {
    file: "Climate/Precipitation/chartInfo.js",
    exportName: "precipitationChartInfo",
    route: "climate/precipitation",
    charts: legacyRawCharts.climate[2].precipitation,
  },
  {
    file: "Water/Majors/chartInfo.js",
    exportName: "majorsChartInfo",
    route: "water/majors",
    charts: legacyRawCharts.water[0].majors,
  },
  {
    file: "Water/Protection/chartInfo.js",
    exportName: "protectionChartInfo",
    route: "water/protection",
    charts: legacyRawCharts.water[1].protection,
  },
  {
    file: "Water/SupplyAndLosses/chartInfo.js",
    exportName: "supplyAndLossesChartInfo",
    route: "water/supplyandlosses",
    charts: legacyRawCharts.water[2].supplyandlosses,
  },
  {
    file: "Biodiversity/ProtectedAreas/chartInfo.js",
    exportName: "protectedAreasChartInfo",
    route: "biodiversity/protectedareas",
    charts: legacyRawCharts.biodiversity[0].protectedAreas,
  },
  {
    file: "Biodiversity/ForestArea/ForestResources/chartInfo.js",
    exportName: "forestResourcesChartInfo",
    route: "biodiversity/forestarea/forestresources",
    charts: legacyRawCharts.biodiversity[1].forestarea[0].forestResources,
  },
  {
    file: "Biodiversity/ForestAndFieldFires/chartInfo.js",
    exportName: "forestAndFieldFiresChartInfo",
    route: "biodiversity/forestandfieldfires",
    charts: legacyRawCharts.biodiversity[2].forestandfieldfires,
  },
];

for (const job of jobs) {
  writeChartInfo({
    filePath: path.join(pagesRoot, job.file),
    exportName: job.exportName,
    route: job.route,
    searchPath: getSearchPath(job.charts),
    charts: job.charts,
  });
}

console.log("\nDone. Update Emissions/chartInfo.js manually if needed.");
