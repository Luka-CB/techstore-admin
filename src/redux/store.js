import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/admin/loginSlice";
import logoutSlice from "./features/admin/logoutSlice";
import alertSlice from "./features/alertSlice";
import cameraInfoSlice from "./features/cameraInfoSlice";
import imageSlice from "./features/imageSlice";
import stateSlice from "./features/stateSlice";
import gallerySlice from "./features/gallerySlice";
import uploadModalSlice from "./features/modals/uploadModalSlice";
import addImageSlice from "./features/gallery/addImageSlice";
import changeImageStatusSlice from "./features/gallery/changeImageStatusSlice";
import deleteImageSlice from "./features/gallery/deleteImageSlice";
import updProductInfoSlice from "./features/updProductInfoSlice";
import addSlice from "./features/product/addSlice";
import getSlice from "./features/product/getSlice";
import updateInfoSlice from "./features/product/updateInfoSlice";
import deleteSlice from "./features/product/deleteSlice";
import addSizeSlice from "./features/product/size/addSizeSlice";
import editSizeSlice from "./features/product/size/editSizeSlice";
import deleteSizeSlice from "./features/product/size/deleteSizeSlice";
import delSizeModalSlice from "./features/modals/delSizeModalSlice";
import sizesModalSlice from "./features/modals/sizesModalSlice";
import editSizeModalSlice from "./features/modals/editSizeModalSlice";
import delProductModalSlice from "./features/modals/delProductModalSlice";
import checkboxSlice from "./features/checkboxSlice";

const store = configureStore({
  reducer: {
    image: imageSlice,
    states: stateSlice,
    cameraInfo: cameraInfoSlice,
    addProduct: addSlice,
    getProducts: getSlice,
    updateProductInfo: updateInfoSlice,
    deleteProduct: deleteSlice,
    addSize: addSizeSlice,
    editSize: editSizeSlice,
    deleteSize: deleteSizeSlice,
    admin: adminSlice,
    logout: logoutSlice,
    alert: alertSlice,
    gallery: gallerySlice,
    addImage: addImageSlice,
    changeImageStatus: changeImageStatusSlice,
    deleteImage: deleteImageSlice,
    uploadModal: uploadModalSlice,
    sizesModal: sizesModalSlice,
    editSizeModal: editSizeModalSlice,
    delSizeModal: delSizeModalSlice,
    delProductModal: delProductModalSlice,
    updProductInfo: updProductInfoSlice,
    checkbox: checkboxSlice,
  },
});

export default store;
