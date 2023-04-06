import { createSlice } from "@reduxjs/toolkit";
import { deleteProductColor } from "../../../actions/productColorActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const deleteProductColorReducer = createSlice({
  name: "deleteProductColorReducer",
  initialState,
  reducers: {
    resetDeleteProductColor: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(deleteProductColor.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(deleteProductColor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(deleteProductColor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetDeleteProductColor } = deleteProductColorReducer.actions;

export default deleteProductColorReducer.reducer;
