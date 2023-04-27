import { createSlice } from "@reduxjs/toolkit";
import { getDashboardInfo } from "../../actions/dashboardActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  info: {},
  errorMsg: "",
};

const getDashboardInfoReducer = createSlice({
  name: "getDashboardInfoReducer",
  initialState,
  reducers: {
    resetGetDashboardInfo: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.info = payload;
      })
      .addCase(getDashboardInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetDashboardInfo } = getDashboardInfoReducer.actions;

export default getDashboardInfoReducer.reducer;
