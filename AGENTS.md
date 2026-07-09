# Cursor Agent instructions

Primary context file for **Cursor** when working in this repo. For full detail, read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). A short rule summary also lives in `.cursor/rules/environmental-portal.mdc`.

## What this project is

A bilingual (`/ge`, `/en`) React SPA that visualizes official Georgian environmental statistics: air, water, climate, biodiversity, energy, transport, waste, and reports. Charts are interactive; many support PDF/Excel/image export.

## Stack (current)

- React 19, Vite 7, React Router 7, Sass + Tailwind 4
- Charts: Recharts, AMCharts 5, ApexCharts; maps: Leaflet + AMCharts geodata
- Exports: ExcelJS, jsPDF, html2canvas, file-saver (some legacy `xlsx` modules remain)

## Non-negotiables

1. **Do not break existing UI or behavior** unless the user explicitly asks for a visual/UX change.
2. **Chart search** is driven by per-page `chartInfo.js` + `src/chartRegistry/` — never add a monolithic global charts list.
3. Every searchable chart needs a stable `chartID` on the DOM wrapper and an entry in that page’s `chartInfo.js`.
4. **Do not enable React StrictMode** in `main.jsx` without a plan for double-fetch on mount.
5. Prefer **shared** modules: `ChartCard/ChartStateCards`, `Download/`, `useScrollToChartHash`, `ChartLineTooltip` where applicable.
6. **Retries:** use `retryKey` + `onRetry`, not `window.location.reload()`.
7. **Minimize diff scope** — match surrounding naming, imports, and patterns.

## Key paths

| Area | Location |
|------|----------|
| Routes (lazy pages) | `src/routes.jsx` |
| App shell | `src/App.jsx` |
| Chart registry | `src/chartRegistry/` |
| Page charts | `src/pages/**/chartInfo.js` |
| Search bar | `src/components/SearchBar/SearchBar.jsx` |
| Shared chart states | `src/components/ChartCard/ChartStateCards.jsx` |
| Shared downloads | `src/components/Download/` |
| API helpers | `src/api/` |
| Static fonts/images | `src/assets/fonts/`, `src/assets/images/` |
| Global styles | `src/styles/` |

## Common tasks

**New chart:** `chartInfo.js` entry → chart component with `id={chartInfo.chartID}` → `ChartStateCards` for load/error/empty → page uses `useScrollToChartHash()` → `npm run audit:charts`.

**New page:** component under `src/pages/` → lazy route in `routes.jsx` → navigation in `src/components/Header/Navigation/sections/sections.jsx`.

**Refactor duplicate downloads:** check `scripts/consolidate-all-download-groups.mjs`; keep bespoke exporters if signatures differ.

## Commands

```bash
npm run dev      # local dev :3000
npm run build    # must pass before claiming done
npm run lint
npm run audit:charts
```

## Out of scope unless asked

- Commits, pushes, or PR creation
- Large-scale migration of every chart to new abstractions in one PR
- Adding TypeScript or new state libraries without explicit request
