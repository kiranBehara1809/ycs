
import { ADMIN_PANEL_ICON, HOME_ICON, SETTINGS_ICON } from "../constants/icons";

const SIDE_NAV_ITEMS = [
  {
    name: "Home",
    url: "home",
    openInNewTab: false,
    icon: HOME_ICON,
    tooltip : "Home"
  },
  {
    name: "Masters",
    url: "masters",
    openInNewTab: false,
    icon: ADMIN_PANEL_ICON,
    tooltip : "Masters"
  },
  {
    name: "Settings",
    url: "settings",
    openInNewTab: false,
    icon: SETTINGS_ICON,
    tooltip : "Settings"
  },
];

export  { SIDE_NAV_ITEMS }