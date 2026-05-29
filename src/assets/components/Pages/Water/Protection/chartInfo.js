import { definePageCharts } from "../../../../../chartRegistry/helpers.js";

export const PROTECTION_ROUTE = "water/protection";

export const PROTECTION_SEARCH_PATH = {
  path_ge: "ბუნებრივი ობიექტებიდან წყლის აღების ტენდენციები საქართველოში (2012-2023)",
  path_en: "Trends in Water Abstraction from Natural Sources in Georgia (2012-2023)",
};

const chartDefinitions = [
  {
    "title_ge": "წყლის აღება ბუნებრივი ობიექტებიდან",
    "title_en": "Water extraction from natural sources"
  },
  {
    "title_ge": "წყლის გამოყენება სექტორების მიხედვით",
    "title_en": "Water use by sector"
  },
  {
    "title_ge": "წყლის დანაკარგები ტრანსპორტირებისას და ბრუნვითი და მეორადი მიმდევრობითი წყალმომარაგება",
    "title_en": "Water losses during transportation and circulating and secondary sequential water supply"
  },
  {
    "title_ge": "ჩამდინარე წყლის ჩაშვება ზედაპირული წყლის ობიექტებში, სულ",
    "title_en": "Wastewater discharge into surface water bodies, total"
  },
  {
    "title_ge": "წყლის გამოყენების განაწილება სექტორების მიხედვით, %",
    "title_en": "Distribution of water use by sectors, %"
  }
];

export const protectionChartInfo = definePageCharts(
  PROTECTION_ROUTE,
  PROTECTION_SEARCH_PATH,
  chartDefinitions
);
