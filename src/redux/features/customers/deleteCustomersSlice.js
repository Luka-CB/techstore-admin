import { createSlice } from "@reduxjs/toolkit";
import { deleteCustomers } from "../../actions/customerActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteCustomersReducer = createSlice({
  name: "deleteCustomersReducer",
  initialState,
  reducers: {
    resetDeleteCustomers: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      })
      .addCase(deleteCustomers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteCustomers } = deleteCustomersReducer.actions;

export default deleteCustomersReducer.reducer;
