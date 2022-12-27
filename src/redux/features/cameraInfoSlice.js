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
  setMainCamInfo,
  setSelfieCamInfo,
  toggleMainCamInfoErrState,
  toggleSelfieCamInfoErrState,
} = cameraInfoReducer.actions;

export default cameraInfoReducer.reducer;
