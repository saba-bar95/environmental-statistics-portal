# Development guide

Day-to-day workflows and conventions for the Environmental Statistics Portal.

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint (React, hooks, Vite refresh rules) |
| `npm run audit:charts` | Validate chart IDs, registry, and page wiring |

## Project stack

- **React 19** + **Vite 7**
- **React Router 7** (`createBrowserRouter`, lazy routes)
- **Sass** + **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **JavaScript only** (no TypeScript in this repo)

## File conventions

- **Components:** Function components; co-locate `Component.jsx` + `Component.scss` when needed.
- **Pages:** `src/assets/components/Pages/<Theme>/<SubPage>/` with optional `Charts/`, `chartInfo.js`, hero `Texts/`.
- **Imports:** Prefer existing relative depth patterns; chart cards live at `src/assets/components/ChartCard/`.
- **Styles:** Global chart styles in `src/assets/styles/`; page-specific SCSS next to the page.
- **Lint:** Unused vars named with leading `_` or uppercase are ignored per `eslint.config.js`.

## Routing checklist

When adding a new page:

1. Create the page component under `Pages/`.
2. Add a lazy import and child route in `src/routes.jsx`.
3. Add navigation entry in `Header/Navigation/sections/sections.jsx` if it should appear in the menu.
4. Add `chartInfo.js` and register charts if the page has searchable visuals.

## Chart checklist

When adding or editing a chart:

1. Entry in `chartInfo.js` with bilingual titles and stable `chartID` (or let `definePageCharts` generate from route prefix).
2. Wrapper `id={chartInfo.chartID}` on the chart root element.
3. `useScrollToChartHash()` on the parent page.
4. Use `ChartStateCards` for loading/error/empty unless the design requires a deliberate exception (e.g. pie + year dropdown).
5. Wire `Download` with the same data shape the export helpers expect.
6. Run `npm run audit:charts` before opening a PR.

## Search and deep links

- Hash format: `/{language}/{route-path}#{chartID}` (e.g. `/en/climate/emissions#climate-emissions-chart-3`).
- `ScrollToTop` avoids scrolling to top when a hash is present.
- Set `search: false` in `chartInfo` for decorative or non-indicator visuals (e.g. some maps).

## Refactoring notes

- **Shared downloads:** Prefer importing from `assets/components/Download/`; run consolidation script after bulk deletes.
- **Tooltips:** Multi-series Recharts charts can use `ChartLineTooltip` + `ChartLineLegend` (see Energy `LineCharts.jsx`).
- **Retries:** Use `retryKey` in `useEffect` deps, not `window.location.reload()`.
- **Codemods:** Scripts under `scripts/` are one-off helpers; read output and fix import paths manually when needed.

## Deployment

- Hosted on **Vercel**; SPA fallback configured in `vercel.json`.
- Environment variables: document any API base URLs in this file when they are introduced (currently many fetches use bundled/static endpoints in `fetchFunctions`).

## Documentation map

| Document | Audience |
|----------|----------|
| [README.md](../README.md) | Overview, setup, live demo |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design and data flow |
| [AGENTS.md](../AGENTS.md) | Cursor Agent (concise rules) |
| [src/chartRegistry/README.md](../src/chartRegistry/README.md) | Chart registry quick reference |
