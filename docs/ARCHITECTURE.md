# Architecture — Environmental Statistics Portal

This document describes how the Georgia environmental statistics portal is structured, how data flows through the app, and where to extend it safely.

## High-level overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Browser                                                         │
│  main.jsx → createBrowserRouter(routes) → RouterProvider         │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┴───────────────────┐
         ▼                                       ▼
   /  → redirect /ge                    /:language (App shell)
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
              Header + SearchBar        lazy page routes           Footer
              (searchIndex)           (Suspense + Outlet)
```

- **Language-first URLs:** All content lives under `/:language` where `language` is `ge` or `en`.
- **SPA:** Client-side routing; Vercel rewrites all paths to `index.html` (`vercel.json`).
- **Code splitting:** Major pages are `React.lazy()` imports in `src/routes.jsx` with a shared `RouteFallback`.

## Repository layout

| Path | Purpose |
|------|---------|
| `src/main.jsx` | App bootstrap; `RouterProvider` only (StrictMode omitted to avoid duplicate dev fetches) |
| `src/routes.jsx` | Route tree and lazy page imports |
| `src/App.jsx` | Shell: `Header`, `Footer`, `ScrollToTop`, `Outlet`, Vercel Analytics |
| `src/chartRegistry/` | Builds global chart metadata and flat `searchIndex` at bundle load |
| `src/pages/**` | Thematic dashboards (Air, Climate, Water, …) and `Homepage/` |
| `src/pages/**/chartInfo.js` | Per-page chart definitions (titles, IDs, search paths) |
| `src/components/` | Shared UI: `Header`, `Footer`, `SearchBar`, `ChartCard`, `Download`, etc. |
| `src/api/` | API wrappers for backend / static data (formerly `fetchFunctions`) |
| `src/hooks/` | Cross-cutting hooks (`useScrollToChartHash`, `useChartFetch`, `useAppTitle`) |
| `src/styles/` | Global SCSS (`ChartWrapper`, `SpinnerAndError`, maps, heatmaps, fonts) |
| `src/assets/` | **Static media only** — fonts (`.woff2`, `.otf`, `.ttf`), images (`.png`, `.webp`) |
| `scripts/` | Maintenance codemods (chart audit, download consolidation, migrations) |
| `docs/` | Human + AI documentation (this file, development guide) |

### Why `assets/` is static-only

Previously, `src/assets/` mixed application code (components, styles, fetch helpers) with real assets. The layout now follows common React/Vite conventions:

- **Code** lives in `pages/`, `components/`, `api/`, `styles/`, `hooks/`.
- **Binary/static files** stay in `src/assets/` (referenced via `/src/assets/fonts/…` or `/src/assets/images/…` in SCSS/JSX).

Page-local images (e.g. hero backgrounds) may remain colocated under `src/pages/**/images/` when they are only used on that page.

## Routing

Defined in `src/routes.jsx`:

- Root `/` redirects to `/ge`.
- Parent route `/:language` renders `App` and nested children.
- Sub-routes map to lazy page components, e.g. `climate/emissions`, `water/majors`, `biodiversity/protectedareas`.

Navigation config for the header lives in `src/components/Header/Navigation/`.

## Chart registry and search

Search does **not** require visiting a page first. On bundle load, `chartRegistry/buildCharts.js` imports every page’s `chartInfo.js` and produces:

1. A nested structure (legacy compatibility / exports).
2. A flat **`searchIndex`** used by `SearchBar`.

```
chartInfo.js (per page)
    → definePageCharts(route, searchPath, definitions)
    → normalizeCharts() assigns stable chartID values
    → buildCharts.js aggregates all pages
    → searchIndex[]
```

**Adding a searchable chart**

1. Add an entry in the page’s `chartInfo.js` (`title_ge`, `title_en`; optional `search: false` to exclude).
2. Render the chart with `id={chartInfo.chartID}` on the wrapper (must match registry).
3. Call `useScrollToChartHash()` on the page component for hash deep-links.

See also `src/chartRegistry/README.md` and `npm run audit:charts`.

**Search navigation**

- Cross-page: `navigate()` to `/${language}/${chart.path}#${chart.chartID}`.
- Same page: `scrollToChartById` + `history.replaceState` (avoids remounting the route).

