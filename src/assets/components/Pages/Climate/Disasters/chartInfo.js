import { definePageCharts } from "../../../../../chartRegistry/helpers.js";

export const DISASTERS_ROUTE = "climate/disasters";

export const DISASTERS_SEARCH_PATH = {
  path_ge: "სტიქიური მოვლენები საქართველოში",
  path_en: "Natural Disasters in Georgia",
};

const chartDefinitions = [
  {
    "title_ge": "გეოლოგიური მოვლენების (მეწყერი, ღვარცოფი) რაოდენობა",
    "title_en": "Number of occurred geological phenomena (landslides, mudflows)"
  },
  {
    "title_ge": "ჰიდრომეტეოროლოგიური მოვლენების ყოველთვიური რუკა",
    "title_en": "Monthly map of hydrometeorological events"
  },
  {
    "title_ge": "გეოლოგიური მოვლენები და მასთან დაკავშირებული სიკვდილიანობა",
    "title_en": "Geological events and related mortality"
  },
  {
    "title_ge": "წლიური ჰიდრომეტეოროლოგიური მოვლენები ტიპების მიხედვით",
    "title_en": "Annual hydrometeorological events by type"
  },
  {
    "title_ge": "სეზონური სტიქიური მოვლენები",
    "title_en": "Seasonal Natural Disasters"
  },
  {
    "title_ge": "სტიქიური მოვლენების ჯამური შემთხვევები და სიკვდილიანობა",
    "title_en": "Natural Disaster Profile: Total Incidents and Mortality"
  },
  {
    "title_ge": "გეოლოგიური და ჰიდრომეტეოროლოგიური მოვლენების ტენდენციები",
    "title_en": "Trends in geological and hydrometeorological events"
  },
  {
    "title_ge": "ზეგავლენა ინფრასტრუქტურასა და დასახლებულ პუნქტებზე",
    "title_en": "Impact on infrastructure and settlements"
  },
  {
    "title_ge": "გეოლოგიური კატასტროფები ათწლეულების ჭრილში (ჯამური შემთხვევები)",
    "title_en": "Geological disasters by decade (total number of incidents)"
  }
];

export const disastersChartInfo = definePageCharts(
  DISASTERS_ROUTE,
  DISASTERS_SEARCH_PATH,
  chartDefinitions
);
