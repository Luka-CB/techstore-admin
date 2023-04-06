import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const addProductColor = createAsyncThunk(
  "ADD_PRODUCT_COLOR",
  async ({ route, color }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/api/admin/${route}/add-color`, color);

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
    try {
      const { data } = await axios.put(`/api/admin/${route}/edit-color`, color);

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
    try {
      const { data } = await axios.put(
        `/api/admin/${route}/delete-color?productId=${ids.productId}&colorId=${ids.colorId}`,
        {}
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
