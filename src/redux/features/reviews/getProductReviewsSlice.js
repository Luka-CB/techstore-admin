import { createSlice } from "@reduxjs/toolkit";
import { getProductReviews } from "../../actions/reviewActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  reviews: [],
  errorMsg: "",
};

const getProductReviewsReducer = createSlice({
  name: "getProductReviewsReducer",
  initialState,
  reducers: {
    resetGetProductReviews: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = payload;
      })
      .addCase(getProductReviews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetGetProductReviews } = getProductReviewsReducer.actions;

export default getProductReviewsReducer.reducer;
