import { createSlice } from "@reduxjs/toolkit";
import { getReviews } from "../../actions/reviewActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  reviews: [],
  reviewCount: 0,
  errorMsg: "",
};

const getReviewsReducer = createSlice({
  name: "getReviewsReducer",
  initialState,
  reducers: {
    resetGetReviews: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = payload.reviews;
        state.reviewCount = payload.count;
      })
      .addCase(getReviews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetReviews } = getReviewsReducer.actions;

export default getReviewsReducer.reducer;
