/**
 * Toggleable Recharts legend for multi-series line/area charts.
 */
export function ChartLineLegend({
  items,
  colors,
  visibleMap,
  onToggle,
  legendStyle,
}) {
  const visibleCount = Object.values(visibleMap).filter(Boolean).length;

  return (
    <ul className="recharts-default-legend" style={legendStyle}>
      {items.map((item, index) => {
        const key = typeof item === "string" ? item : item.name;
        const label = typeof item === "string" ? item : item.name;
        return (
          <li
            key={`legend-item-${key}`}
            className={`recharts-legend-item legend-item-${index}`}
            onClick={() => {
              if (visibleMap[key] && visibleCount === 1) return;
              onToggle(key);
            }}
            style={{
              cursor: "pointer",
              opacity: visibleMap[key] ? 1 : 0.5,
            }}>
            <span
              className="recharts-legend-item-icon"
              style={{
                backgroundColor: colors[index % colors.length],
                flexShrink: 0,
                width: 12,
                height: 12,
                display: "inline-block",
                marginRight: 8,
              }}
            />
            <span className="recharts-legend-item-text">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
