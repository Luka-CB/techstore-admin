import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const addProductColor = createAsyncThunk(
  "ADD_PRODUCT_COLOR",
  async ({ route, color }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(`/api/admin/${route}/add-color`, color, {
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

export const editProductColor = createAsyncThunk(
  "EDIT_PRODUCT_COLOR",
  async ({ route, color }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `/api/admin/${route}/edit-color`,
        color,
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

export const deleteProductColor = createAsyncThunk(
  "DELETE_PRODUCT_COLOR",
  async ({ route, ids }, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `/api/admin/${route}/delete-color?productId=${ids.productId}&colorId=${ids.colorId}`,
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
