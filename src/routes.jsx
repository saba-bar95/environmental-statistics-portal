import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import App from "./App";
import RouteFallback from "./components/RouteFallback.jsx";

const lazyPage = (factory) => {
  const Component = lazy(factory);
  return (
    <Suspense fallback={<RouteFallback />}>
      <Component />
    </Suspense>
  );
};

const Homepage = lazyPage(() => import("./pages/Homepage/Homepage"));
const Air = lazyPage(() => import("./pages/Air/Air"));
const Climate = lazyPage(() => import("./pages/Climate/Climate"));
const Water = lazyPage(() => import("./pages/Water/Water"));
const Biodiversity = lazyPage(
  () => import("./pages/Biodiversity/Biodiversity")
);
const Energy = lazyPage(() => import("./pages/Energy/Energy"));
const Transport = lazyPage(
  () => import("./pages/Transport/Transport")
);
const Waste = lazyPage(() => import("./pages/Waste/Waste"));
const Other = lazyPage(() => import("./pages/Other/Other"));
const Reports = lazyPage(() => import("./pages/Reports/Reports"));
const Disasters = lazyPage(
  () => import("./pages/Climate/Disasters/Disasters")
);
const Emissions = lazyPage(
  () => import("./pages/Climate/Emissions/Emissions")
);
const Precipitation = lazyPage(
  () => import("./pages/Climate/Precipitation/Precipitation")
);
const Temperature = lazyPage(
  () => import("./pages/Climate/Temperature/Temperature")
);
const Majors = lazyPage(() => import("./pages/Water/Majors/Majors"));
const Protection = lazyPage(
  () => import("./pages/Water/Protection/Protection")
);
const SupplyAndLosses = lazyPage(
  () => import("./pages/Water/SupplyAndLosses/SupplyAndLosses")
);
const ProtectedAreas = lazyPage(
  () => import("./pages/Biodiversity/ProtectedAreas/ProtectedAreas")
);
const ForestAndFieldFires = lazyPage(
  () =>
    import("./pages/Biodiversity/ForestAndFieldFires/ForestAndFieldFires")
);
const ForestArea = lazyPage(
  () => import("./pages/Biodiversity/ForestArea/ForestArea")
);
const ForestResources = lazyPage(
  () =>
    import(
      "./pages/Biodiversity/ForestArea/ForestResources/ForestResources"
    )
);

const routes = [
  {
    path: "/",
    element: <Navigate to="/ge" replace />,
  },
  {
    path: "/:language",
    element: <App />,
    children: [
      { index: true, element: Homepage },
      { path: "air", element: Air },
      { path: "climate", element: Climate },
      { path: "water", element: Water },
      { path: "biodiversity", element: Biodiversity },
      { path: "reports", element: Reports },
      { path: "energy", element: Energy },
      { path: "transport", element: Transport },
      { path: "waste", element: Waste },
      { path: "other", element: Other },
      { path: "climate/disasters", element: Disasters },
      { path: "climate/emissions", element: Emissions },
      { path: "climate/precipitation", element: Precipitation },
      { path: "climate/temperature", element: Temperature },
      { path: "water/majors", element: Majors },
      { path: "water/protection", element: Protection },
      { path: "water/supplyandlosses", element: SupplyAndLosses },
      { path: "biodiversity/protectedareas", element: ProtectedAreas },
      { path: "biodiversity/forestandfieldfires", element: ForestAndFieldFires },
      { path: "biodiversity/forestarea", element: ForestArea },
      {
        path: "biodiversity/forestarea/forestresources",
        element: ForestResources,
      },
    ],
  },
];

export default routes;
