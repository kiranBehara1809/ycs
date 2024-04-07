import {  configureStore } from "@reduxjs/toolkit";

const { default: LoaderSlice } = require("./slices/loader");
const { default: CurrentUserSlice } = require("./slices/currentUser");

const store = configureStore({
  reducer: {
    loader: LoaderSlice.reducer,
    currentUser: CurrentUserSlice.reducer
  },
});

export default store;