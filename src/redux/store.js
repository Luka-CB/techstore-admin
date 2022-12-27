import { configureStore } from "@reduxjs/toolkit";
import cameraInfoSlice from "./features/cameraInfoSlice";
import imageSlice from "./features/imageSlice";
import stateSlice from "./features/stateSlice";

const store = configureStore({
  reducer: {
    image: imageSlice,
    states: stateSlice,
    cameraInfo: cameraInfoSlice,
  },
});

export default store;
