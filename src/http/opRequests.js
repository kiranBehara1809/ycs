import axios from "axios";
import { API_ENDPOINT } from "../constants/project";
import api from "./httpWrapper";
import store from "../store";
import { LOADER_ACTIONS } from "../store/slices/loader";
import { showBasicToast } from "../common/functions/function";
import { API_FAILURE_MSG } from "../constants/errorText";


const saveNewOutPatient = async (body) => {
  store.dispatch(LOADER_ACTIONS.setLoading(true));
  try {
    let response = await api.post(`op/save`, JSON.stringify(body));
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    return response?.data || null;
  } catch (e) {
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    showBasicToast(
      "error",
      e?.response?.data?.error?.message || API_FAILURE_MSG
    );
    console.log(`Error While saving Out Patient ---> `, e);
  }
};

const getAllPatients = async (body) => {
  store.dispatch(LOADER_ACTIONS.setLoading(true));
  try {
    let response = await api.get(`op/all`, JSON.stringify(body));
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    return response?.data || null;
  } catch (e) {
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    showBasicToast(
      "error",
      e?.response?.data?.error?.message || API_FAILURE_MSG
    );
    console.log(`Error While fetching all Out Patient ---> `, e);
  }
};



export { saveNewOutPatient, getAllPatients };