## Typical chart component pattern

Most Recharts-based charts follow this shape:

1. `useParams()` for `language`.
2. Fetch via `commonData` or a dedicated helper in `src/api/`.
3. Loading / error / empty UI via `ChartLoadingCard`, `ChartErrorCard`, `ChartEmptyCard` from `components/ChartCard/ChartStateCards.jsx`.
4. Retry without full page reload: `retryKey` state + `onRetry` on error card.
5. Optional: `ChartLineTooltip` / `ChartLineLegend` for multi-series line charts (see Energy `LineCharts.jsx`).
6. Per-chart or shared `Download` component for exports.

Styling for chart chrome: `styles/ChartWrapper.scss`, `styles/SpinnerAndError.scss` (includes `--chart-body-height` for layout stability while loading).

## Data layer

- Fetch modules live under `src/api/` (`commonData.js`, `riversAndLakes.js`, `citiesAirQuality.js`, `backendURL.js`).
- Charts generally expect Geostat-style metadata + data arrays; each chart component maps API shape to Recharts / AMCharts / ApexCharts props.
- There is no global client cache (React Query, etc.); each chart loads on mount.

## Visualization libraries

| Library | Typical use |
|---------|-------------|
| **Recharts** | Line, bar, area, pie, treemap, radar on most pages |
| **AMCharts 5** | Georgia maps, some complex visuals |
| **ApexCharts** | Selected charts via `react-apexcharts` |
| **Leaflet** | Map overlays where needed |

Vite `manualChunks` in `vite.config.js` splits vendors (`vendor-charts`, `vendor-maps`, `vendor-export`, `vendor-excel`, etc.) for smaller initial loads.

## Downloads and exports

- **Shared:** `src/components/Download/` — `downloadPDF.js`, `downloadExcel.js` (ExcelJS + file-saver), `ChartDownload.jsx`, image helpers.
- **Per-chart folders:** Many pages still have `Charts/**/Download/` with local `Download.jsx` wiring and occasionally bespoke `downloadExcel.js` (e.g. rivers/lakes tables). Identical duplicates are consolidated via `scripts/consolidate-all-download-groups.mjs` into hashed variants under shared `Download/`.
- **Legacy:** Some modules still use `xlsx` (e.g. Protected Areas map export); shared Excel path prefers **ExcelJS**.
- **Fonts for PDF export:** Georgian glyphs use `/src/assets/fonts/NotoSansGeorgian_ExtraCondensed-Bold.ttf`.

## Internationalization

- URL segment `ge` | `en` drives copy via `useParams().language`.
- Document title and `lang` attribute: `useAppTitle()` in `App.jsx`.
- Chart titles/units come from `chartInfo` (`title_ge` / `title_en`, `unit_ge` / `unit_en`).
- Hero and section copy often live in colocated `Texts/` or `text.js` files per page.

## Build and deployment

- **Dev:** `npm run dev` — Vite on port 3000, HMR.
- **Prod:** `npm run build` → `dist/`; `npm run preview` to serve locally.
- **Deploy:** Vercel; `@vercel/analytics` in `App.jsx`.

## Maintenance scripts

| Script | Command |
|--------|---------|
| Chart registry audit | `npm run audit:charts` |
| Generate chartInfo from legacy | `node scripts/generate-chart-info.mjs` |
| Migrate loading/error UI | `node scripts/migrate-chart-state-cards.mjs` |
| Consolidate duplicate downloads | `node scripts/consolidate-all-download-groups.mjs` |
| Restructure path codemod (historical) | `node scripts/restructure-src.mjs` |

Run codemods only when you understand the diff; prefer small manual follow-ups for edge-case charts (custom headers, maps, Sankey).

## Design constraints for contributors

- **Preserve UI/behavior** when refactoring — this is a production statistics portal, not a greenfield template.
- **Do not** reintroduce a monolithic `Charts.jsx` for search; keep `chartInfo.js` per page.
- **Do not** enable React StrictMode in `main.jsx` without addressing double-fetch on chart pages.
- New charts must participate in the registry if they should appear in search.
- Put new **code** in `pages/`, `components/`, `api/`, or `styles/` — not under `src/assets/`.
