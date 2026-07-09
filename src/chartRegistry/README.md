# Chart registry

See [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) for the full system overview.

## How search works (no page visit required)

`SearchBar` imports `searchIndex` from `chartRegistry/index.js`. That array is built **when the JavaScript bundle loads**, by importing every page’s `chartInfo.js`. You do **not** need React context, Redux, or to open a page first.

```
main.jsx loads → buildCharts.js runs → all chartInfo.js files imported → searchIndex filled
```

## Adding a chart

1. Open the page’s `chartInfo.js` (e.g. `pages/Climate/Emissions/chartInfo.js`).
2. Add an entry to `chartDefinitions` / `emissionsCharts` with `title_ge`, `title_en`, and explicit `chartID`.
3. Render the chart on the page and set `id={chartInfo.chartID}` on the wrapper.
4. Search updates automatically — nothing to add in `Charts.jsx`.

## Files

| File | Role |
|------|------|
| `pages/**/chartInfo.js` | Single source of truth per page |
| `chartRegistry/buildCharts.js` | Assembles nested `Charts` + flat `searchIndex` |
| `chartRegistry/helpers.js` | `definePageCharts()`, `withSearchPath()` |
| `Charts.jsx` | Re-exports registry (backward compatible) |

## Regenerate chartInfo from legacy data

If you still have `legacyRawCharts.js`:

```bash
node scripts/generate-chart-info.mjs
```

## Scroll to chart (search deep links)

Chart pages call `useScrollToChartHash()` from `src/hooks/useScrollToChartHash.js`. It retries until `#chartID` exists in the DOM. `ScrollToTop` skips scrolling to top when a hash is present.

## Audit

```bash
npm run audit:charts
```
