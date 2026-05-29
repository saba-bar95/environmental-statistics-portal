/**
 * Chart registry entry point.
 * searchIndex is populated at import time — no page visit or React state required.
 */
export { default, searchIndex } from "./buildCharts.js";
export { normalizeCharts } from "./normalize.js";
export {
  withSearchPath,
  toSearchEntries,
  definePageCharts,
  withRoute,
} from "./helpers.js";
export { flattenChartsForSearch } from "./flattenSearchIndex.js";
