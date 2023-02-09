import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isDelColorModalOpen: false,
};

const delColorModalReducer = createSlice({
  name: "delColorModalReducer",
  initialState,
  reducers: {
    setDelColorModalData: (state, { payload }) => {
      state.data = payload;
    },
    toggleDelColorModal: (state, { payload }) => {
      state.isDelColorModalOpen = payload;
      state.data = !payload && {};
    },
  },
});

export const { setDelColorModalData, toggleDelColorModal } =
  delColorModalReducer.actions;

export default delColorModalReducer.reducer;
