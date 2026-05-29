import { definePageCharts } from "../../../../chartRegistry/helpers.js";

export const WASTE_ROUTE = "waste";

export const WASTE_SEARCH_PATH = {
  path_ge: "მუნიციპალური ნარჩენები",
  path_en: "municipal waste",
};

const chartDefinitions = [
  {
    "title_ge": "ნაგავსაყრელზე ჯამურად განთავსებული მუნიციპალური ნარჩენები",
    "title_en": "Total Municipal Waste Disposed Of in Landfills"
  },
  {
    "title_ge": "მუნიციპალური ნარჩენები ერთ სულ მოსახლეზე",
    "title_en": "Municipal waste per capita"
  },
  {
    "title_ge": "ნარჩენების წარმოქმნა მოსახლეობასთან მიმართებით",
    "title_en": "Waste generation in relation to population"
  },
  {
    "title_ge": "ნარჩენების ჯამური რაოდენობის წლიური ზრდა",
    "title_en": "Annual growth in total waste"
  },
  {
    "title_ge": "ნარჩენების ინტენსივობა ერთ სულ მოსახლეზე",
    "title_en": "Waste intensity per capita"
  },
  {
    "title_ge": "მუნიციპალური მყარი ნარჩენების საილუსტრაციო შემადგენლობა",
    "title_en": "Illustrative composition of municipal solid waste"
  }
];

export const wasteChartInfo = definePageCharts(
  WASTE_ROUTE,
  WASTE_SEARCH_PATH,
  chartDefinitions
);
