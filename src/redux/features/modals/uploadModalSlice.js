import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageData: {
    image: "",
    name: "",
    size: "",
    colorName: "",
  },
  isUploadImageModalOpen: false,
};

const uploadModalReducer = createSlice({
  name: "uploadModalReducer",
  initialState,
  reducers: {
    toggleUploadImageModal: (state, { payload }) => {
      state.isUploadImageModalOpen = payload;
    },
    setImageData: (state, { payload }) => {
      state.imageData = payload;
    },
    setImageColorName: (state, { payload }) => {
      state.imageData.colorName = payload;
    },
  },
});

export const { toggleUploadImageModal, setImageData, setImageColorName } =
  uploadModalReducer.actions;

export default uploadModalReducer.reducer;
