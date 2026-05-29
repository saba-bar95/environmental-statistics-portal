import { definePageCharts } from "../../../../../chartRegistry/helpers.js";

export const SUPPLY_AND_LOSSES_ROUTE = "water/supplyandlosses";

export const SUPPLY_AND_LOSSES_SEARCH_PATH = {
  path_ge: "წყალმომარაგება, დანაკარგები და შინამეურნეობების მიერ წყლის მოხმარება",
  path_en: "Water supply, losses and household water consumption",
};

const chartDefinitions = [
  {
    "title_ge": "წყალმომარაგების სისტემაში გაშვებული და აბონენტებისთვის მიწოდებული წყლის მოცულობა",
    "title_en": "Gross volume and net volume of water supplied by water supply industry"
  },
  {
    "title_ge": "წყლის დანაკარგები ტრანსპორტირებისას (%)",
    "title_en": "Water losses during transportation (%)"
  },
  {
    "title_ge": "წყალმომარაგების სისტემაზე მიერთებული მოსახლეობა vs. მოსახლეობა თვითმიწოდებით",
    "title_en": "Population connected to the water supply system vs. population with self-supply"
  },
  {
    "title_ge": "წყალმომარაგების სისტემაზე მიერთებული მოსახლეობის %",
    "title_en": "Percentage of population connected to the water supply system"
  },
  {
    "title_ge": "შინამეურნეობების მიერ წყლის მოხმარება ერთ სულზე (მ³/წელი)",
    "title_en": "Water use per capita by households (m³/year)”"
  },
  {
    "title_ge": "შინამეურნეობების მიერ წყლის მოხმარება მიწოდების წყაროების მიხედვით (მლნ მ³)",
    "title_en": "Households water use by water supply sources"
  },
  {
    "title_ge": "შინამეურნეობებისთვის მიწოდებული წყალი და მიერთებული მოსახლეობა",
    "title_en": "Water supplied to households and connected population"
  },
  {
    "title_ge": "წყალმომარაგების სისტემაზე მიერთებული მოსახლეობის განაწილება (მლნ)",
    "title_en": "Distribution of population connected to the water supply system (million)"
  },
  {
    "title_ge": "წყალარინების ქსელზე და ჩამდინარე წყლის გამწმენდ ნაგებობაზე მიერთებული მოსახლეობის %",
    "title_en": "Share of population connected to wastewater collecting system and wastewater treatment facilities (%)"
  },
  {
    "title_ge": "მოსახლეობის რაოდენობა ჩამდინარე წყლის გაწმენდის ტიპის მიხედვით (მლნ)",
    "title_en": "Distribution of population connected to wastewater treatment and sewage systems by type (million)"
  },
  {
    "title_ge": "მოსახლეობა ჩამდინარე წყლის გაწმენდის ტიპის მიხედვით (%)",
    "title_en": "Share of population connected to wastewater treatment facilities by type (%)"
  },
  {
    "title_ge": "წყალარინების ქსელზე მიერთებული მოსახლეობა, ჩამდინარე წყლის გაწმენდის გარეშე",
    "title_en": "Population connected to wastewater collecting system without subsequent treatment"
  },
  {
    "title_ge": "წყალმომარაგების სისტემაზე მიერთებული მოსახლეობა, წყალარინების ქსელზე მიერთების გარეშე",
    "title_en": "Population connected to water supply industry without connection to a wastewater collecting system"
  }
];

export const supplyAndLossesChartInfo = definePageCharts(
  SUPPLY_AND_LOSSES_ROUTE,
  SUPPLY_AND_LOSSES_SEARCH_PATH,
  chartDefinitions
);
