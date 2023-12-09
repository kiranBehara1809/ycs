import { BASE_ROUTE_PATH } from "../../constants/project";

const addBaseUrl = (url) => {
  return `/${BASE_ROUTE_PATH}/${url}`;
};

export { addBaseUrl };
