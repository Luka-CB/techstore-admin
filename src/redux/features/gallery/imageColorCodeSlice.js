import { createSlice } from "@reduxjs/toolkit";
import { getImageColorCode } from "../../actions/galleryActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  colorCode: "",
};

const imageColorCodeReducer = createSlice({
  name: "imageColorCodeReducer",
  initialState,
  reducers: {
    resetImageColorCode: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(getImageColorCode.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(getImageColorCode.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colorCode = payload;
      });
  },
});

export const { resetImageColorCode } = imageColorCodeReducer.actions;

export default imageColorCodeReducer.reducer;
