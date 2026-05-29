/**
 * Assembles the full chart registry at module load time (no React state).
 * SearchBar imports searchIndex — all charts are available before any page mounts.
 */
import { flattenChartsForSearch } from "./flattenSearchIndex.js";

import { otherChartInfo } from "../assets/components/Pages/Other/chartInfo.js";
import { wasteChartInfo } from "../assets/components/Pages/Waste/chartInfo.js";
import { transportChartInfo } from "../assets/components/Pages/Transport/chartInfo.js";
import { energyChartInfo } from "../assets/components/Pages/Energy/chartInfo.js";
import { airChartInfo } from "../assets/components/Pages/Air/chartInfo.js";
import { reportsChartInfo } from "../assets/components/Pages/Reports/chartInfo.js";
import { disastersChartInfo } from "../assets/components/Pages/Climate/Disasters/chartInfo.js";
import { temperatureChartInfo } from "../assets/components/Pages/Climate/Temperature/chartInfo.js";
import { precipitationChartInfo } from "../assets/components/Pages/Climate/Precipitation/chartInfo.js";
import { emissionsChartInfo } from "../assets/components/Pages/Climate/Emissions/chartInfo.js";
import { majorsChartInfo } from "../assets/components/Pages/Water/Majors/chartInfo.js";
import { protectionChartInfo } from "../assets/components/Pages/Water/Protection/chartInfo.js";
import { supplyAndLossesChartInfo } from "../assets/components/Pages/Water/SupplyAndLosses/chartInfo.js";
import { protectedAreasChartInfo } from "../assets/components/Pages/Biodiversity/ProtectedAreas/chartInfo.js";
import { forestResourcesChartInfo } from "../assets/components/Pages/Biodiversity/ForestArea/ForestResources/chartInfo.js";
import { forestAndFieldFiresChartInfo } from "../assets/components/Pages/Biodiversity/ForestAndFieldFires/chartInfo.js";

/** Nested structure (backward compatible with Charts.air, Charts.climate[0].disasters, etc.) */
const Charts = {
  other: otherChartInfo,
  waste: wasteChartInfo,
  transport: transportChartInfo,
  energy: energyChartInfo,
  air: airChartInfo,
  reports: reportsChartInfo,
  climate: [
    { disasters: disastersChartInfo },
    { temperature: temperatureChartInfo },
    { precipitation: precipitationChartInfo },
    { emissions: emissionsChartInfo },
  ],
  water: [
    { majors: majorsChartInfo },
    { protection: protectionChartInfo },
    { supplyandlosses: supplyAndLossesChartInfo },
  ],
  biodiversity: [
    { protectedAreas: protectedAreasChartInfo },
    { forestarea: [{ forestResources: forestResourcesChartInfo }] },
    { forestandfieldfires: forestAndFieldFiresChartInfo },
  ],
};

/** Flat list for SearchBar — built once when the app bundle loads */
export const searchIndex = flattenChartsForSearch(Charts).filter(
  (chart) => chart.search !== false
);

export default Charts;
