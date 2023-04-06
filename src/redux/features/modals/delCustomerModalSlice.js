import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isDelCustomerModalOpen: false,
};

const delCustomerModalReducer = createSlice({
  name: "delCustomerModalReducer",
  initialState,
  reducers: {
    setDelCustomerModalData: (state, { payload }) => {
      state.data = payload;
    },
    toggleDelCustomerModal: (state, { payload }) => {
      state.isDelCustomerModalOpen = payload;
      state.data = !payload && {};
    },
  },
});

export const { setDelCustomerModalData, toggleDelCustomerModal } =
  delCustomerModalReducer.actions;

export default delCustomerModalReducer.reducer;
