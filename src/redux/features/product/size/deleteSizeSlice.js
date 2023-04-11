import { createSlice } from "@reduxjs/toolkit";
import { deleteProductSize } from "../../../actions/productSizeActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteProductSizeReducer = createSlice({
  name: "deleteProductSizeReducer",
  initialState,
  reducers: {
    resetDeleteProductSize: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductSize.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      })
      .addCase(deleteProductSize.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteProductSize } = deleteProductSizeReducer.actions;

export default deleteProductSizeReducer.reducer;
