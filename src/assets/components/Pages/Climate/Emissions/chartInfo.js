import { definePageCharts } from "../../../../../chartRegistry/helpers.js";

/** Search route segment (used by SearchBar → `/${lang}/${path}#${chartID}`) */
export const EMISSIONS_ROUTE = "climate/emissions";

export const EMISSIONS_SEARCH_PATH = {
  path_ge: "სათბურის აირების გაფრქვევები საქართველოში",
  path_en: "Greenhouse Gas Emissions in Georgia",
};

/**
 * Single source of truth for Emissions charts (page + search).
 * When adding a chart: append here, render it in Emissions.jsx, and give the wrapper `id={chartInfo.chartID}`.
 */
const emissionsCharts = [
  {
    title_ge: "სათბურის გაზების ემისიები ძირითადი აირების მიხედვით",
    title_en: "Greenhouse Gas Emissions by Major Gases",
    unit_ge: "მეგატონა",
    unit_en: "Megatonne",
    colors: ["#2ca02c", "#d62728", "#1f77b4"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [0, 1, 2],
    chartID: "ghg-emissions-by-gas",
  },
  {
    title_ge: "ჯამური და წმინდა ემისიები (LULUCF-ის ჩათვლით)",
    title_en: "Total vs. Net Emissions (including LULUCF)",
    unit_ge: "მეგატონა (CO2 ეკვივალენტი)",
    unit_en: "Megatonne (CO2 equivalent)",
    colors: ["#ff7f0e", "#55c079ff"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [6, 8],
    chartID: "ghg-total-vs-net-emissions",
  },
  {
    title_ge: "ემისიები სექტორების მიხედვით",
    title_en: "Emissions by Sector",
    unit_ge: "მეგატონა",
    unit_en: "Megatonne",
    colors: ["#ff7f0e", "#9467bd", "#8c564b", "#e377c2"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [9, 13, 15, 17],
    chartID: "ghg-emissions-by-sector-pie",
  },
  {
    title_ge: "სექტორების წილი ჯამურ ემისიებში",
    title_en: "Sector Share in Total Emissions",
    unit_ge: "მეგატონა",
    unit_en: "Megatonne",
    colors: ["#ff7f0e", "#9467bd", "#8c564b", "#e377c2"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [9, 13, 15, 17],
    chartID: "ghg-sector-contribution-percent",
  },
  {
    title_ge: "ემისიები წვისა და სამრეწველო პროცესებიდან",
    title_en: "Emissions from Combustion and Industrial Processes",
    unit_ge: "მეგატონა",
    unit_en: "Megatonne",
    colors: ["#17becf", "#bcbd22", "#7f7f7f"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [10, 11, 12],
    chartID: "ghg-combustion-industrial-bar",
  },
  {
    title_ge: "LULUCF სექტორის ემისიების/შთანთქმის სალდო",
    title_en: "LULUCF Sector Emissions/Removals Balance",
    unit_ge: "მეგატონა (CO2 ეკვივალენტი)",
    unit_en: "Megatonne (CO2 equivalent)",
    colors: ["#2ca02c"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [7],
    chartID: "ghg-lulucf-balance",
  },
  {
    title_ge: "ჯამური ემისიები მშპ-სთან მიმართებაში",
    title_en: "Total Emissions vs. GDP",
    unit_ge: "მეგატონა / მლრდ. საერთ. დოლარი",
    unit_en: "Megatonne / Billion Intl. Dollar",
    colors: ["#8884d8"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [6, 22],
    chartID: "ghg-emissions-vs-gdp-scatter",
  },
  {
    title_ge: "HFC ემისიები დროში",
    title_en: "HFC Emissions Over Time",
    unit_ge: "კილოტონა",
    unit_en: "kt",
    colors: ["#e74c3c"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [3],
    chartID: "ghg-hfc-emissions-scatter",
  },
  {
    title_ge: "ძირითადი ინდიკატორების დინამიკა",
    title_en: "Dynamics of Key Indicators",
    unit_ge: "შესაბამისი ერთეულები",
    unit_en: "Respective Units",
    colors: ["#ff7f0e", "#8c564b", "#9467bd"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [6, 18, 22],
    chartID: "ghg-key-indicators-dynamics",
  },
  {
    title_ge: "სათბურის გაზების ემისიები სექტორების ტიპის მიხედვით",
    title_en: "Greenhouse Gas Emissions by sector",
    unit_ge: "მეგატონა CO2 ეკვივალენტი",
    unit_en: "Megatonne of CO2 Equivalent",
    colors: ["#3498DB", "#5DADE2", "#85C1E9", "#AED6F1"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [9, 13, 15, 17],
    chartID: "ghg-emissions-by-gas-type-area",
  },
  {
    title_ge: "საწვავის წვა სტაციონარულ და მობილურ წყაროებში",
    title_en: "Fuel Combustion in Stationary vs. Mobile Sources",
    unit_ge: "მეგატონა",
    unit_en: "Megatonne",
    colors: ["#C0392B", "#F1C40F"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [10, 11],
    chartID: "ghg-fuel-combustion-sources-line",
  },
  {
    title_ge: "ემისიები ერთ სულ მოსახლეზე და მშპ-ს ერთეულზე",
    title_en: "Emissions per Capita and per Unit of GDP",
    unit_ge: "ტონა/სულზე | ტონა/1000$ (მუპ)",
    unit_en: "Tonne/Capita | Tonne/1000$ (PPP)",
    colors: ["#8E44AD", "#16A085"],
    id: "greenhouse-gas-emissions",
    types: ["data", "metadata"],
    selectedIndices: [19, 23],
    chartID: "ghg-emissions-per-capita-and-gdp",
  },
];

export const emissionsChartInfo = definePageCharts(
  EMISSIONS_ROUTE,
  EMISSIONS_SEARCH_PATH,
  emissionsCharts
);
