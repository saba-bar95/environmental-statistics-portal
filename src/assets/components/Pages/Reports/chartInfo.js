import { definePageCharts } from "../../../../chartRegistry/helpers.js";

export const REPORTS_ROUTE = "reports";

export const REPORTS_SEARCH_PATH = {
  path_ge: "მატერიალური ნაკადის ანგარიშები",
  path_en: "Material Flow Accounts",
};

const chartDefinitions = [
  {
    "title_ge": "შიდა მატერიალური მოხმარება და მშპ ",
    "title_en": "Domestic Material Consumption and GDP"
  },
  {
    "title_ge": "რესურსების პროდუქტიულობა და მატერიალური ინტენსივობა",
    "title_en": "Resource Productivity and Material Intensity"
  },
  {
    "title_ge": "შიდა მატერიალური მოხმარება (შმმ) ერთ სულ მოსახლეზე",
    "title_en": "Domestic Material Consumption (DMC) per Capita"
  },
  {
    "title_ge": "ადგილობრივი მოპოვება ტიპების მიხედვით",
    "title_en": "Domestic Extraction by Types"
  },
  {
    "title_ge": "იმპორტის სტრუქტურა",
    "title_en": "Import Structure"
  },
  {
    "title_ge": "ექსპორტის სტრუქტურა",
    "title_en": "Export Structure"
  },
  {
    "title_ge": "ფიზიკური სავაჭრო ბალანსის (ფსბ) ტენდენცია",
    "title_en": "Physical Trade Balance (PTB) Trend"
  },
  {
    "title_ge": "ფსბ მასალების ტიპების მიხედვით",
    "title_en": "Physical Trade Balance (PTB) by Material Type"
  },
  {
    "title_ge": "წიაღისეული საწვავის ფიზიკური სავაჭრო ბალანსი",
    "title_en": "Fossil Fuels (PTB)"
  },
  {
    "title_ge": "ბიომასის მატერიალური ნაკადები",
    "title_en": "Biomass Material Flows"
  },
  {
    "title_ge": "ლითონის მადნების სავაჭრო ბალანსი",
    "title_en": "Metal Ores Trade Balance"
  }
];

export const reportsChartInfo = definePageCharts(
  REPORTS_ROUTE,
  REPORTS_SEARCH_PATH,
  chartDefinitions
);
