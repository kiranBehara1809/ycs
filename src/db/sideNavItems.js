import {
  FUND_ANALYSIS_ICON,
  FUND_INSIGHTS_ICON,
  FUND_REVIEW_ICON,
  HOME_ICON,
  MARKET_OUTLOOK_ICON,
  SETTINGS_ICON,
} from "../constants/icons";

const SIDE_NAV_ITEMS = [
  // {
  //   name: "Home",
  //   url: "home",
  //   key: "",
  //   openInNewTab: false,
  //   icon: HOME_ICON,
  //   tooltip: "Home",
  // },
  {
    name: "Fund Analysis",
    url: null,
    key: "",
    openInNewTab: false,
    icon: FUND_ANALYSIS_ICON,
    tooltip: "Fund Analysis",
    children: [
      {
        name: "Fund Review",
        url: "fundReview",
        key: "",
        openInNewTab: false,
        icon: FUND_REVIEW_ICON,
        tooltip: "Fund Review",
      },
      {
        name: "Fund Insights",
        url: "fundInsights",
        key: "",
        openInNewTab: false,
        icon: FUND_INSIGHTS_ICON,
        tooltip: "Fund Insights",
      },
    ],
  },
  {
    name: "Market Outlook",
    url: "marketOutlook",
    key: "",
    openInNewTab: false,
    icon: MARKET_OUTLOOK_ICON,
    tooltip: "Market Outlook",
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

export { SIDE_NAV_ITEMS };
