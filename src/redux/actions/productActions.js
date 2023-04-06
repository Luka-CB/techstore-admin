import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const addProduct = createAsyncThunk(
  "ADD_PRODUCT",
  async ({ route, productData }, thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/admin/${route}/add`, productData);

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
  async ({ route, searchQ = "", page = "1", perPage = "" }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/admin/${route}/get?searchQ=${searchQ}&page=${page}&perPage=${perPage}`
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

export const getProduct = createAsyncThunk(
  "GET_PRODUCTS",
  async ({ route, productId }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/admin/${route}/get-one/${productId}`
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

export const updateProductInfo = createAsyncThunk(
  "UPDATE_PRODUCT_INFO",
  async ({ route, info }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/api/admin/${route}/update-info`, info);

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
      const { data } = await axios.delete(
        `/api/admin/${route}/delete/${productId}`
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

export const deleteManyProduct = createAsyncThunk(
  "DELETE_MANY_PRODUCT",
  async ({ route, productIds }, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/admin/${route}/delete-many`, {
        data: { productIds },
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
