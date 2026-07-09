import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
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
import Download from "./Download/Download";
import {
  ChartLoadingCard,
  ChartErrorCard,
  ChartEmptyCard,
} from "../../../../../components/ChartCard/ChartStateCards";

const LineCharts4 = ({ chartInfo }) => {
  const { language } = useParams();
  const [chartData, setChartData] = useState([]);
  const [regionNames, setRegionNames] = useState([]);
  const [visibleLines, setVisibleLines] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Region config: English keys and localized display names for max and min temperatures
  const regions = useMemo(
    () =>
      language === "ge"
        ? [
            {
              key: "TBILISI_MAX",
              name: "მაქსიმალური თვიური საშუალო ტემპერატურა",
            },
            {
              key: "TBILISI_MIN",
              name: "მინიმალური თვიური საშუალო ტემპერატურა",
            },
          ]
        : [
            { key: "TBILISI_MAX", name: "Maximum Monthly Average Temperature" },
            { key: "TBILISI_MIN", name: "Minimum Monthly Average Temperature" },
          ],
    [language]
  );

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch data (keys are always in English)
        const dataResult = await commonData(
          chartInfo.id,
          chartInfo.types[0],
          "en"
        );
        // Fetch metadata for current language (for years)
        const localizedMetaResult = await commonData(
          chartInfo.id,
          chartInfo.types[1],
          language
        );

        setRegionNames(regions.map((r) => r.name));

        // Initialize all regions as visible
        setVisibleLines(
          regions.reduce((acc, region) => {
            acc[region.name] = true;
            return acc;
          }, {})
        );

        const yearData =
          localizedMetaResult?.data?.metadata?.variables[1].valueTexts.map(
            (year, i) => ({ year: year, id: i })
          ) || [];

        const rawData = dataResult.data.data || [];

        // Fixed variable keyNames for max and min temperatures
        const variableKeyName = "Maximum monthly average temperature (°C)";
        const variableKeyName2 = "Minimum monthly average temperature (°C)";

        // Process data for the chart
        const processedData = yearData
          .map(({ year }) => {
            const dataItem = rawData.find((item) => item.year === Number(year));
            if (!dataItem) return null;

            const dataPoint = { year };

            regions.forEach((region) => {
              // Construct full key based on max or min temperature
              const fullKey =
                region.key === "TBILISI_MAX"
                  ? `TBILISI - ${variableKeyName}`
                  : `TBILISI - ${variableKeyName2}`;
              dataPoint[region.name] = parseFloat(dataItem[fullKey]) || 0;
            });

            return dataPoint;
          })
          .filter(Boolean);

        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load chart data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [language, chartInfo, regions]);

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

  // Custom Legend Component with Toggling
  const CustomLegend = () => {
    const visibleLineCount = Object.values(visibleLines).filter(Boolean).length;

    return (
      <ul className="recharts-default-legend" style={chartInfo?.legendStyles}>
        {regionNames.map((name, index) => (
          <li
            key={`legend-item-${name}`}
            className={`recharts-legend-item legend-item-${index}`}
            onClick={() => {
              if (visibleLines[name] && visibleLineCount === 1) return; // Prevent hiding the last visible line
              setVisibleLines((prev) => ({
                ...prev,
                [name]: !prev[name],
              }));
            }}
            style={{
              cursor: "pointer",
              opacity: visibleLines[name] ? 1 : 0.5,
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
            <span className="recharts-legend-item-text">{name}</span>
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
            {label} {language === "en" ? "Year" : "წელი"}
          </p>
          {payload.map(({ value, stroke, dataKey }) => (
            <p
              key={`item-${dataKey}`}
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
                    backgroundColor: stroke,
                    width: 12,
                    height: 12,
                    display: "inline-block",
                    marginRight: 8,
                  }}
                  className="before-span"></span>
                {dataKey} :
              </span>
              <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                {value.toFixed(1)}
              </span>
            </p>
          ))}
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
            <h1
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}>
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
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis
            yAxisId="left"
            domain={[0, "auto"]}
            tick={{ fontSize: 12 }}
            stroke="#666"
            orientation="left"
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ marginBottom: -20 }}
            content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
          />
          {regions.map((region, index) =>
            visibleLines[region.name] ? (
              <Line
                key={`line-${region.name}`}
                type="monotone"
                dataKey={region.name}
                yAxisId="left"
                stroke={chartInfo.colors[index % chartInfo.colors.length]}
                strokeWidth={2}
                name={region.name}
                dot={{
                  fill: chartInfo.colors[index % chartInfo.colors.length],
                  strokeWidth: 3,
                  r: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: chartInfo.colors[index % chartInfo.colors.length],
                  strokeWidth: 2,
                }}
              />
            ) : null
          )}
          <Brush
            dataKey="year"
            height={20}
            stroke="#8884d8"
            travellerWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts4;
