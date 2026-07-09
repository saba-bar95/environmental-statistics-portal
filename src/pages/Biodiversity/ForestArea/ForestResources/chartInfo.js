import { definePageCharts } from "../../../../chartRegistry/helpers.js";

export const FOREST_RESOURCES_ROUTE = "biodiversity/forestarea/forestresources";

export const FOREST_RESOURCES_SEARCH_PATH = {
  path_ge: "ტყის რესურსები",
  path_en: "Forest Resources",
};

const chartDefinitions = [
  {
    "title_ge": "მოჭრილი მერქნის მოცულობა, უკანონო ჭრა და ტყის განახლება საქართველოში (2013–2023)",
    "title_en": "Volume of harvested timber, illegal logging and forest regeneration in Georgia (2013–2023)"
  },
  {
    "title_ge": "ტყის ფონდის შემადგენლობა",
    "title_en": "Composition of forest area"
  },
  {
    "title_ge": "მოჭრილი მერქანი ჭრის მიზნისა და ტყის ტიპის მიხედვით",
    "title_en": "Logged timber by cutting purpose and forest type"
  }
];

export const forestResourcesChartInfo = definePageCharts(
  FOREST_RESOURCES_ROUTE,
  FOREST_RESOURCES_SEARCH_PATH,
  chartDefinitions
);
