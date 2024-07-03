import { Navigate, useRoutes } from "react-router-dom";
import Home from "./layout/home";
import { BASE_ROUTE_PATH } from "./constants/project";
import PageNotFound from "./common/components/pageNotFound";
import Login from "./modules/auth/login";
import SettingsHome from "./modules/settings/settingsHome";
import About from "./modules/loggedInUser/about";
import DashboardHome from "./modules/dashboard/dashboardHome";
import MarketOutlook from "./modules/marketOutlook/index";
import FundAnalysis from "./modules/fundAnalysis";
import Tasks from "./modules/tasks";
import Users from "./modules/users";
import Mobiles from "./modules/mobiles";
import AutoMobiles from "./modules/autoMobiles";
import UnderDev from "./common/components/underDev";
import CustomHeaderWithSearchBar from "./common/components/customHeaderWithSearchBar";
import { GAME_ICON, LIFESTYLE_ICON, TRIPS_ICON } from "./constants/icons";

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
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "employees",
          element: <Users />,
        },
        {
          path: "mobiles",
          element: <Mobiles />,
        },
        {
          path: "automobiles",
          element: <AutoMobiles />,
        },
        {
          path: "lifestyle",
          element: (
            <>
              <CustomHeaderWithSearchBar
                hideSearchBar
                headerText={"Lifestyle Channel Updates"}
                headerIcon={LIFESTYLE_ICON}
              />
              <UnderDev />
            </>
          ),
        },
        {
          path: "gaming",
          element: (
            <>
              <CustomHeaderWithSearchBar
                hideSearchBar
                headerText={"Gaming Channel Updates"}
                headerIcon={GAME_ICON}
              />
              <UnderDev />
            </>
          ),
        },
        {
          path: "trips",
          element: (
            <>
              <CustomHeaderWithSearchBar
                hideSearchBar
                headerText={
                  "Internation & Domestic Trips related to Work & its expenses"
                }
                headerIcon={TRIPS_ICON}
              />
              <UnderDev />
            </>
          ),
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
