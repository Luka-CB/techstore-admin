import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  imgError: false,
};

const stateReducer = createSlice({
  name: "stateReducer",
  initialState,
  reducers: {
    toggleImageErrorState: (state, { payload }) => {
      state.imgError = payload;
    },
    toggleIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
});

export const { toggleImageErrorState, toggleIsModalOpen } =
  stateReducer.actions;

export default stateReducer.reducer;
