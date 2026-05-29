function cleanId(id, fallback = "untitled", index = 0) {
  if (!id) return `${fallback}-${index}`;
  return id
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function normalizeCharts(data, fallbackPrefix = "chart") {
  const usedIds = new Set();

  if (Array.isArray(data)) {
    return data.map((item, index) => {
      const keys = Object.keys(item);
      if (keys.length === 1 && Array.isArray(item[keys[0]])) {
        const key = keys[0];
        return {
          [key]: normalizeCharts(item[key], `${fallbackPrefix}-${key}`),
        };
      }

      let rawId = item.title_en || `${fallbackPrefix}-${index}`;
      let chartID = cleanId(rawId, fallbackPrefix, index);

      let uniqueID = chartID;
      let suffix = 1;
      while (usedIds.has(uniqueID)) {
        uniqueID = `${chartID}-${suffix++}`;
      }
      usedIds.add(uniqueID);

      return {
        ...item,
        chartID: item.chartID ?? uniqueID,
      };
    });
  }

  return data;
}
