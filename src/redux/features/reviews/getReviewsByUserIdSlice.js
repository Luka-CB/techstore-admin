import { createSlice } from "@reduxjs/toolkit";
import { getReviewsByUserId } from "../../actions/reviewActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  reviews: [],
  errorMsg: "",
};

const getReviewsByUserIdReducer = createSlice({
  name: "getReviewsByUserIdReducer",
  initialState,
  reducers: {
    resetGetReviewsByUserId: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsByUserId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = payload;
      })
      .addCase(getReviewsByUserId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetReviewsByUserId } = getReviewsByUserIdReducer.actions;

export default getReviewsByUserIdReducer.reducer;
