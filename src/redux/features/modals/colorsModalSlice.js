import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colorsData: {
    productId: "",
    colors: [],
  },
  isColorsModalOpen: false,
  isAddColorModalOpen: false,
};

const colorsModalReducer = createSlice({
  name: "colorsModalReducer",
  initialState,
  reducers: {
    setColorsData: (state, { payload }) => {
      state.colorsData = payload;
    },
    toggleColorsModal: (state, { payload }) => {
      state.isColorsModalOpen = payload;
      state.colorsData = !payload && {};
    },
    toggleAddColorModal: (state, { payload }) => {
      state.isAddColorModalOpen = payload;
    },

    addStoreColor: (state, { payload }) => {
      state.colorsData.colors = [...state.colorsData.colors, payload];
    },
    removeStoreColor: (state, { payload }) => {
      const filteredSizes = state.colorsData.colors.filter(
        (color) => color._id !== payload
      );
      state.colorsData.colors = filteredSizes;
    },
    updateStoreColor: (state, { payload }) => {
      let color = state.colorsData.colors.find(
        (color) => color._id === payload._id
      );
      color.name = payload.name;
      color.code = payload.code;
      color.qty = payload.qty;
    },
  },
});

export const {
  setColorsData,
  toggleColorsModal,
  toggleAddColorModal,
  addStoreColor,
  removeStoreColor,
  updateStoreColor,
} = colorsModalReducer.actions;

export default colorsModalReducer.reducer;
