import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageData: {
    image: "",
    name: "",
    size: "",
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
  },
});

export const { toggleUploadImageModal, setImageData } =
  uploadModalReducer.actions;

export default uploadModalReducer.reducer;
