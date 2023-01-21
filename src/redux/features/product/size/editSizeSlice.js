import { createSlice } from "@reduxjs/toolkit";
import { editProductSize } from "../../../actions/productSizeActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const editProductSizeReducer = createSlice({
  name: "editProductSizeReducer",
  initialState,
  reducers: {
    resetEditProductSize: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(editProductSize.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(editProductSize.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(editProductSize.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetEditProductSize } = editProductSizeReducer.actions;

export default editProductSizeReducer.reducer;
