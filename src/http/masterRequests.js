import axios from "axios";
import { API_ENDPOINT } from "../constants/project";


const getMasterDataByEndPoint = async (endPoint) => {
  try {
    let response = await axios.get(`${API_ENDPOINT}${endPoint}/all`);
    return response.data;
  } catch (e) {
    console.log(`Error While calling ${endPoint} API ---> `, e);
  }
};

export { getMasterDataByEndPoint };
