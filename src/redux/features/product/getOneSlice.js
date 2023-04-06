import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../../actions/productActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  product: {},
  errorMsg: "",
};

const getProductReducer = createSlice({
  name: "getProductReducer",
  initialState,
  reducers: {
    resetGetProduct: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(getProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = payload;
      }),
      addCase(getProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetProduct } = getProductReducer.actions;

export default getProductReducer.reducer;
