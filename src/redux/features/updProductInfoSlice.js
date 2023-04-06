import { createSlice } from "@reduxjs/toolkit";

const updProductInfoFromStorage = localStorage.getItem("updProductInfo")
  ? JSON.parse(localStorage.getItem("updProductInfo"))
  : {};

const initialState = {
  updProductInfo: updProductInfoFromStorage,
};

const updProductInfoReducer = createSlice({
  name: "updProductInfoReducer",
  initialState,
  reducers: {
    setProductInfo: (state, { payload }) => {
      state.updProductInfo = payload;
    },
  },
});

export const { setProductInfo } = updProductInfoReducer.actions;

export default updProductInfoReducer.reducer;
