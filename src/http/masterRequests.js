import axios from "axios";
import { API_ENDPOINT } from "../constants/project";
import api from "./httpWrapper";
import store from "../store";
import { LOADER_ACTIONS } from "../store/slices/loader";
import { showBasicToast } from "../common/functions/function";
import { API_FAILURE_MSG } from "../constants/errorText";

const getMasterDataByEndPoint = async (endPoint) => {
  try {
    let response = await axios.get(`${API_ENDPOINT}${endPoint}/all`);
    return response.data;
  } catch (e) {
    console.log(`Error While calling ${endPoint} API ---> `, e);
    return { status: e.response.status, msg: e.message };
  }
};

const getMastersDataByEndPointNew = async (endPoint) => {
  store.dispatch(LOADER_ACTIONS.setLoading(true));
  try {
    let response = await api.get(`${endPoint}/all`);
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    return response?.data || null;
  } catch (e) {
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    showBasicToast("error", e?.response?.data?.error?.message || API_FAILURE_MSG);
    console.log(`Error While calling ${endPoint} API New ---> `, e);
  }
};

const saveMastersData = async (endPoint, body) => {
  store.dispatch(LOADER_ACTIONS.setLoading(true));
  try {
    let response = await api.post(`${endPoint}/save`, JSON.stringify(body));
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    return response?.data || null;
  } catch (e) {
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    showBasicToast(
      "error",
      e?.response?.data?.error?.message || API_FAILURE_MSG
    );
    console.log(`Error While saving ${endPoint} API  ---> `, e);
  }
};

const updateMastersData = async (endPoint, body) => {
  store.dispatch(LOADER_ACTIONS.setLoading(true));
  try {
    let response = await api.post(`${endPoint}`, JSON.stringify(body));
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    return response?.data || null;
  } catch (e) {
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    showBasicToast(
      "error",
      e?.response?.data?.error?.message || API_FAILURE_MSG
    );
    console.log(`Error While updating ${endPoint} API  ---> `, e);
  }
};

const deleteMastersData = async (endPoint) => {
  store.dispatch(LOADER_ACTIONS.setLoading(true));
  try {
    let response = await api.post(`${endPoint}`);
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    return response?.data || null;
  } catch (e) {
    store.dispatch(LOADER_ACTIONS.setLoading(false));
    showBasicToast(
      "error",
      e?.response?.data?.error?.message || API_FAILURE_MSG
    );
    console.log(`Error While updating ${endPoint} API  ---> `, e);
  }
};

export {
  getMasterDataByEndPoint,
  getMastersDataByEndPointNew,
  saveMastersData,
  updateMastersData,
  deleteMastersData,
};
