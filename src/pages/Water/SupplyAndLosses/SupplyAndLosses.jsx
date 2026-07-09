import { useParams } from "react-router-dom";
import { useScrollToChartHash } from "../../../hooks/useScrollToChartHash.js";
import { useRef, useEffect, useState } from "react";
import backgroundImg from "./Background/background.webp";
import "./SupplyAndLosses.scss";
import Faucet from "./Svgs/Faucet";
import image1 from "./images/image-1.png";
import image2 from "./images/image-2.png";
import image3 from "./images/image-3.png";
import Clean from "./Svgs/Clean";
import "./supply-and-losses-page.scss";
import { supplyAndLossesChartInfo } from "./chartInfo.js";
import LineCharts from "./Charts/LineCharts";
import StackedBarCharts from "./Charts/StackedBarCharts";
import BarCharts from "./Charts/BarCharts";
import AreaCharts from "./Charts/AreaCharts";
import LineChartBoth from "./Charts/LineChartBoth";

const SupplyAndLosses = () => {
  const { language } = useParams();
  useScrollToChartHash();

  const wave1Ref = useRef(null);
  const [waveHeight, setWaveHeight] = useState(0);
  const info = supplyAndLossesChartInfo;

  useEffect(() => {
    const waveElement = wave1Ref.current;

    // Initial height measurement for wave-1
    if (waveElement) {
      const initialHeight = waveElement.getBoundingClientRect().height;
      setWaveHeight(initialHeight);
    }

    // Set up ResizeObserver for wave-1
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        setWaveHeight(height);
      }
    });

    if (waveElement) {
      observer.observe(waveElement);
    }

    // Cleanup observer
    return () => {
      if (waveElement) {
        observer.unobserve(waveElement);
      }
    };
  }, []);

  const ChartInfo = [
    {
      title_ge: info[0].title_ge,
      title_en: info[0].title_en,
      colors: ["#1678e7ff", "#63b8e9ff"],
      id: "water-supply-population",
      types: ["data", "metadata"],
      selectedIndices: [0, 2],
      chartID: info[0].chartID,
      isChart1: true,
    },
    {
      title_ge: info[1].title_ge,
      title_en: info[1].title_en,
      colors: ["#e94d74ff"],
      id: "water-losses",
      types: ["data", "metadata"],
      selectedIndices: [3],
      chartID: info[1].chartID,
      isChart1: true,
    },
    {
      title_ge: info[2].title_ge,
      title_en: info[2].title_en,
      colors: ["#4de9d4ff", "rgba(250, 208, 118, 1)"],
      id: "water-use-households",
      types: ["data", "metadata"],
      selectedIndices: [1, 3],
      chartID: info[2].chartID,
    },
    {
      title_ge: info[3].title_ge,
      title_en: info[3].title_en,
      colors: ["#4de9d4ff"],
      id: "water-supply-population",
      types: ["data", "metadata"],
      selectedIndices: [5],
      chartID: info[3].chartID,
      isChart1: true,
    },
    {
      title_ge: info[4].title_ge,
      title_en: info[4].title_en,
      colors: ["#1464dbff"],
      id: "water-use-households",
      types: ["data", "metadata"],
      selectedIndices: [2],
      chartID: info[4].chartID,
      isChart1: true,
    },
    {
      title_ge: info[5].title_ge,
      title_en: info[5].title_en,
      colors: ["#4de9d4ff", "rgba(250, 208, 118, 1)"],
      id: "water-use-households",
      types: ["data", "metadata"],
      selectedIndices: [0, 5],
      chartID: info[5].chartID,
      isChart5: true,
    },
    {
      title_ge: info[6].title_ge,
      title_en: info[6].title_en,
      colors: ["#1464dbff", "#e94d74ff"],
      id: "water-use-households",
      types: ["data", "metadata"],
      selectedIndices: [1, 0],
      chartID: info[6].chartID,
      isChart1: true,
    },
    {
      title_ge: info[7].title_ge,
      title_en: info[7].title_en,
      colors: ["#555d69ff", "#1464dbff", "#4de9d4ff", "rgba(250, 208, 118, 1)"],
      id: "sewerage-network-population",
      types: ["data", "metadata"],
      selectedIndices: [0, 1, 3, 5],
      chartID: info[7].chartID,
    },
    {
      title_ge: info[8].title_ge,
      title_en: info[8].title_en,
      colors: ["#4de9d4ff", "rgba(250, 208, 118, 1)"],
      id: "sewerage-network-population",
      types: ["data", "metadata"],
      selectedIndices: [4, 6],
      chartID: info[8].chartID,
      isChart5: true,
    },
    {
      title_ge: info[9].title_ge,
      title_en: info[9].title_en,
      colors: ["#1464dbff", "rgba(250, 208, 118, 1)", "#4de9d4ff"],
      id: "sewerage-network-population",
      types: ["data", "metadata"],
      selectedIndices: [7, 9, 11],
      chartID: info[9].chartID,
    },
    {
      title_ge: info[10].title_ge,
      title_en: info[10].title_en,
      colors: ["#1464dbff", "rgba(250, 208, 118, 1)", "#4de9d4ff"],
      id: "sewerage-network-population",
      types: ["data", "metadata"],
      selectedIndices: [8, 10, 12],
      chartID: info[10].chartID,
      isChart5: true,
    },
    {
      title_ge: info[11].title_ge,
      title_en: info[11].title_en,
      colors: ["#e94d74ff"],
      id: "sewerage-network-population",
      types: ["data", "metadata"],
      selectedIndices: [13],
      chartID: info[11].chartID,
    },
    {
      title_ge: info[12].title_ge,
      title_en: info[12].title_en,
      colors: ["#e94d74ff"],
      id: "sewerage-network-population",
      types: ["data", "metadata"],
      selectedIndices: [15],
      chartID: info[12].chartID,
    },
  ];

  return (
    <div className="section-container supply-and-losses">
      <div
        className="background-container"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <div className="overlay"></div>
        <h1>
          {language === "en"
            ? "Water Supply, Losses and Household Water Consumption"
            : "წყალმომარაგება, დანაკარგები და შინამეურნეობების მიერ წყლის მოხმარება"}
        </h1>
      </div>
      <div className="section-wrapper">
        <section>
          <div style={{ height: "100%" }} className="ss">
            <div className="texts">
              <div className="left">
                <h1>
                  {language === "en"
                    ? "Water supply and distribution"
                    : "წყალმომარაგება და განაწილება"}
                </h1>
                <p>
                  {language === "en"
                    ? "In 2025, Georgia's centralized water supply systems supplied approximately 869.1 m³ of drinking water."
                    : "2025 წელს საქართველოს ცენტრალიზებულმა წყალმომარაგების სისტემებმა დაახლოებით 869.1 მილიონი მ³ სასმელი წყალი მიაწოდა."}
                </p>
                <div className="bottom">
                  <div className="rr">
                    <h2>
                      {language === "en"
                        ? "Connected Population"
                        : "მიერთებული მოსახლეობა"}
                    </h2>
                    <div className="num">72.8%</div>
                  </div>
                  <div className="border"></div>
                  <div className="ll">
                    <h2>
                      {language === "en"
                        ? "System Losses"
                        : "სისტემის დანაკარგები"}
                    </h2>
                    <div className="num">64.4%</div>
                  </div>
                </div>
              </div>
              <div className="right"></div>
            </div>
            <div
              style={{
                transform: `translateY(${waveHeight - waveHeight / 2}px)`,
              }}
              className="faucet-svg"
            >
              <Faucet />
            </div>
          </div>
        </section>
        <div className="divider wave-1" ref={wave1Ref}></div>
        <section>
          <div className="ss">
            <div className="left">
              <div className="wrapper">
                <img src={image1} alt="" />
                <img src={image2} alt="" />
                <img src={image3} alt="" />
              </div>
              <div className="text">
                <h1>
                  247
                  <span>{language === "en" ? "L/day" : "ლ/დღე"}</span>
                </h1>
              </div>
            </div>
            <div className="right">
              <h1>
                {language === "en"
                  ? "Household Water Consumption"
                  : "საყოფაცხოვრებო წყლის მოხმარება"}
              </h1>
              <p>
                {language === "en"
                  ? "In 2025, the water consumption per capita by households was 90.1 cubic meters per year (approx. 247 liters/day)."
                  : "2025 წელს შინამეურნეობების მიერ წყლის მოხმარება ერთ სულ მოსახლეზე შეადგენდა 90.1 კუბურ მეტრს წელიწადში (დაახლ. 247 ლიტრი/დღეში)."}
              </p>
            </div>
          </div>
        </section>
        <div className="divider wave-2"></div>
        <section>
          <div>
            <div className="texts">
              <div className="left" style={{ flex: 22 }}>
                <h1>
                  {language === "en"
                    ? "Connection to wastewater collection system and wastewater treatment facilities"
                    : "წყალარინება და ჩამდინარე წყლის გამწმენდ ნაგებობებთან მიერთება"}
                </h1>
                <p>
                  {language === "en"
                    ? "In 2025, 52.3% of the population was connected to a wastewater collection system, and 41.6% to treatment facilities."
                    : "2025 წელს მოსახლეობის დაახლოებით 52.3% მიერთებული იყო წყალანირების ქსელთან, ხოლო დაახლოებით 41.6% - გამწმენდ ნაგებობებთან."}
                </p>
                <div className="bottom" style={{ gap: "50px" }}>
                  <div className="rr">
                    <h2>
                      {language === "en"
                        ? "Population connected to wastewater collection system"
                        : "წყალარინების ქსელთან მიერთებული მოსახლეობა"}
                    </h2>
                    <div className="num">52.3%</div>
                  </div>
                  <div className="border"></div>
                  <div className="ll">
                    <h2>
                      {language === "en"
                        ? "Population connected to the wastewater treatment plant"
                        : "გამწმენდ ნაგებობასთან მიერთებული მოსახლეობა"}
                    </h2>
                    <div className="num">41.6%</div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Clean />
              </div>
            </div>
          </div>
        </section>
        <div className="divider wave-3"></div>
      </div>
      <div className="header-container1">
        <h1 className="title-text">
          {language === "en"
            ? "Detailed Water Supply Statistics"
            : "წყალმომარაგების დეტალური სტატისტიკა"}
        </h1>
      </div>
      <div className="charts-section">
        <div className="chart-container">
          <LineCharts chartInfo={ChartInfo[0]} />
          <LineCharts chartInfo={ChartInfo[1]} />
          <StackedBarCharts chartInfo={ChartInfo[2]} />
          <LineCharts chartInfo={ChartInfo[3]} />
          <LineCharts chartInfo={ChartInfo[4]} />
          <StackedBarCharts chartInfo={ChartInfo[5]} />
          <LineChartBoth chartInfo={ChartInfo[6]} />
          <LineCharts chartInfo={ChartInfo[7]} />
          <BarCharts chartInfo={ChartInfo[8]} />
          <StackedBarCharts chartInfo={ChartInfo[9]} />
          <StackedBarCharts chartInfo={ChartInfo[10]} />
          <LineCharts chartInfo={ChartInfo[11]} />
          <AreaCharts chartInfo={ChartInfo[12]} />
        </div>
      </div>
    </div>
  );
};

export default SupplyAndLosses;
