import { definePageCharts } from "../../chartRegistry/helpers.js";

export const TRANSPORT_ROUTE = "transport";

export const TRANSPORT_SEARCH_PATH = {
  path_ge: "ტრანსპორტის სტატისტიკა",
  path_en: "transport statistics",
};

const chartDefinitions = [
  {
    "title_ge": "მგზავრთბრუნვა",
    "title_en": "Passenger Transport Demand"
  },
  {
    "title_ge": "ტვირთბრუნვა",
    "title_en": "Freight Transport Demand"
  },
  {
    "title_ge": "სამგზავრო გადაყვანები ტრანსპორტის სახეების მიხედვით",
    "title_en": "Passenger Transfers by Type of Transport"
  },
  {
    "title_ge": "სატვირთო გადაზიდვები ტრანსპორტის სახეების მიხედვით",
    "title_en": "Freight Transfers by Type of Transport"
  },
  {
    "title_ge": "სამგზავრო გადაყვანების განაწილება",
    "title_en": "Distribution of Passenger Transfers"
  },
  {
    "title_ge": "სატვირთო გადაზიდვების განაწილება",
    "title_en": "Distribution of Freight Transfers"
  },
  {
    "title_ge": "სატვირთო გადაზიდვების ინტენსივობა მშპ-სთან მიმართებით",
    "title_en": "Freight transport intensity in relation to GDP"
  },
  {
    "title_ge": "სამგზავრო გადაყვანებზე მოთხოვნა ერთ სულ მოსახლეზე",
    "title_en": "Per Capita Demand for Passenger Transport"
  },
  {
    "title_ge": "საავტომობილო ტრანსპორტი: სამგზავრო და სატვირთოს შედარება",
    "title_en": "Road transport: comparison of passenger and freight transport"
  },
  {
    "title_ge": "სარკინიგზო ტრანსპორტი: სამგზავრო და სატვირთოს შედარება",
    "title_en": "Rail transport: passenger and freight comparison"
  }
];

export const transportChartInfo = definePageCharts(
  TRANSPORT_ROUTE,
  TRANSPORT_SEARCH_PATH,
  chartDefinitions
);
