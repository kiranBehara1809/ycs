import { FONT_SIZE_ICON, PALETTE_ICON } from "../../constants/icons";

const SETTINGS_MENU = [
  {
    name: "Theme",
    url: null,
    isDialog: false,
    uniqueName: "THEME",
    apiEndPoint: null,
    openInNewTab: false,
    icon: PALETTE_ICON,
    hideAddBtn: true,
  },
  {
    name: "Font Size",
    url: null,
    isDialog: false,
    uniqueName: "FONT_SIZE",
    apiEndPoint: null,
    openInNewTab: false,
    icon: FONT_SIZE_ICON,
    hideAddBtn: true,
  },
];

export { SETTINGS_MENU };
