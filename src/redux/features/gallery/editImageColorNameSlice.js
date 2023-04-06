import { createSlice } from "@reduxjs/toolkit";
import { editImageColorName } from "../../actions/galleryActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  updatedImgColor: {},
  successMsg: "",
  errorMsg: "",
};

const editImageColorNameReducer = createSlice({
  name: "editImageColorNameReducer",
  initialState,
  reducers: {
    resetEditImageColorName: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.successMsg = "";
      state.errorMsg = "";
    },

    resetUpdatedImgColor: (state) => {
      state.updatedImgColor = {};
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(editImageColorName.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(editImageColorName.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
        state.updatedImgColor = payload.updatedImgColor;
      }),
      addCase(editImageColorName.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetEditImageColorName, resetUpdatedImgColor } =
  editImageColorNameReducer.actions;

export default editImageColorNameReducer.reducer;
