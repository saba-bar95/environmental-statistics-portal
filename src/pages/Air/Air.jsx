import { useParams } from "react-router-dom";
import { useScrollToChartHash } from "../../hooks/useScrollToChartHash.js";
import backgroundImg from "./Background/background.webp";
import { airChartInfo } from "./chartInfo.js";
import Chart1 from "./Charts/Chart1/Chart1";
import Chart2 from "./Charts/Chart2/Chart2";
import Chart3 from "./Charts/Chart3/Chart3";
import Footer from "./Footer/Footer";
import Quality from "./Quality/Quality";

const Air = () => {
  const { language } = useParams();
  useScrollToChartHash();

  return (
    <div className="section-container">
      <div
        className="background-container"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}>
        <div className="overlay"></div>
        <h1>
          {language === "en"
            ? "Air Quality and Emissions"
            : "ჰაერის ხარისხი და გაფრქვევები"}
        </h1>
        <h2>
          {language === "en"
            ? "Latest trends in air pollution, emissions and urban air quality in Georgia"
            : "ჰაერის დაბინძურების, გაფრქვევებისა და ქალაქებში ჰაერის ხარისხის უახლესი ტენდენციები საქართველოში"}
        </h2>
      </div>
      <div className="charts-section">
        <Quality />
        <div className="chart-container">
          <Chart1 chartInfo={airChartInfo[0]} />
          <Chart2 chartInfo={airChartInfo[1]} />
          <Chart3 chartInfo={airChartInfo[2]} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Air;
