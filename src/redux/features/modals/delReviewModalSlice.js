import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isDelReviewModalOpen: false,
};

const delReviewModalReducer = createSlice({
  name: "delReviewModalReducer",
  initialState,
  reducers: {
    setDelReviewModalData: (state, { payload }) => {
      state.data = payload;
    },
    toggleDelReviewModal: (state, { payload }) => {
      state.isDelReviewModalOpen = payload;
    },
  },
});

export const { setDelReviewModalData, toggleDelReviewModal } =
  delReviewModalReducer.actions;

export default delReviewModalReducer.reducer;
