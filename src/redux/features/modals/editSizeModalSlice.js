import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editSizeData: {},
  isEditSizeModalOpen: false,
};

const editSizeModalReducer = createSlice({
  name: "editSizeModalReducer",
  initialState,
  reducers: {
    setEditSizedata: (state, { payload }) => {
      state.editSizeData = payload;
    },
    toggleEditSizeModal: (state, { payload }) => {
      state.isEditSizeModalOpen = payload;
      state.editSizeData = !payload && {};
    },
  },
});

export const { setEditSizedata, toggleEditSizeModal } =
  editSizeModalReducer.actions;

export default editSizeModalReducer.reducer;
