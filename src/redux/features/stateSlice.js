import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imgError: false,
};

const stateReducer = createSlice({
  name: "stateReducer",
  initialState,
  reducers: {
    toggleImageErrorState: (state, { payload }) => {
      state.imgError = payload;
    },
  },
});

export const { toggleImageErrorState } = stateReducer.actions;

export default stateReducer.reducer;
