import { definePageCharts } from "../../../../../chartRegistry/helpers.js";

export const TEMPERATURE_ROUTE = "climate/temperature";

export const TEMPERATURE_SEARCH_PATH = {
  path_ge: "ჰაერის ტემპერატურა",
  path_en: "Air Temperature",
};

const chartDefinitions = [
  {
    "title_ge": "საშუალო წლიური ტემპერატურა საქართველოში",
    "title_en": "Georgia's average annual temperature"
  },
  {
    "title_ge": "წლიური ტემპერატურული ანომალია საქართველოში, გადახრა 1961-1990 წლების საშუალოდან",
    "title_en": "Georgia's annual temperature anomaly, deviation from the 1961-1990 average"
  },
  {
    "title_ge": "ქვეყნის, თბილისისა და ყველაზე გრილი და თბილი რეგიონების ტემპერატურის ტენდენციები",
    "title_en": "Temperature trends of the coldest and warmest regions of the country and Tbilisi"
  },
  {
    "title_ge": "ექსტრემალური ცვლილებები: თბილისის ყველაზე ცხელი და ცივი თვეების საშუალო ტემპერატურა",
    "title_en": "Extreme changes: Average temperatures of Tbilisi's hottest and coldest months"
  },
  {
    "title_ge": "გურიის პროფილი (საბაზისოსთან შედარებით)",
    "title_en": "Guria Profile (Compared to Baseline)"
  },
  {
    "title_ge": "ყველაზე ცხელი წლები 1990 წლიდან დღემდე: ტოპ 7 ტემპერატურული გადახრის მიხედვით",
    "title_en": "The hottest years since 1990: Top 7 by temperature deviation"
  }
];

export const temperatureChartInfo = definePageCharts(
  TEMPERATURE_ROUTE,
  TEMPERATURE_SEARCH_PATH,
  chartDefinitions
);
