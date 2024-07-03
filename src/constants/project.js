import projectLogo from "../assets/project-logo.png";

const PROJECT_INFO = {
  name: "PT Family",
  shortName: "PT",
  logo: projectLogo,
  description:
    "A YouTube channel with millions of blessings",
};

const CHANNEL_LINKS = {
  main: "https://www.youtube.com/@Prasadtechintelugu",
  sub_one: "https://www.youtube.com/@prasaddevarakonda",
  sub_two: "https://www.youtube.com/@prasadautomobile",
  sub_three: "https://www.youtube.com/@prasadthegamer",
};
const UI = {
  colorTheme: "blackTheme",
  fieldVariant: "standard",
};

const BASE_ROUTE_PATH = "ptfamily";

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
  CHANNEL_LINKS,
};
