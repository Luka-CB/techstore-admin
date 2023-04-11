import { createSlice } from "@reduxjs/toolkit";
import { addProduct } from "../../actions/productActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const addProductReducer = createSlice({
  name: "addProductReducer",
  initialState,
  reducers: {
    resetAddProduct: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetAddProduct } = addProductReducer.actions;

export default addProductReducer.reducer;
