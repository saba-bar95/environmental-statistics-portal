import { definePageCharts } from "../../chartRegistry/helpers.js";

export const OTHER_ROUTE = "other";

export const OTHER_SEARCH_PATH = {
  path_ge: "სხვა გარემოსდაცვითი თემები",
  path_en: "other environmental topics",
};

const chartDefinitions = [
  {
    "title_ge": "პესტიციდების ჯამური მოხმარების დინამიკა",
    "title_en": "Dynamics of Total Pesticide Consumption"
  },
  {
    "title_ge": "პესტიციდების ინტენსივობა",
    "title_en": "Pesticide Intensity"
  },
  {
    "title_ge": "პესტიციდების მოხმარება ტიპების მიხედვით (ტონა)",
    "title_en": "Pesticide Consumption by Type (tons)"
  },
  {
    "title_ge": "მინერალური და ორგანული სასუქების გამოყენება",
    "title_en": "Use of Mineral and Organic Fertilizers"
  },
  {
    "title_ge": "სასუქების ჯამური ინტენსივობა",
    "title_en": "Total Fertilizer Intensity"
  },
  {
    "title_ge": "დამუშავებული სასოფლო-სამეურნეო ფართობი",
    "title_en": "Cultivated agricultural area"
  }
];

export const otherChartInfo = definePageCharts(
  OTHER_ROUTE,
  OTHER_SEARCH_PATH,
  chartDefinitions
);
