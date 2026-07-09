import { definePageCharts } from "../../../chartRegistry/helpers.js";

export const FOREST_AND_FIELD_FIRES_ROUTE = "biodiversity/forestandfieldfires";

export const FOREST_AND_FIELD_FIRES_SEARCH_PATH = {
  path_ge: "ტყისა და ველის ხანძრები",
  path_en: "Forest and Field Fires",
};

const chartDefinitions = [
  {
    "title_ge": "ტყისა და ველის ხანძრები რეგიონების მიხედვით",
    "title_en": "Forest and Field Fires by Regions"
  }
];

export const forestAndFieldFiresChartInfo = definePageCharts(
  FOREST_AND_FIELD_FIRES_ROUTE,
  FOREST_AND_FIELD_FIRES_SEARCH_PATH,
  chartDefinitions
);
