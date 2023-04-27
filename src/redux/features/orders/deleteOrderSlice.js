import { createSlice } from "@reduxjs/toolkit";
import { deleteOrder } from "../../actions/orderActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteOrderReducer = createSlice({
  name: "deleteOrderReducer",
  initialState,
  reducers: {
    resetDeleteOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteOrder } = deleteOrderReducer.actions;

export default deleteOrderReducer.reducer;
