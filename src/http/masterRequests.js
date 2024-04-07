import axios from "axios";
import { API_ENDPOINT } from "../constants/project";
import api from "./httpWrapper";
import store from "../store";
import { LOADER_ACTIONS } from "../store/slices/loader";
import { showBasicToast } from "../common/functions/function";
import { API_FAILURE_MSG } from "../constants/errorText";

const getMasterDataForDropdown = async (endPoint, labelKey) => {
 store.dispatch(LOADER_ACTIONS.setLoading(true));
 try {
   let response = await api.get(`${endPoint}`);
   const ddData = response?.data?.map(x => {
    return {
      ...x,
      label: x[labelKey] || x.shortName,
      id: x._id,
    };
   }) || []
   store.dispatch(LOADER_ACTIONS.setLoading(false));
   return ddData || null;
 } catch (e) {
   store.dispatch(LOADER_ACTIONS.setLoading(false));
   showBasicToast(
     "error",
     e?.response?.data?.error?.message || API_FAILURE_MSG
   );
   console.log(`Error While calling ${endPoint} API New ---> `, e);
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
  getMasterDataForDropdown,
  getMastersDataByEndPointNew,
  saveMastersData,
  updateMastersData,
  deleteMastersData,
};
