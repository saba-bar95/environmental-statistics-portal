import { definePageCharts } from "../../../../../chartRegistry/helpers.js";

export const PROTECTED_AREAS_ROUTE = "biodiversity/protectedareas";

export const PROTECTED_AREAS_SEARCH_PATH = {
  path_ge: "საქართველოს დაცული ტერიტორიები",
  path_en: "Protected Areas of Georgia",
};

const chartDefinitions = [
  {
    "title_ge": "საქართველოს დაცული ტერიტორიები",
    "title_en": "Protected Areas of Georgia",
    "search": false,
    "chartID": "protected-areas-map"
  },
  {
    "title_ge": "ძირითადი მტაცებლები",
    "title_en": "Key Predators"
  },
  {
    "title_ge": "ძირითადი ბალახისმჭამელები",
    "title_en": "Key Herbivores"
  },
  {
    "title_ge": "ქურციკის პოპულაციის აღდგენა",
    "title_en": "Restoration of The Kurtsik Population"
  },
  {
    "title_ge": "ძუძუმწოვრები დაცულ ტერიტორიებზე",
    "title_en": "Mammal in Protected Areas of Georgia"
  },
  {
    "title_ge": "ძირითადი მტაცებელი ფრინველები",
    "title_en": "Population of Major Birds of Prey"
  },
  {
    "title_ge": "როჭო, ხოხობი, კაკაბი - პოპულაციების ტენდენცია",
    "title_en": "Caucasian grouse, Pheasant, Rock partridge - population trends"
  },
  {
    "title_ge": "ფრინველები დაცულ ტერიტორიებზე",
    "title_en": "Bird in Protected Areas of Georgia"
  }
];

export const protectedAreasChartInfo = definePageCharts(
  PROTECTED_AREAS_ROUTE,
  PROTECTED_AREAS_SEARCH_PATH,
  chartDefinitions
);
