import { Navigate, useRoutes } from "react-router-dom";
import Home from "./layout/home";
import { BASE_ROUTE_PATH } from "./constants/project";
import PageNotFound from "./common/components/pageNotFound";
import Login from "./modules/auth/login";
import SettingsHome from "./modules/settings/settingsHome";
import CommonMasterHome from "./modules/masters/commonMasterHome";
import DoctorMasterHome from "./modules/masters/doctorMasterHome";
import OpRegnScreen from "./modules/outPatient/registration/opRegnScreen";
import RolesAndUsersMasterHome from "./modules/masters/rolesAndUsersMasterHome";
import OutPatientsListHome from "./modules/outPatient/outPatientsList/opPatientsListHome";

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
          element: <>ki</>,
        },
        {
          path: "masters",
          children: [
            {
              path: "common",
              index: true,
              element: <CommonMasterHome />,
            },
            {
              path: "doctor",
              element: <DoctorMasterHome />,
            },
            {
              path: "rolesAndUsers",
              element: <RolesAndUsersMasterHome />,
            },
          ],
        },
        {
          path: "outpatient",
          children: [
            {
              path: "registration",
              index: true,
              element: <OpRegnScreen />,
            },
            {
              path: "opList",
              index: true,
              element: <OutPatientsListHome />,
            },
          ],
        },
        {
          path: "settings",
          element: <SettingsHome />,
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
