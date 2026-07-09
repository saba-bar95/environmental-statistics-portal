/**
 * Standard Recharts tooltip for multi-series charts (year label + colored rows).
 */
export function ChartLineTooltip({
  active,
  payload,
  label,
  language,
  seriesLabels,
  valueDecimals = 1,
  yearSuffix = true,
}) {
  if (!active || !payload?.length) return null;

  const yearLabel =
    yearSuffix && label != null
      ? `${label} ${language === "en" ? "Year" : "წელი"}`
      : label;

  return (
    <div className="custom-tooltip">
      <div className="tooltip-container">
        {yearLabel != null && yearLabel !== "" && (
          <p className="tooltip-label">{yearLabel}</p>
        )}
        {payload.map(({ value, stroke, dataKey, fill }) => {
          const color = stroke || fill;
          const text =
            seriesLabels?.find((t) => t.name === dataKey || t === dataKey) ??
            dataKey;
          const displayName =
            typeof text === "object" ? text?.name ?? dataKey : text;
          return (
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
                    backgroundColor: color,
                    width: 12,
                    height: 12,
                    display: "inline-block",
                    marginRight: 8,
                  }}
                  className="before-span"
                />
                {displayName} :
              </span>
              <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                {typeof value === "number"
                  ? value.toFixed(valueDecimals)
                  : value}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
