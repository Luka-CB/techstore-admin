import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dropImageData: {},
  isDropImageAdded: false,
};

const imageReducer = createSlice({
  name: "imageReducer",
  initialState,
  reducers: {
    addDropImageData: (state, { payload }) => {
      state.dropImageData = payload;
      state.isDropImageAdded = true;
    },
    resetImageData: () => initialState,
  },
});

export const { addDropImageData, resetImageData } = imageReducer.actions;

export default imageReducer.reducer;
