import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductSize = createAsyncThunk(
  "ADD_PRODUCT_SIZE",
  async ({ route, size }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/api/${route}/add-size`, size, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
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
    try {
      const { data } = await axios.put(`/api/${route}/edit-size`, size, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
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
    try {
      const { data } = await axios.put(
        `/api/${route}/delete-size?productId=${ids.productId}&sizeId=${ids.sizeId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
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
