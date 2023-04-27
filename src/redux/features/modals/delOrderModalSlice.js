import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isDelOrderModalOpen: false,
};

const delOrderModalReducer = createSlice({
  name: "delOrderModalReducer",
  initialState,
  reducers: {
    setDelOrderModalData: (state, { payload }) => {
      state.data = payload;
    },
    toggleDelOrderModal: (state, { payload }) => {
      state.isDelOrderModalOpen = payload;
    },
  },
});

export const { setDelOrderModalData, toggleDelOrderModal } =
  delOrderModalReducer.actions;

export default delOrderModalReducer.reducer;
