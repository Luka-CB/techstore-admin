import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  galleryData: {
    contentType: "",
    productId: "",
    images: [],
  },
  isGalleryOpen: false,
};

const galleryReducer = createSlice({
  name: "galleryReducer",
  initialState,
  reducers: {
    resetGallery: () => initialState,
    toggleGallery: (state, { payload }) => {
      state.isGalleryOpen = payload;
    },
    setGalleryData: (state, { payload }) => {
      state.galleryData = {
        contentType: payload.contentType,
        productId: payload.productId,
        images: [...payload.images, { name: "add-more", _id: "3h4u3rhu3" }],
      };
    },
    updateGalleryData: (state, { payload }) => {
      const images = state.galleryData.images;
      images.splice(images.length - 1, 0, payload);
    },
    removeGalleryImage: (state, { payload }) => {
      state.galleryData.images = state.galleryData.images.filter(
        (image) => image._id !== payload
      );
    },
  },
});

export const {
  resetGallery,
  toggleGallery,
  setGalleryData,
  updateGalleryData,
  removeGalleryImage,
} = galleryReducer.actions;

export default galleryReducer.reducer;
