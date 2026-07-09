import { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import { useParams } from "react-router-dom";
import commonData from "../../../../../api/commonData";
import Download from "../../Download";
import {
  ChartLoadingCard,
  ChartErrorCard,
  ChartEmptyCard,
} from "../../../../../components/ChartCard/ChartStateCards";

const ScatterCharts = ({ chartInfo }) => {
  const { language } = useParams();
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch data and metadata concurrently
        const [dataResult] = await Promise.all([
          commonData(chartInfo.id, chartInfo.types[0], language),
          commonData(chartInfo.id, chartInfo.types[1], language),
        ]);

        const rawData = dataResult?.data?.data || [];

        // Find the indices for annual and maximum monthly precipitation
        // Variable indices in atmospheric-precipitation:
        // Index 1: წლიური ნალექიანობა (Annual precipitation) - e.g., 1306 for 2009
        // Index 3: მაქსიმალური თვიური ნალექიანობა (Maximum monthly precipitation) - e.g., 189 for 2009
        
        // Process data for scatter plot
        const processedData = rawData.map((item) => ({
          year: item.year,
          annual: item["1"], // წლიური ნალექიანობა
          monthly: item["3"], // მაქსიმალური თვიური ნალექიანობა
        })).filter(item => item.annual != null && item.monthly != null);

        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load chart data. Please try again.");
      } finally {
        setIsLoading(false);
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
    return (
      <ul className="recharts-default-legend">
        <li className="recharts-legend-item legend-item-0">
          <span
            className="recharts-legend-item-icon"
            style={{
              backgroundColor: chartInfo.colors[0],
              flexShrink: 0,
              width: 12,
              height: 12,
              display: "inline-block",
              marginRight: 8,
            }}></span>
          <span className="recharts-legend-item-text">
            {language === "ge" ? "წლიური vs. თვიური ნალექიანობა" : "Annual vs. Monthly Precipitation"}
          </span>
        </li>
      </ul>
    );
  };

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          <p className="tooltip-label">
            {data.year} {language === "en" ? "Year" : "წელი"}
          </p>
          <p
            className="text"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              alignItems: "center",
            }}>
            <span>
              <span
                style={{
                  backgroundColor: chartInfo.colors[0],
                  width: 12,
                  height: 12,
                  display: "inline-block",
                  marginRight: 8,
                }}
                className="before-span"></span>
              {language === "ge" ? "წლიური ნალექიანობა" : "Annual Precipitation"} :
            </span>
            <span style={{ fontWeight: 900, marginLeft: "5px" }}>
              {data.annual?.toFixed(2)} {language === "ge" ? "მმ" : "mm"}
            </span>
          </p>
          <p
            className="text"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              alignItems: "center",
            }}>
            <span>
              <span
                style={{
                  backgroundColor: chartInfo.colors[0],
                  width: 12,
                  height: 12,
                  display: "inline-block",
                  marginRight: 8,
                }}
                className="before-span"></span>
              {language === "ge" ? "მაქს. თვიური ნალექიანობა" : "Max Monthly Precipitation"} :
            </span>
            <span style={{ fontWeight: 900, marginLeft: "5px" }}>
              {data.monthly?.toFixed(2)} {language === "ge" ? "მმ" : "mm"}
            </span>
          </p>
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
        style={chartInfo?.wrapperStyles}
      />
    );
  }

  return (
    <div
      className="chart-wrapper"
      id={chartInfo.chartID}
      style={chartInfo?.wrapperStyles}>
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
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={460}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            type="number" 
            dataKey="annual" 
            name={language === "ge" ? "წლიური ნალექიანობა" : "Annual Precipitation"}
            tick={{ fontSize: 12 }} 
            tickLine={false}
            domain={[895, 'auto']}
            label={{ 
              value: language === "ge" ? "წლიური ნალექიანობა (მმ)" : "Annual Precipitation (mm)", 
              position: "insideBottom", 
              offset: -10,
              style: { fontSize: 14, fill: '#8B4513' }
            }}
          />
          <YAxis 
            type="number" 
            dataKey="monthly" 
            name={language === "ge" ? "მაქსიმალური თვიური ნალექიანობა" : "Max Monthly Precipitation"}
            tick={{ fontSize: 12 }}
            domain={[100, 'auto']}
            label={{ 
              value: language === "ge" ? "მაქსიმალური თვიური ნალექიანობა (მმ)" : "Max Monthly Precipitation (mm)", 
              angle: -90, 
              position: "insideLeft",
              style: { fontSize: 14, fill: '#8B4513', textAnchor: 'middle' }
            }}
          />
          <ZAxis range={[100, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ marginBottom: -20 }}
            content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
          />
          <Scatter
            name={language === "ge" ? "წლიური vs. თვიური" : "Annual vs. Monthly"}
            data={chartData}
            fill={chartInfo.colors[0]}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterCharts;
