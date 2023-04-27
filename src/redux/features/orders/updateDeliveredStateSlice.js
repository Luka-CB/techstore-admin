import { createSlice } from "@reduxjs/toolkit";
import { updateDeliveredState } from "../../actions/orderActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const updateDeliveredStateReducer = createSlice({
  name: "updateDeliveredStateReducer",
  initialState,
  reducers: {
    resetUpdateDeliveredState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDeliveredState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDeliveredState.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      })
      .addCase(updateDeliveredState.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetUpdateDeliveredState } =
  updateDeliveredStateReducer.actions;

export default updateDeliveredStateReducer.reducer;
