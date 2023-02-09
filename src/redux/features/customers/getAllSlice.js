import { createSlice } from "@reduxjs/toolkit";
import { getCustomers } from "../../actions/customerActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  customers: [],
  paginationData: {},
  errorMsg: "",
};

const getAllCustomersReducer = createSlice({
  name: "getAllCustomersReducer",
  initialState,
  reducers: {
    resetGetAllCustomers: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(getCustomers.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = payload.customers;
        state.paginationData = payload.paginationData;
      }),
      addCase(getCustomers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetAllCustomers } = getAllCustomersReducer.actions;

export default getAllCustomersReducer.reducer;
