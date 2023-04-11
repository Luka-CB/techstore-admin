import { createSlice } from "@reduxjs/toolkit";
import { deleteCustomer } from "../../actions/customerActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteCustomerReducer = createSlice({
  name: "deleteCustomerReducer",
  initialState,
  reducers: {
    resetDeleteCustomer: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      })
      .addCase(deleteCustomer.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteCustomer } = deleteCustomerReducer.actions;

export default deleteCustomerReducer.reducer;
