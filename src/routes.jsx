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

const Homepage = lazyPage(() => import("./assets/components/Homepage/Homepage"));
const Air = lazyPage(() => import("./assets/components/Pages/Air/Air"));
const Climate = lazyPage(() => import("./assets/components/Pages/Climate/Climate"));
const Water = lazyPage(() => import("./assets/components/Pages/Water/Water"));
const Biodiversity = lazyPage(
  () => import("./assets/components/Pages/Biodiversity/Biodiversity")
);
const Energy = lazyPage(() => import("./assets/components/Pages/Energy/Energy"));
const Transport = lazyPage(
  () => import("./assets/components/Pages/Transport/Transport")
);
const Waste = lazyPage(() => import("./assets/components/Pages/Waste/Waste"));
const Other = lazyPage(() => import("./assets/components/Pages/Other/Other"));
const Reports = lazyPage(() => import("./assets/components/Pages/Reports/Reports"));
const Disasters = lazyPage(
  () => import("./assets/components/Pages/Climate/Disasters/Disasters")
);
const Emissions = lazyPage(
  () => import("./assets/components/Pages/Climate/Emissions/Emissions")
);
const Precipitation = lazyPage(
  () => import("./assets/components/Pages/Climate/Precipitation/Precipitation")
);
const Temperature = lazyPage(
  () => import("./assets/components/Pages/Climate/Temperature/Temperature")
);
const Majors = lazyPage(() => import("./assets/components/Pages/Water/Majors/Majors"));
const Protection = lazyPage(
  () => import("./assets/components/Pages/Water/Protection/Protection")
);
const SupplyAndLosses = lazyPage(
  () => import("./assets/components/Pages/Water/SupplyAndLosses/SupplyAndLosses")
);
const ProtectedAreas = lazyPage(
  () => import("./assets/components/Pages/Biodiversity/ProtectedAreas/ProtectedAreas")
);
const ForestAndFieldFires = lazyPage(
  () =>
    import("./assets/components/Pages/Biodiversity/ForestAndFieldFires/ForestAndFieldFires")
);
const ForestArea = lazyPage(
  () => import("./assets/components/Pages/Biodiversity/ForestArea/ForestArea")
);
const ForestResources = lazyPage(
  () =>
    import(
      "./assets/components/Pages/Biodiversity/ForestArea/ForestResources/ForestResources"
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
