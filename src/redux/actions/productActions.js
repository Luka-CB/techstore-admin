import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
  "ADD_PRODUCT",
  async ({ route, productData }, thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/${route}/add`, productData, {
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

export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async ({ route }, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/${route}/get`, {
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

export const updateProductInfo = createAsyncThunk(
  "UPDATE_PRODUCT_INFO",
  async ({ route, info }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/api/${route}/update-info`, info, {
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

export const deleteProduct = createAsyncThunk(
  "DELETE_PRODUCT",
  async ({ route, productId }, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/${route}/delete/${productId}`, {
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
