import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isDelSizeModalOpen: false,
};

const delSizeModalReducer = createSlice({
  name: "delSizeModalReducer",
  initialState,
  reducers: {
    setDelSizeModalData: (state, { payload }) => {
      state.data = payload;
    },
    toggleDelSizeModal: (state, { payload }) => {
      state.isDelSizeModalOpen = payload;
      state.data = !payload && {};
    },
  },
});

export const { setDelSizeModalData, toggleDelSizeModal } =
  delSizeModalReducer.actions;

export default delSizeModalReducer.reducer;
