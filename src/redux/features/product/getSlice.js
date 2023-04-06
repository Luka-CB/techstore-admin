import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../actions/productActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  products: [],
  paginationData: {},
  errorMsg: "",
};

const getProductsReducer = createSlice({
  name: "getProductsReducer",
  initialState,
  reducers: {
    resetGetProducts: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(getProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = payload.products;
        state.paginationData = payload.paginationData;
      }),
      addCase(getProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetProducts } = getProductsReducer.actions;

export default getProductsReducer.reducer;
