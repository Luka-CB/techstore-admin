import { createSlice } from "@reduxjs/toolkit";
import { updateProductInfo } from "../../actions/productActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const updateProductInfoReducer = createSlice({
  name: "updateProductInfoReducer",
  initialState,
  reducers: {
    resetUpdateProductInfo: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(updateProductInfo.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(updateProductInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(updateProductInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetUpdateProductInfo } = updateProductInfoReducer.actions;

export default updateProductInfoReducer.reducer;
