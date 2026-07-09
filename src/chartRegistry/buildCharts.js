/**
 * Assembles the full chart registry at module load time (no React state).
 * SearchBar imports searchIndex — all charts are available before any page mounts.
 */
import { flattenChartsForSearch } from "./flattenSearchIndex.js";

import { otherChartInfo } from "../pages/Other/chartInfo.js";
import { wasteChartInfo } from "../pages/Waste/chartInfo.js";
import { transportChartInfo } from "../pages/Transport/chartInfo.js";
import { energyChartInfo } from "../pages/Energy/chartInfo.js";
import { airChartInfo } from "../pages/Air/chartInfo.js";
import { reportsChartInfo } from "../pages/Reports/chartInfo.js";
import { disastersChartInfo } from "../pages/Climate/Disasters/chartInfo.js";
import { temperatureChartInfo } from "../pages/Climate/Temperature/chartInfo.js";
import { precipitationChartInfo } from "../pages/Climate/Precipitation/chartInfo.js";
import { emissionsChartInfo } from "../pages/Climate/Emissions/chartInfo.js";
import { majorsChartInfo } from "../pages/Water/Majors/chartInfo.js";
import { protectionChartInfo } from "../pages/Water/Protection/chartInfo.js";
import { supplyAndLossesChartInfo } from "../pages/Water/SupplyAndLosses/chartInfo.js";
import { protectedAreasChartInfo } from "../pages/Biodiversity/ProtectedAreas/chartInfo.js";
import { forestResourcesChartInfo } from "../pages/Biodiversity/ForestArea/ForestResources/chartInfo.js";
import { forestAndFieldFiresChartInfo } from "../pages/Biodiversity/ForestAndFieldFires/chartInfo.js";

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
