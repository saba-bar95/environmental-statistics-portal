/**
 * Flattens nested chart registry into search rows: { path, chartID, title_*, path_* }.
 */
export function flattenChartsForSearch(data, basePath = "") {
  const result = [];

  const traverse = (node, currentPath) => {
    if (Array.isArray(node)) {
      node.forEach((item) => traverse(item, currentPath));
    } else if (node && typeof node === "object") {
      if ("chartID" in node) {
        result.push({
          ...node,
          path: currentPath,
        });
      } else {
        Object.keys(node).forEach((key) => {
          const nextPath = currentPath ? `${currentPath}/${key}` : key;
          traverse(node[key], nextPath);
        });
      }
    }
  };

  traverse(data, basePath);
  return result;
}
