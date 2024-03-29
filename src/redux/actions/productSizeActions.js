import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const addProductSize = createAsyncThunk(
  "ADD_PRODUCT_SIZE",
  async ({ route, size }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(`/api/admin/${route}/add-size`, size, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });

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

export const editProductSize = createAsyncThunk(
  "EDIT_PRODUCT_SIZE",
  async ({ route, size }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(`/api/admin/${route}/edit-size`, size, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });

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

export const deleteProductSize = createAsyncThunk(
  "DELETE_PRODUCT_SIZE",
  async ({ route, ids }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `/api/admin/${route}/delete-size?productId=${ids.productId}&sizeId=${ids.sizeId}`,
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
