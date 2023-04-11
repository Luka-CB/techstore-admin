import { createSlice } from "@reduxjs/toolkit";
import { addProductColor } from "../../../actions/productColorActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
  addedColor: {},
};

const addProductColorReducer = createSlice({
  name: "addProductColorReducer",
  initialState,
  reducers: {
    resetAddProductColor: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductColor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
        state.addedColor = payload.addedColor;
      })
      .addCase(addProductColor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetAddProductColor } = addProductColorReducer.actions;

export default addProductColorReducer.reducer;
