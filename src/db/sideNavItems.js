
import { ADMIN_PANEL_ICON, APPOINTMENT_CALENDAR_ICON, DOCTOR_ICON, HOME_ICON, IN_PATIENT_ICON, OUT_PATIENT_ICON, RX_DASHBOARD_ICON, SETTINGS_ICON } from "../constants/icons";

const SIDE_NAV_ITEMS = [
  {
    name: "Home",
    url: "home",
    openInNewTab: false,
    icon: HOME_ICON,
    tooltip: "Home",
  },
  {
    name: "Out Patient",
    url: "outpatient/registration",
    openInNewTab: false,
    icon: OUT_PATIENT_ICON,
    tooltip: "Out Patient",
  },
  {
    name: "In Patient",
    url: "home",
    openInNewTab: false,
    icon: IN_PATIENT_ICON,
    tooltip: "In Patient",
  },
  {
    name: "Appointment",
    url: "home",
    openInNewTab: false,
    icon: APPOINTMENT_CALENDAR_ICON,
    tooltip: "Appointment",
  },
  {
    name: "Masters",
    url: null,
    icon: ADMIN_PANEL_ICON,
    tooltip: "Masters",
    children: [
      {
        name: "Common",
        parent: "Masters",
        url: "masters/common",
        openInNewTab: false,
        icon: RX_DASHBOARD_ICON,
        tooltip: "Common Masters",
      },
      {
        name: "Doctor",
        parent: "Masters",
        url: "masters/doctor",
        openInNewTab: false,
        icon: DOCTOR_ICON,
        tooltip: "Doctor Masters",
      },
    ],
  },
  {
    name: "Settings",
    url: "settings",
    openInNewTab: false,
    icon: SETTINGS_ICON,
    tooltip: "Settings",
  },
];

export  { SIDE_NAV_ITEMS }