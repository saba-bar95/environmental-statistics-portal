import { useCallback, useEffect, useState } from "react";
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
import commonData from "../../../../fetchFunctions/commonData";
import Download from "./Download/Download";
import {
  ChartLoadingCard,
  ChartErrorCard,
  ChartEmptyCard,
} from "../../../ChartCard/ChartStateCards";
import { ChartLineLegend } from "../../../ChartCard/ChartLineLegend";
import { ChartLineTooltip } from "../../../ChartCard/ChartLineTooltip";

const LineChart1 = ({ chartInfo }) => {
  const { language } = useParams();
  const [chartData, setChartData] = useState([]);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [visibleLines, setVisibleLines] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const retry = useCallback(() => setRetryKey((k) => k + 1), []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch data and metadata concurrently
        const [dataResult, metaDataResult] = await Promise.all([
          commonData(chartInfo.id, chartInfo.types[0], language),
          commonData(chartInfo.id, chartInfo.types[1], language),
        ]);

        // Process metadata: map region names to objects with name and id
        const valueTexts =
          metaDataResult?.data?.metadata?.variables[0].valueTexts.map(
            (region, i) => ({ name: region, id: i })
          ) || [];

        // Select specific regions based on chartInfo.selectedIndices
        const selected = chartInfo.selectedIndices
          .map((index) => valueTexts[index])
          .filter(Boolean);

        setSelectedTexts(selected);

        // Initialize all lines as visible
        setVisibleLines(
          selected.reduce((acc, text) => {
            acc[text.name] = true;
            return acc;
          }, {})
        );

        // Process year data
        const yearData =
          metaDataResult?.data?.metadata?.variables[1].valueTexts.map(
            (year, i) => ({ year: year, id: i })
          ) || [];

        const rawData = dataResult.data.data || [];

        // Process data for the chart
        const processedData = yearData
          .map(({ year }) => {
            const dataItem = rawData.find((item) => item.year === Number(year));
            if (!dataItem) return null;
            const dataPoint = { year };
            selected.forEach((text) => {
              dataPoint[text.name] = dataItem[String(text.id)];
            });
            return dataPoint;
          })
          .filter(Boolean);

        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load chart data. Please try again.");
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    };

    getData();
  }, [language, chartInfo, retryKey]);

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
        onRetry={retry}
      />
    );
  }

  const CustomLegend = () => (
    <ChartLineLegend
      items={selectedTexts}
      colors={chartInfo.colors}
      visibleMap={visibleLines}
      onToggle={(name) =>
        setVisibleLines((prev) => ({ ...prev, [name]: !prev[name] }))
      }
    />
  );

  const CustomTooltip = (props) => (
    <ChartLineTooltip
      {...props}
      language={language}
      seriesLabels={selectedTexts}
    />
  );

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
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 15 }} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ marginBottom: -20 }}
            content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
          />
          {selectedTexts.map((text, index) =>
            visibleLines[text.name] ? (
              <Line
                key={`line-${text.name}`}
                type="monotone"
                dataKey={text.name}
                stroke={chartInfo.colors[index % chartInfo.colors.length]}
                name={text.name}
                strokeWidth={3}
                dot={{
                  r: 3,
                  fill: chartInfo.colors[index % chartInfo.colors.length],
                }}
              />
            ) : null
          )}
          <Brush
            dataKey="year"
            height={20}
            stroke="#8884d8"
            travellerWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart1;
