import { useParams } from "react-router-dom";
import { useScrollToChartHash } from "../../../../../hooks/useScrollToChartHash.js";
import backgroundImg from "./Background/background.webp";
import { forestAndFieldFiresChartInfo } from "./chartInfo.js";
import Chart1 from "./Charts/Chart1/Chart1";

const ForestAndFieldFires = () => {
  const { language } = useParams();
  useScrollToChartHash();

  return (
    <div className="section-container">
      <div
        className="background-container"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}>
        <div className="overlay"></div> {/* New overlay div */}
        <h1>
          {language === "en"
            ? "Forest and Field Fires"
            : "ტყისა და ველის ხანძრები"}
        </h1>
        <h2>
          {" "}
          {language === "en"
            ? "Data on fires and damaged areas"
            : "მონაცემები ხანძრების და დაზიანებული ტერიტორიების შესახებ"}{" "}
        </h2>
      </div>
      <div className="charts-section">
        <div className="chart-container">
          <Chart1 chartInfo={forestAndFieldFiresChartInfo[0]} />
        </div>
      </div>
    </div>
  );
};

export default ForestAndFieldFires;
