
import { ADD_USER_ICON, ADMIN_PANEL_ICON, APPOINTMENT_CALENDAR_ICON, DOCTOR_ICON, HOME_ICON, IN_PATIENT_ICON, OUT_PATIENT_ICON, RX_DASHBOARD_ICON, SETTINGS_ICON, USERS_ICON, USER_ICON } from "../constants/icons";

const SIDE_NAV_ITEMS = [
  {
    name: "Home",
    url: "home",
    key: "",
    openInNewTab: false,
    icon: HOME_ICON,
    tooltip: "Home",
  },
  {
    name: "Out Patient",
    key: "outpatient",
    url: null,
    openInNewTab: false,
    icon: OUT_PATIENT_ICON,
    tooltip: "Out Patient",
    children: [
      {
        name: "Registration",
        parent: "outpatient",
        url: "outpatient/registration",
        openInNewTab: false,
        icon: ADD_USER_ICON,
        tooltip: "OP Registration",
      },
      {
        name: "Patients",
        parent: "outpatient",
        url: "outpatient/opList",
        openInNewTab: false,
        icon: USERS_ICON,
        tooltip: "Out Patients",
      },
    ],
  },
  {
    name: "Appointment",
    url: "home",
    key: "appointment",
    openInNewTab: false,
    icon: APPOINTMENT_CALENDAR_ICON,
    tooltip: "Appointment",
  },
  {
    name: "Masters",
    url: null,
    key: "masters",
    icon: ADMIN_PANEL_ICON,
    tooltip: "Masters",
    children: [
      {
        name: "Common",
        parent: "masters",
        url: "masters/common",
        openInNewTab: false,
        icon: RX_DASHBOARD_ICON,
        tooltip: "Common Masters",
      },
      {
        name: "Doctor",
        parent: "masters",
        url: "masters/doctor",
        openInNewTab: false,
        icon: DOCTOR_ICON,
        tooltip: "Doctor Masters",
      },
      {
        name: "Users & Roles",
        parent: "masters",
        url: "masters/rolesAndUsers",
        openInNewTab: false,
        icon: USERS_ICON,
        tooltip: "Users & Roles Masters",
      },
    ],
  },
  {
    name: "Settings",
    url: "settings",
    key: "settings",
    openInNewTab: false,
    icon: SETTINGS_ICON,
    tooltip: "Settings",
  },
];

export  { SIDE_NAV_ITEMS }