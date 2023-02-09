import { createSlice } from "@reduxjs/toolkit";
import { editProductColor } from "../../../actions/productColorActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const editProductColorReducer = createSlice({
  name: "editProductColorReducer",
  initialState,
  reducers: {
    resetEditProductColor: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(editProductColor.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(editProductColor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(editProductColor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetEditProductColor } = editProductColorReducer.actions;

export default editProductColorReducer.reducer;
