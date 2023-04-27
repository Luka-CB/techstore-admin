import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  isCustomerReviewsModalOpen: false,
};

const customerReviewsModalReducer = createSlice({
  name: "customerReviewsModalReducer",
  initialState,
  reducers: {
    setUserId: (state, { payload }) => {
      state.userId = payload;
    },
    toggleCustomerReviewsModal: (state, { payload }) => {
      state.isCustomerReviewsModalOpen = payload;
    },
  },
});

export const { setUserId, toggleCustomerReviewsModal } =
  customerReviewsModalReducer.actions;

export default customerReviewsModalReducer.reducer;
