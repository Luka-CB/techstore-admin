import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../../actions/orderActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  orders: [],
  count: 0,
  errorMsg: "",
};

const getOrdersReducer = createSlice({
  name: "getOrdersReducer",
  initialState,
  reducers: {
    resetGetOrders: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = payload.orders;
        state.count = payload.orderCount;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetOrders } = getOrdersReducer.actions;

export default getOrdersReducer.reducer;
