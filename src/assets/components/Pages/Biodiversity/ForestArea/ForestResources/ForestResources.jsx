import { useParams } from "react-router-dom";
import { useScrollToChartHash } from "../../../../../../hooks/useScrollToChartHash.js";
import { useEffect } from "react";
import backgroundImg from "./Background/background.webp";
import { forestResourcesChartInfo } from "./chartInfo.js";
import Chart1 from "./Charts/Chart1/Chart1";
import SankeyChart from "./Charts/Sankey/SankeyChart";
import SankeyChart2 from "./Charts/Sankey/SankeyChart2";

const ForestResources = () => {
  const { language } = useParams();
  const info = forestResourcesChartInfo;
  useScrollToChartHash();

  const ChartInfo = [
    {},
    {
      title_ge: info[1].title_ge,
      title_en: info[1].title_en,
      id: "forest-area",
      types: ["data", "metadata"],
      chartID: info[1].chartID,
      unit_ge: "ათასი ჰექტარი",
      unit_en: "Thousand tonnes",
    },
    {
      title_ge: info[2].title_ge,
      title_en: info[2].title_en,
      id: "timber-by-cutting-purpose",
      types: ["data", "metadata"],
      chartID: info[2].chartID,
      unit_ge: "კუბური მეტრი",
      unit_en: "Cubic meter",
    },
  ];

  return (
    <div className="section-container">
      <div
        className="background-container"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}>
        <div className="overlay"></div> {/* New overlay div */}
        <h1>{language === "en" ? "Forest Resources" : "ტყის რესურსები"}</h1>
        <h2>
          {" "}
          {language === "en"
            ? "Information about forest use cover"
            : "ინფორმაცია ტყითსარგებლობის შესახებ"}{" "}
        </h2>
      </div>
      <div className="charts-section">
        <div className="chart-container">
          <SankeyChart chartInfo={ChartInfo[1]} />
          <Chart1 chartInfo={info[0]} />
          <SankeyChart2 chartInfo={ChartInfo[2]} />
        </div>
      </div>
    </div>
  );
};

export default ForestResources;
