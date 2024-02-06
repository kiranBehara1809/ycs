import axios from "axios";
import {
  ACCESS_TOKEN_KEY_NAME,
  API_ENDPOINT,
  REFRESH_TOKEN_KEY_NAME,
} from "../constants/project";
import { showBasicToast } from "../common/functions/function";
import { API_FAILURE_MSG } from "../constants/errorText";
import store from "../store";
import { LOADER_ACTIONS } from "../store/slices/loader";
import api from "./httpWrapper";

const getCurrentUser = async () => {
  store.dispatch(LOADER_ACTIONS.setLoading(true));
  try {
    let response = await api.get(`${API_ENDPOINT}/users/currentUser`);
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    return response.data;
  } catch (e) {
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    showBasicToast("error", e?.response?.data?.error?.message || API_FAILURE_MSG);
    console.log("Error While calling currentUser API ---> ", e);
  }
};

export { getCurrentUser };