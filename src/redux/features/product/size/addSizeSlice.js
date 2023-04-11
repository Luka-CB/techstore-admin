import { createSlice } from "@reduxjs/toolkit";
import { addProductSize } from "../../../actions/productSizeActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
  addedSize: {},
};

const addProductSizeReducer = createSlice({
  name: "addProductSizeReducer",
  initialState,
  reducers: {
    resetAddProductSize: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductSize.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
        state.addedSize = payload.addedSize;
      })
      .addCase(addProductSize.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetAddProductSize } = addProductSizeReducer.actions;

export default addProductSizeReducer.reducer;
