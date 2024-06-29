import projectLogo from "../assets/project-logo.png";

const PROJECT_INFO = {
  name: "Finanzworks",
  shortName: "FW",
  logo: projectLogo,
  description:
    "Web-based platform for Financial Advisors and Investment Analysts (users)",
};

const UI = {
  colorTheme: "defaultTheme",
  fieldVariant: "standard",
};

const BASE_ROUTE_PATH = "finanzeworks";

const API_ENDPOINT = "http://localhost:8888/api/v1";
const ACCESS_TOKEN_KEY_NAME = "A_TOKEN";
const REFRESH_TOKEN_KEY_NAME = "R_TOKEN";

export {
  PROJECT_INFO,
  BASE_ROUTE_PATH,
  API_ENDPOINT,
  ACCESS_TOKEN_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
  UI,
};
