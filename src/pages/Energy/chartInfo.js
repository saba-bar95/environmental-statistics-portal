import { definePageCharts } from "../../chartRegistry/helpers.js";

export const ENERGY_ROUTE = "energy";

export const ENERGY_SEARCH_PATH = {
  path_ge: "საქართველოს ენერგეტიკის გარემოსდაცვითი მაჩვენებლები",
  path_en: "environmental performance of georgian energy sector",
};

const chartDefinitions = [
  {
    "title_ge": "ენერგიის საბოლოო მოხმარების ზრდა სექტორების მიხედვით",
    "title_en": "Final Energy Consumption Growth by Sectors"
  },
  {
    "title_ge": "ენერგიის საბოლოო მოხმარების სტრუქტურა",
    "title_en": "Structure of Final Energy Consumption"
  },
  {
    "title_ge": "სექტორების წილი ენერგიის საბოლოო მოხმარებაში (%)",
    "title_en": "Share of Sectors in Final Energy Consumption"
  },
  {
    "title_ge": "პირველადი ენერგომომარაგების შემადგენლობა",
    "title_en": "Composition of Primary Energy Supply"
  },
  {
    "title_ge": "ენერგიის წარმოება vs. ვაჭრობა",
    "title_en": "Energy Production vs. Trade"
  },
  {
    "title_ge": "ენერგოინტენსივობა მშპ-სთან მიმართებით",
    "title_en": "Energy Intensity in Relation to GDP"
  },
  {
    "title_ge": "ენერგოინტენსივობის წლიური ცვლილება",
    "title_en": "Annual Change in Energy Intensity"
  },
  {
    "title_ge": "განახლებადი ენერგიის მიწოდების ზრდა ტიპების მიხედვით",
    "title_en": "Renewable Energy Supply Growth by Type"
  },
  {
    "title_ge": "განახლებადი ენერგიის სტრუქტურა",
    "title_en": "Renewable Energy Structure"
  },
  {
    "title_ge": "განახლებადი ენერგიის წილი მთლიან ენერგომომარაგებაში",
    "title_en": "Share of Renewable Energy in Total Energy Supply"
  }
];

export const energyChartInfo = definePageCharts(
  ENERGY_ROUTE,
  ENERGY_SEARCH_PATH,
  chartDefinitions
);
