import {  configureStore } from "@reduxjs/toolkit";

const { default: LoaderSlice } = require("./slices/loader");

const store = configureStore({
  reducer: {
    loader: LoaderSlice.reducer,
  },
});

export default store;
