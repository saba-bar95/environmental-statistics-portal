import { normalizeCharts } from "./normalize.js";

/**
 * Attach breadcrumb labels used in SearchBar results.
 * @param {Array<Record<string, unknown>>} charts
 * @param {{ path_ge: string, path_en: string }} paths
 */
export function withSearchPath(charts, paths) {
  return charts.map((chart) => ({ ...chart, ...paths }));
}

/**
 * Define charts for a page: search paths + stable chartIDs (via normalizeCharts).
 * @param {string} route - URL segment, e.g. "climate/emissions" or "air"
 * @param {{ path_ge: string, path_en: string }} searchPath
 * @param {Array<Record<string, unknown>>} charts
 */
export function definePageCharts(route, searchPath, charts) {
  const withPaths = withSearchPath(charts, searchPath);
  const prefix = route.replace(/\//g, "-");
  return normalizeCharts(withPaths, prefix);
}

/**
 * Fields required for search indexing (flat list).
 */
export function toSearchEntries(charts) {
  return charts.map(
    ({ title_ge, title_en, path_ge, path_en, chartID, path }) => ({
      title_ge,
      title_en,
      path_ge,
      path_en,
      chartID,
      ...(path ? { path } : {}),
    })
  );
}

/**
 * Attach route path for flat search index entries.
 */
export function withRoute(charts, route) {
  return charts.map((chart) => ({ ...chart, path: route }));
}