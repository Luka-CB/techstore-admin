import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../../actions/orderActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  orders: [],
  errorMsg: "",
};

const getOrdersReducer = createSlice({
  name: "getOrdersReducer",
  initialState,
  reducers: {
    resetGetOrders: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(getOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = payload;
      }),
      addCase(getOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetOrders } = getOrdersReducer.actions;

export default getOrdersReducer.reducer;
