import { createSlice } from "@reduxjs/toolkit";
import { addImage } from "../../actions/galleryActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
  addedImage: {},
};

const addImageReducer = createSlice({
  name: "addImageReducer",
  initialState,
  reducers: {
    resetAddImage: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(addImage.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(addImage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
        state.addedImage = payload.image;
      }),
      addCase(addImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetAddImage } = addImageReducer.actions;

export default addImageReducer.reducer;
