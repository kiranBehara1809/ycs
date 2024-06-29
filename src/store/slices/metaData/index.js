import { createSlice, configureStore } from "@reduxjs/toolkit";
import { PROJECT_INFO } from "../../../constants/project";

const initalState = {
  pageHeader: PROJECT_INFO.name,
};
const MetaDataSlice = createSlice({
  name: "metaData",
  initialState: initalState,
  reducers: {
    setMetaData: (state, { payload }) => {
      state.pageHeader = payload.pageHeader;
    },
  },
});

export const META_DATA_ACTIONS = MetaDataSlice.actions;
export default MetaDataSlice;
