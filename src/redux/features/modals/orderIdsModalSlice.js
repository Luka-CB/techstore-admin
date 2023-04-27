import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isOrderIdsModalOpen: false,
};

const orderIdsModalReducer = createSlice({
  name: "orderIdsModalReducer",
  initialState,
  reducers: {
    setOrderIdsModalData: (state, { payload }) => {
      state.data = payload;
    },
    toggleOrderIdsModal: (state, { payload }) => {
      state.isOrderIdsModalOpen = payload;
    },
  },
});

export const { setOrderIdsModalData, toggleOrderIdsModal } =
  orderIdsModalReducer.actions;

export default orderIdsModalReducer.reducer;
