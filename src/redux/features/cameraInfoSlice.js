import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainCamInfo: {
    type: "",
    details: [],
  },
  selfieCamInfo: {
    type: "",
    details: [],
  },
  mainCamInfoErr: false,
  selfieCamInfoErr: false,
};

const cameraInfoReducer = createSlice({
  name: "cameraInfoReducer",
  initialState,
  reducers: {
    resetCameraInfo: () => initialState,

    setMainCamInfo: (state, { payload }) => {
      state.mainCamInfo = payload;
    },
    setSelfieCamInfo: (state, { payload }) => {
      state.selfieCamInfo = payload;
    },

    toggleMainCamInfoErrState: (state, { payload }) => {
      state.mainCamInfoErr = payload;
    },
    toggleSelfieCamInfoErrState: (state, { payload }) => {
      state.selfieCamInfoErr = payload;
    },
  },
});

export const {
  resetCameraInfo,
  setMainCamInfo,
  setSelfieCamInfo,
  toggleMainCamInfoErrState,
  toggleSelfieCamInfoErrState,
} = cameraInfoReducer.actions;

export default cameraInfoReducer.reducer;
