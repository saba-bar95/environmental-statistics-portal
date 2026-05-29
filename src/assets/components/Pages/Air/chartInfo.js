import { definePageCharts } from "../../../../chartRegistry/helpers.js";

export const AIR_ROUTE = "air";

export const AIR_SEARCH_PATH = {
  path_ge: "ჰაერის ხარისხი და გაფრქვევები",
  path_en: "air quality and emissions",
};

const chartDefinitions = [
  {
    "title_ge": "სტაციონარული წყაროებიდან მავნე ნივთიერებების დაჭერა და გაფრქვევა რეგიონების მიხედვით",
    "title_en": "Capture and emission of stationary sources of financial resources by regions"
  },
  {
    "title_ge": "სტაციონარული წყაროებიდან მავნე ნივთიერებების დაჭერა და გაფრქვევა ქალაქების მიხედვით",
    "title_en": "Capture and emission of stationary sources of financial resources by cities"
  },
  {
    "title_ge": "მავნე ნივთიერებების გაფრქვევა: სტაციონარული და მობილური წყაროები",
    "title_en": "Security Council Dispersion: Stationary and Mobile Sources"
  }
];

export const airChartInfo = definePageCharts(
  AIR_ROUTE,
  AIR_SEARCH_PATH,
  chartDefinitions
);
