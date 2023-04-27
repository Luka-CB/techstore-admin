import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isItemsModalOpen: false,
};

const orderItemsReducer = createSlice({
  name: "orderItemsReducer",
  initialState,
  reducers: {
    setItems: (state, { payload }) => {
      state.items = payload;
    },
    toggleItemsModal: (state, { payload }) => {
      state.isItemsModalOpen = payload;
    },
  },
});

export const { setItems, toggleItemsModal } = orderItemsReducer.actions;

export default orderItemsReducer.reducer;
