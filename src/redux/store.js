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
import imageColorCodeSlice from "./features/gallery/imageColorCodeSlice";
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
import checkboxSlice from "./features/checkboxSlice";
import deleteManySlice from "./features/product/deleteManySlice";
import filterSlice from "./features/filterSlice";
import getOneSlice from "./features/product/getOneSlice";
import colorsModalSlice from "./features/modals/colorsModalSlice";
import editColorModalSlice from "./features/modals/editColorModalSlice";
import delColorModalSlice from "./features/modals/delColorModalSlice";
import addColorSlice from "./features/product/color/addColorSlice";
import editColorSlice from "./features/product/color/editColorSlice";
import deleteColorSlice from "./features/product/color/deleteColorSlice";
import editImageColorNameSlice from "./features/gallery/editImageColorNameSlice";
import getAllSlice from "./features/customers/getAllSlice";
import changeAdminStatusSlice from "./features/customers/changeAdminStatusSlice";
import deleteCustomerSlice from "./features/customers/deleteCustomerSlice";
import delProductModalSlice from "./features/modals/delProductModalSlice";
import delCustomerModalSlice from "./features/modals/delCustomerModalSlice";
import deleteCustomersSlice from "./features/customers/deleteCustomersSlice";
import getOrdersSlice from "./features/orders/getOrdersSlice";

const store = configureStore({
  reducer: {
    image: imageSlice,
    states: stateSlice,
    cameraInfo: cameraInfoSlice,
    addProduct: addSlice,
    getProducts: getSlice,
    getProduct: getOneSlice,
    updateProductInfo: updateInfoSlice,
    deleteProduct: deleteSlice,
    deleteManyProduct: deleteManySlice,
    addSize: addSizeSlice,
    addColor: addColorSlice,
    editSize: editSizeSlice,
    editColor: editColorSlice,
    deleteSize: deleteSizeSlice,
    deleteColor: deleteColorSlice,
    admin: adminSlice,
    logout: logoutSlice,
    allCustomers: getAllSlice,
    changeAdminStatus: changeAdminStatusSlice,
    deleteCustomers: deleteCustomersSlice,
    deleteCustomer: deleteCustomerSlice,
    alert: alertSlice,
    gallery: gallerySlice,
    addImage: addImageSlice,
    changeImageStatus: changeImageStatusSlice,
    deleteImage: deleteImageSlice,
    imageColorCode: imageColorCodeSlice,
    editImageColorName: editImageColorNameSlice,
    uploadModal: uploadModalSlice,
    sizesModal: sizesModalSlice,
    colorsModal: colorsModalSlice,
    editSizeModal: editSizeModalSlice,
    editColorModal: editColorModalSlice,
    delSizeModal: delSizeModalSlice,
    delColorModal: delColorModalSlice,
    delProductModal: delProductModalSlice,
    delCustomerModal: delCustomerModalSlice,
    updProductInfo: updProductInfoSlice,
    checkbox: checkboxSlice,
    filter: filterSlice,
    getOrders: getOrdersSlice,
  },
});

export default store;
