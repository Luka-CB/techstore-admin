import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const addImage = createAsyncThunk(
  "ADD_IMAGE",
  async (info, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `/api/admin/${info.route}/add-image`,
        {
          productId: info.productId,
          imageData: info.imageData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const changeImageStatus = createAsyncThunk(
  "CHANGE_IMAGE_STATUS",
  async (info, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `/api/admin/${info.route}/change-image-status?productId=${info.ids.productId}&imageId=${info.ids.imageId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const deleteImage = createAsyncThunk(
  "DELETE_IMAGE",
  async ({ route, ids }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `/api/admin/${route}/delete-image?productId=${ids.productId}&imageId=${ids.imageId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getImageColorCode = createAsyncThunk(
  "GET_IMAGE_COLOR_CODE",
  async ({ route, query }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.get(
        `/api/admin/${route}/image-color-code?productId=${query.productId}&colorName=${query.colorName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const editImageColorName = createAsyncThunk(
  "EDIT_IMAGE_COLOR_NAME",
  async ({ route, updData }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `/api/admin/${route}/image-color-name`,
        updData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
