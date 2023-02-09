import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editColorData: {},
  isEditColorModalOpen: false,
};

const editColorModalReducer = createSlice({
  name: "editColorModalReducer",
  initialState,
  reducers: {
    setEditColorData: (state, { payload }) => {
      state.editColorData = payload;
    },
    toggleEditColorModal: (state, { payload }) => {
      state.isEditColorModalOpen = payload;
      state.editColorData = !payload && {};
    },
  },
});

export const { setEditColorData, toggleEditColorModal } =
  editColorModalReducer.actions;

export default editColorModalReducer.reducer;
