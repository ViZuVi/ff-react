import { createBrowserRouter } from "react-router";
import { authRoutes } from "./public-routes";
import { appRoutes } from "./private-routes";
import { notFoundRoute } from "./not-found-route";

export const router = createBrowserRouter([
  ...authRoutes,
  ...appRoutes,
  ...notFoundRoute,
]);
