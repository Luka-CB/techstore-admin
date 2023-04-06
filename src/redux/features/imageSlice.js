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
    setDropImageColorName: (state, { payload }) => {
      state.dropImageData.colorName = payload;
    },
    resetImageData: () => initialState,
  },
});

export const { addDropImageData, setDropImageColorName, resetImageData } =
  imageReducer.actions;

export default imageReducer.reducer;
