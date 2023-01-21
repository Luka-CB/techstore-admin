import { createSlice } from "@reduxjs/toolkit";
import { deleteImage } from "../../actions/galleryActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteImageReducer = createSlice({
  name: "deleteImageReducer",
  initialState,
  reducers: {
    resetDeleteImage: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(deleteImage.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(deleteImage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(deleteImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteImage } = deleteImageReducer.actions;

export default deleteImageReducer.reducer;
