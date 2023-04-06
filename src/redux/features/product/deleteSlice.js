import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct } from "../../actions/productActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteProductReducer = createSlice({
  name: "deleteProductReducer",
  initialState,
  reducers: {
    resetDeleteProduct: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteProduct } = deleteProductReducer.actions;

export default deleteProductReducer.reducer;
