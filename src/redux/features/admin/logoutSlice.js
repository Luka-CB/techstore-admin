import { createSlice } from "@reduxjs/toolkit";
import { logoutAdmin } from "../../actions/adminActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const adminLogoutReducer = createSlice({
  name: "adminLogoutReducer",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(logoutAdmin.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(logoutAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      }),
      addCase(logoutAdmin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {} = adminLogoutReducer.actions;

export default adminLogoutReducer.reducer;
