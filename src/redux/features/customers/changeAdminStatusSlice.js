import { createSlice } from "@reduxjs/toolkit";
import { changeAdminStatus } from "../../actions/customerActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const changeAdminStatusReducer = createSlice({
  name: "changeAdminStatusReducer",
  initialState,
  reducers: {
    resetChangeAdminStatus: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(changeAdminStatus.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(changeAdminStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(changeAdminStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetChangeAdminStatus } = changeAdminStatusReducer.actions;

export default changeAdminStatusReducer.reducer;
