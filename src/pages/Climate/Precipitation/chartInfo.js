import { definePageCharts } from "../../../chartRegistry/helpers.js";

export const PRECIPITATION_ROUTE = "climate/precipitation";

export const PRECIPITATION_SEARCH_PATH = {
  path_ge: "ატმოსფერული ნალექები",
  path_en: "Atmospheric Precipitation",
};

const chartDefinitions = [
  {
    "title_ge": "წლიური ნალექების ტენდენცია საქართველოში",
    "title_en": "Annual comparison in Georgia"
  },
  {
    "title_ge": "გადახრა 1961-1990 წლების საშუალოდან",
    "title_en": "Deviation from the 1961-1990 average"
  },
  {
    "title_ge": "თვიური ნალექების დიაპაზონი",
    "title_en": "Monthly precipitation range"
  },
  {
    "title_ge": "წლიური ნალექები ქვეყნის, თბილისის და ყველაზე უხვი და მცირე ნალექიანი რეგიონების მიხედვით",
    "title_en": "Annual precipitation by region, Tbilisi, Georgia, with the most and least precipitation"
  },
  {
    "title_ge": "ისტორიული საშუალო ნალექიანობა რეგიონების მიხედვით (1961-1990)",
    "title_en": "Historical average precipitation by region (1961-1990)"
  },
  {
    "title_ge": "ნალექიანობის ექსტრემალური წლები",
    "title_en": "Extreme precipitation years"
  },
  {
    "title_ge": "თვიური ნალექების დიაპაზონი რეგიონების მიხედვით",
    "title_en": "Monthly precipitation range by region"
  },
  {
    "title_ge": "წლიური vs. მაქსიმალური თვიური ნალექი",
    "title_en": "Annual vs. Maximum Monthly Precipitation",
    "search": false
  },
  {
    "title_ge": "ექსტრემალური მაჩვენებლების ტენდენცია საქართველოში",
    "title_en": "Trend of extreme indicators in Georgia"
  },
  {
    "title_ge": "მიმდინარე წლის ნალექები ისტორიულ საშუალოსთან შედარებით",
    "title_en": "Current year precipitation compared to historical average"
  },
  {
    "title_ge": "წლიური ნალექების თერმული რუკა (საქართველო)",
    "title_en": "Thermal map of annual precipitation (Georgia)"
  },
  {
    "title_ge": "ნალექების დეტალური მონაცემები (2022)",
    "title_en": "Detailed precipitation data (2022)"
  }
];

export const precipitationChartInfo = definePageCharts(
  PRECIPITATION_ROUTE,
  PRECIPITATION_SEARCH_PATH,
  chartDefinitions
);
