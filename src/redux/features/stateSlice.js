import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  imgError: false,
  imgColorNameError: false,
  showMainImgOverlay: false,
  showMainImgColorInfo: false,
};

const stateReducer = createSlice({
  name: "stateReducer",
  initialState,
  reducers: {
    toggleImageErrorState: (state, { payload }) => {
      state.imgError = payload;
    },
    toggleImageColorNameErrorState: (state, { payload }) => {
      state.imgColorNameError = payload;
    },
    toggleIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
    },
    toggleMainImgOverlay: (state, { payload }) => {
      state.showMainImgOverlay = payload;
    },
    toggleMainImgColorInfo: (state, { payload }) => {
      state.showMainImgColorInfo = payload;
    },
  },
});

export const {
  toggleImageErrorState,
  toggleIsModalOpen,
  toggleImageColorNameErrorState,
  toggleMainImgOverlay,
  toggleMainImgColorInfo,
} = stateReducer.actions;

export default stateReducer.reducer;
