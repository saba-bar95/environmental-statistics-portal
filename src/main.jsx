import { createRoot } from "react-dom/client";
import routes from "./routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.scss";
import "./main.css";

const router = createBrowserRouter(routes);

// StrictMode intentionally omitted: chart pages fetch on mount; double-invoked
// effects in dev caused duplicate API calls and confusing load states.
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
