import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sizesData: {
    productId: "",
    sizes: [],
  },
  isSizesModalOpen: false,
  isAddSizeModalOpen: false,
};

const sizesModalReducer = createSlice({
  name: "sizesModalReducer",
  initialState,
  reducers: {
    setSizesdata: (state, { payload }) => {
      state.sizesData = payload;
    },
    toggleSizesModal: (state, { payload }) => {
      state.isSizesModalOpen = payload;
      state.sizesData = !payload && {};
    },
    toggleAddSizeModal: (state, { payload }) => {
      state.isAddSizeModalOpen = payload;
    },

    addStoreSize: (state, { payload }) => {
      state.sizesData.sizes = [...state.sizesData.sizes, payload];
    },
    removeStoreSize: (state, { payload }) => {
      const filteredSizes = state.sizesData.sizes.filter(
        (size) => size._id !== payload
      );
      state.sizesData.sizes = filteredSizes;
    },
    updateStoreSize: (state, { payload }) => {
      let size = state.sizesData.sizes.find((size) => size._id === payload._id);
      size.size = payload.size;
      size.qty = payload.qty;
      size.price = payload.price;
    },
  },
});

export const {
  setSizesdata,
  toggleSizesModal,
  toggleAddSizeModal,
  addStoreSize,
  removeStoreSize,
  updateStoreSize,
} = sizesModalReducer.actions;

export default sizesModalReducer.reducer;
