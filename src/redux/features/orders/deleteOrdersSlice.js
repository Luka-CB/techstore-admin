import { createSlice } from "@reduxjs/toolkit";
import { deleteOrders } from "../../actions/orderActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteOrdersReducer = createSlice({
  name: "deleteOrdersReducer",
  initialState,
  reducers: {
    resetDeleteOrders: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      })
      .addCase(deleteOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteOrders } = deleteOrdersReducer.actions;

export default deleteOrdersReducer.reducer;
