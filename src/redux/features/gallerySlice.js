import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  galleryData: {
    contentType: "",
    productId: "",
    productName: "",
    images: [],
  },
  pickedImage: {
    id: "",
    colorName: "",
    url: "",
    isMain: false,
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
        productName: payload.productName,
        images: [...payload.images, { name: "add-more", _id: "3h4u3rhu3" }],
      };
    },
    setPickedImage: (state, { payload }) => {
      state.pickedImage = payload;
    },
    setPickedImageColorName: (state, { payload }) => {
      state.pickedImage.colorName = payload;
    },
    updateGalleryData: (state, { payload }) => {
      const images = state.galleryData.images;
      images.splice(images.length - 1, 0, payload);
    },
    updateGalleryImageColor: (state, { payload }) => {
      state.galleryData.images.map((img) => {
        if (img._id === payload.imageId) {
          img.colorName = payload.colorName;
        }

        return { ...img };
      });
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
  setPickedImage,
  setPickedImageColorName,
  updateGalleryData,
  updateGalleryImageColor,
  removeGalleryImage,
} = galleryReducer.actions;

export default galleryReducer.reducer;
