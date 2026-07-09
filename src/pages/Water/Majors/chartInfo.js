import { definePageCharts } from "../../../chartRegistry/helpers.js";

export const MAJORS_ROUTE = "water/majors";

export const MAJORS_SEARCH_PATH = {
  path_ge: "საქართველოს მთავარი მდინარეები და ტბები",
  path_en: "Main Rivers and Lakes of Georgia",
};

const chartDefinitions = [
  {
    "title_ge": "ძირითადი მდინარეები (სიგრძე ქვეყნის ტერიტორიაზე)",
    "title_en": "Major rivers (length within the country)"
  },
  {
    "title_ge": "ძირითადი ტბები და წყალსაცავები",
    "title_en": "Major lakes and reservoirs"
  }
];

export const majorsChartInfo = definePageCharts(
  MAJORS_ROUTE,
  MAJORS_SEARCH_PATH,
  chartDefinitions
);
