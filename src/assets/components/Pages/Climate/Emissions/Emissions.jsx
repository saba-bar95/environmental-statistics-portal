import { useParams } from "react-router-dom";
import { useScrollToChartHash } from "../../../../../hooks/useScrollToChartHash.js";
import backgroundImg from "./Background/background.webp";
// --- Import all chart components ---
import LineChart1 from "./Charts/Chart1/LineCharts.jsx";
import AreaCharts from "./Charts/Chart2/AreaCharts.jsx";
import PieCharts from "./Charts/Chart3/PieCharts.jsx";
import AreaCharts5 from "./Charts/Chart5/AreaCharts.jsx";
import LineCharts4 from "./Charts/Chart4/LineCharts4.jsx";
import BarCharts from "./Charts/Chart6/BarCharts.jsx";
import HorizontalBarCharts from "./Charts/Chart7/HorizontalBarCharts.jsx";
import ScatterCharts from "./Charts/Chart8/ScatterChart.jsx";
import ScatterChart9 from "./Charts/Chart9/ScatterChart.jsx";
import LineChart2 from "./Charts/Chart10/LineChart2.jsx";
// --- 1. IMPORT the new AreaCharts2 component from the chart11 folder ---
import AreaCharts2 from "./Charts/Chart11/AreaCharts2.jsx";
import LineCharts3 from "./Charts/Chart12/LineCharts3.jsx";
import { emissionsChartInfo } from "./chartInfo.js";

const Emissions = () => {
  const { language } = useParams();
  useScrollToChartHash();

  const ChartInfo = emissionsChartInfo;

  return (
    <div className="section-container supply-and-losses">
      <div
        className="background-container"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: "center 40%",
        }}>
        <div className="overlay"></div>
        <h1>
          {language === "en"
            ? "Greenhouse Gas Emissions in Georgia"
            : "სათბურის აირების გაფრქვევები საქართველოში"}
        </h1>
      </div>

      <div className="charts-section">
        <div className="chart-container" style={{ width: "100%" }}>
          <LineChart1 chartInfo={ChartInfo[0]} />
          <AreaCharts chartInfo={ChartInfo[1]} />
          <PieCharts chartInfo={ChartInfo[2]} />
          <AreaCharts5 chartInfo={ChartInfo[3]} />
          <BarCharts chartInfo={ChartInfo[4]} />
          <HorizontalBarCharts chartInfo={ChartInfo[5]} />
          <ScatterCharts chartInfo={ChartInfo[6]} />
          <ScatterChart9 chartInfo={ChartInfo[7]} />
          <LineChart2 chartInfo={ChartInfo[8]} />
          <AreaCharts2 chartInfo={ChartInfo[9]} />
          <LineCharts3 chartInfo={ChartInfo[10]} />
          <LineCharts4 chartInfo={ChartInfo[11]} />
        </div>
      </div>
    </div>
  );
};

export default Emissions;
