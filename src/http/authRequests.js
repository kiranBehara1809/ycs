import axios from "axios";
import { API_ENDPOINT } from "../constants/project";

const handleLogin = async (userName) => {
  try {
    let response = await axios.post(`${API_ENDPOINT}/auth/login`, {
      userName,
    });
    return response.data
  } catch (e) {
    console.log("Error While calling Login API ---> ", e);
  }
};

export { handleLogin };
