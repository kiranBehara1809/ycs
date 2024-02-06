const PROJECT_INFO = {
  name: "Simba Medical Clinic",
  logo: "https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l11f3242118ff2add5d117cbf216f29ac578f6ba6.png",
  description: "This is regarding some sample clinic",
  address: {
    flatNo: "303",
    aptName: "SSS Brundavan",
    colony: "Srinivasa Nagar",
    areaName: "Chandram Palem",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    pincode: "530048",
  },
};

const UI = {
  colorTheme: "greenTheme",
  fieldVariant: "standard",
};

const BASE_ROUTE_PATH = "smc";

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
