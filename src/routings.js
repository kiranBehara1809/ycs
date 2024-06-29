import { Navigate, useRoutes } from "react-router-dom";
import Home from "./layout/home";
import { BASE_ROUTE_PATH } from "./constants/project";
import PageNotFound from "./common/components/pageNotFound";
import Login from "./modules/auth/login";
import SettingsHome from "./modules/settings/settingsHome";
import About from "./modules/loggedInUser/about";
import DashboardHome from "./modules/dashboard/dashboardHome";
import FundReview from "./modules/fundAnalysis/fundReview";
import MarketOutlook from "./modules/marketOutlook/index";

export default function Routings() {
  const routes = useRoutes([
    {
      path: "",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: BASE_ROUTE_PATH,
      element: <Home />,
      children: [
        {
          path: "home",
          element: <DashboardHome />,
        },
        {
          path: "fundReview",
          element: <FundReview />,
        },
        {
          path: "marketOutlook",
          element: <MarketOutlook />,
        },
        {
          path: "settings",
          element: <SettingsHome />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "*",
          element: (
            <>
              <PageNotFound />
            </>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <>
          <PageNotFound />{" "}
        </>
      ),
    },
  ]);

  return routes;
}
