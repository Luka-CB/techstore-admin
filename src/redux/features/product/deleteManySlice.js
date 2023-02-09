import { createSlice } from "@reduxjs/toolkit";
import { deleteManyProduct } from "../../actions/productActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteManyProductReducer = createSlice({
  name: "deleteManyProductReducer",
  initialState,
  reducers: {
    resetDeleteManyProduct: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(deleteManyProduct.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(deleteManyProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(deleteManyProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteManyProduct } = deleteManyProductReducer.actions;

export default deleteManyProductReducer.reducer;
