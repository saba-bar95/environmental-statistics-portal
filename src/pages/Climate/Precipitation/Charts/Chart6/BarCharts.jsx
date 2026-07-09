import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { useParams } from "react-router-dom";
import commonData from "../../../../../api/commonData";
import Download from "../../Download";
import {
  ChartLoadingCard,
  ChartErrorCard,
  ChartEmptyCard,
} from "../../../../../components/ChartCard/ChartStateCards";

const BarCharts = ({ chartInfo }) => {
  const { language } = useParams();
  const [chartData, setChartData] = useState([]);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [visibleBars, setVisibleBars] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Fetch and process data
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true); // Set loading to true when starting fetch
      setError(null); // Reset error state

      try {
        const dataResult = await commonData(chartInfo.id, chartInfo.types[0], language);

        // Custom mapping for atmospheric-precipitation annual data indices
        const regionMapping = {
          1: language === "ge" ? "საქართველო" : "Georgia",
          6: language === "ge" ? "თბილისი" : "Tbilisi",
          11: language === "ge" ? "სამეგრელო-ზემო სვანეთი" : "Samegrelo-Zemo Svaneti",
          16: language === "ge" ? "ქვემო ქართლი" : "Kvemo Kartli"
        };

        const selected = chartInfo.selectedIndices
          .map((index) => ({ 
            name: regionMapping[index] || `Region ${index}`, 
            id: index 
          }))
          .filter(Boolean);

        setSelectedTexts(selected);

        setVisibleBars(
          selected.reduce((acc, text) => {
            acc[text.name] = true; // all bars visible initially
            return acc;
          }, {})
        );

        const rawData = dataResult?.data?.data || [];

        // Get data for 2019 (driest) and 2009 (wettest) years
        const data2019 = rawData.find((item) => item.year === 2019);
        const data2009 = rawData.find((item) => item.year === 2009);

        if (!data2019 || !data2009) {
          setChartData([]);
          return;
        }

        // Create data structure with regions on X-axis and two data series (years)
        const processedData = selected.map((region) => {
          const regionData = {
            region: region.name,
          };
          
          // Add data for each year as separate keys
          regionData[language === "ge" ? "2019 (მშრალი)" : "2019 (Driest)"] = data2019[String(region.id)];
          regionData[language === "ge" ? "2009 (ნოტიო)" : "2009 (Wettest)"] = data2009[String(region.id)];
          
          return regionData;
        });

        setChartData(processedData);
        
        // Update visible bars to show both years by default
        const yearKeys = [
          language === "ge" ? "2019 (მშრალი)" : "2019 (Driest)",
          language === "ge" ? "2009 (ნოტიო)" : "2009 (Wettest)"
        ];
        
        setVisibleBars(
          yearKeys.reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {})
        );

        // Update selectedTexts to represent the two years instead of regions
        setSelectedTexts(yearKeys.map(key => ({ name: key, id: key })));
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Failed to load chart data. Please try again.");
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    };

    getData();
  }, [language, chartInfo]);

  // Show loading state
  if (isLoading) {
    return (
      <ChartLoadingCard
        id={chartInfo.chartID}
        title={language === "ge" ? chartInfo.title_ge : chartInfo.title_en}
        unit={language === "ge" ? chartInfo.unit_ge : chartInfo.unit_en}
        language={language}
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <ChartErrorCard
        id={chartInfo.chartID}
        title={language === "ge" ? chartInfo.title_ge : chartInfo.title_en}
        unit={language === "ge" ? chartInfo.unit_ge : chartInfo.unit_en}
        language={language}
        error={error}
      />
    );
  }

  // Custom Legend Component
  const CustomLegend = () => {
    const visibleBarCount = Object.values(visibleBars).filter(Boolean).length;

    return (
      <ul className="recharts-default-legend">
        {selectedTexts.map((text, index) => (
          <li
            key={`legend-item-${text.name}`}
            className={`recharts-legend-item legend-item-${index}`}
            onClick={() => {
              // Prevent toggling if this is the last visible bar
              if (visibleBars[text.name] && visibleBarCount === 1) {
                return;
              }
              setVisibleBars((prev) => ({
                ...prev,
                [text.name]: !prev[text.name],
              }));
            }}
            style={{
              cursor: "pointer",
              opacity: visibleBars[text.name] ? 1 : 0.5,
            }}>
            <span
              className="recharts-legend-item-icon"
              style={{
                backgroundColor:
                  chartInfo.colors[index % chartInfo.colors.length],
                flexShrink: 0,
                width: 12,
                height: 12,
                display: "inline-block",
                marginRight: 8,
              }}></span>
            <span className="recharts-legend-item-text">{text.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          <p className="tooltip-label">
            {label}
          </p>
          {payload.map(({ value, fill, dataKey }) => {
            return (
              <p key={`item-${dataKey}`} className="text">
                <span
                  style={{
                    backgroundColor: fill,
                    flexShrink: 0,
                    width: 12,
                    height: 12,
                    display: "inline-block",
                    marginRight: 8,
                  }}
                  className="before-span"></span>
                {dataKey} :
                <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                  {value?.toFixed(0)} {language === "ge" ? "მმ" : "mm"}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  // Show empty state if no data
  if (chartData.length === 0) {
    return (
      <ChartEmptyCard
        id={chartInfo.chartID}
        title={language === "ge" ? chartInfo.title_ge : chartInfo.title_en}
        unit={language === "ge" ? chartInfo.unit_ge : chartInfo.unit_en}
        language={language}
      />
    );
  }

  return (
    <div className="chart-wrapper" id={chartInfo.chartID}>
      <div className="header">
        <div className="right">
          <div className="ll"></div>
          <div className="rr">
            <h1>
              {language === "ge" ? chartInfo.title_ge : chartInfo.title_en}
            </h1>
            <p>{language === "ge" ? chartInfo.unit_ge : chartInfo.unit_en}</p>
          </div>
        </div>
        <div className="left">
          <Download
            data={chartData}
            filename={chartInfo[`title_${language}`]}
            unit={chartInfo[`unit_${language}`]}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={460}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="region" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ marginBottom: -20 }}
            content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
          />
          {selectedTexts.map((text, index) =>
            visibleBars[text.name] ? (
              <Bar
                key={`bar-${text.name}`}
                dataKey={text.name}
                fill={chartInfo.colors[index % chartInfo.colors.length]}
                stroke={chartInfo.colors[index % chartInfo.colors.length]}
                name={text.name}
              />
            ) : null
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
