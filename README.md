## Environmental Statistics Portal — Georgia Edition

Web platform that aggregates and visualizes **Georgia's key environmental indicators**: air quality, biodiversity, water, climate, transport emissions, energy, waste, and more — through interactive dashboards and charts.

Built for **policymakers, researchers, and the public**, with a bilingual interface and exportable visuals.

---

## Features

- **Smart search** — find indicators via the global chart registry (no need to open a page first)
- **Interactive visualizations** — Recharts, ApexCharts, AMCharts 5
- **Geographic maps** — AMCharts 5 + Leaflet regional views
- **Thematic dashboards** — Air, Water, Climate, Energy, Waste, Biodiversity, Transport, Reports
- **Exports** — PDF, Excel, JPG, PNG on supported charts
- **Bilingual** — Georgian (`/ge`) and English (`/en`)
- **Responsive** — mobile, tablet, and desktop

---

## Screenshot

![Dashboard overview](overview.png)

---

## Live demo

**[environment-statistics-portal.vercel.app](https://environment-statistics-portal.vercel.app/)**

Toggle language in the top-right corner.

---

## Data sources

Official Georgian institutions, including:

- [National Statistics Office of Georgia (Geostat)](https://www.geostat.ge/en)
- [Ministry of Environmental Protection and Agriculture of Georgia](https://mepa.gov.ge/En)
- Other government agencies

---

## Tech stack

| Category | Technology |
|----------|------------|
| Framework | [React 19](https://react.dev/) |
| Build | [Vite 7](https://vite.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Styling | [Sass](https://sass-lang.com/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/), [ApexCharts](https://apexcharts.com/), [AMCharts 5](https://www.amcharts.com/) |
| Maps | [Leaflet](https://leafletjs.com/) + AMCharts geodata |
| Exports | ExcelJS, jsPDF, html2canvas, file-saver |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Hosting | [Vercel](https://vercel.com/) |

---

## Getting started

```bash
git clone https://github.com/saba-bar95/environmental-statistics-portal.git
cd environmental-statistics-portal
npm install
npm run dev
```

Open **http://localhost:3000** (Vite default in `vite.config.js`).

Other commands:

```bash
npm run build          # production build
npm run preview        # preview dist/
npm run lint           # ESLint
npm run audit:charts   # chart registry / ID audit
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Routing, chart registry, search, downloads, build |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Conventions, checklists, scripts |
| [AGENTS.md](AGENTS.md) | Cursor Agent guidelines |
| [src/chartRegistry/README.md](src/chartRegistry/README.md) | Chart registry quick reference |

The `.github/` folder is for GitHub Actions and templates only (not the project homepage).

---

## Project structure (summary)

```
src/
  main.jsx              # RouterProvider bootstrap
  routes.jsx            # Lazy-loaded page routes
  App.jsx               # Header, Footer, Outlet
  chartRegistry/        # Global search index from chartInfo.js files
  hooks/                # Scroll-to-chart, app title, fetch helpers
  pages/                # Dashboard pages + Homepage; chartInfo.js per section
  components/           # Shared shell UI (Header, ChartCard, Download, …)
  api/                  # Data API wrappers (commonData, riversAndLakes, …)
  styles/               # Global SCSS
  assets/               # Static fonts and images only
scripts/                # Audit and maintenance codemods
docs/                   # Architecture and development guides
```

---

## Author

[Saba Barbakadze](https://github.com/saba-bar95)
