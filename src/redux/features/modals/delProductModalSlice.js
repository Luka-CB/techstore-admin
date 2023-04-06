import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isDelProductModalOpen: false,
};

const delProductModalReducer = createSlice({
  name: "delProductModalReducer",
  initialState,
  reducers: {
    setDelProductModalData: (state, { payload }) => {
      state.data = payload;
    },
    toggleDelProductModal: (state, { payload }) => {
      state.isDelProductModalOpen = payload;
      state.data = !payload && {};
    },
  },
});

export const { setDelProductModalData, toggleDelProductModal } =
  delProductModalReducer.actions;

export default delProductModalReducer.reducer;
