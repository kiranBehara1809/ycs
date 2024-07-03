import {
  CAR_ICON,
  FONT_SIZE_ICON,
  GAME_ICON,
  LAPTOP_ICON,
  LIFESTYLE_ICON,
  MOBILE_ICON,
  PALETTE_ICON,
} from "../../../constants/icons";
import { CHANNEL_LINKS } from "../../../constants/project";

const HOME_GENRE_MENU = [
  {
    name: "Mobiles",
    url: "mobiles",
    isDialog: false,
    uniqueName: "MOBILES",
    apiEndPoint: null,
    openInNewTab: false,
    icon: MOBILE_ICON,
    hideAddBtn: false,
  },
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
];

const HOME_CARDS = [
  {
    icon: MOBILE_ICON,
    name: "Prasad Tech in Telugu",
    count: 20,
    description: "mobiles reviewed so far",
    tooltip: "",
    youtubeChannel: CHANNEL_LINKS.main,
    inprogress: 3,
  },
  {
    icon: LIFESTYLE_ICON,
    count: 8,
    name: "Lifestyle",
    description: "Laptops reviewed so far",
    tooltip: "",
    youtubeChannel: CHANNEL_LINKS.sub_one,
    inprogress: 0,
  },
  {
    icon: CAR_ICON,
    count: 8,
    description: "Cars reviewed so far",
    tooltip: "",
    name: "Automobiles",
    youtubeChannel: CHANNEL_LINKS.sub_two,
    inprogress: 1,
  },
  {
    icon: GAME_ICON,
    count: 1,
    description: "Gaming Channel",
    tooltip: "",
    name: "Gaming",
    youtubeChannel: CHANNEL_LINKS.sub_three,
    inprogress: 1,
  },
];

export { HOME_GENRE_MENU, HOME_CARDS };
