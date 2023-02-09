import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
  "ADD_PRODUCT",
  async ({ route, productData }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `/api/admin/${route}/add`,
        productData,
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

export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async ({ route, searchQ = "", page = "1", perPage = "" }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/admin/${route}/get?searchQ=${searchQ}&page=${page}&perPage=${perPage}`,
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

export const getProduct = createAsyncThunk(
  "GET_PRODUCTS",
  async ({ route, productId }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/admin/${route}/get-one/${productId}`,
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

export const updateProductInfo = createAsyncThunk(
  "UPDATE_PRODUCT_INFO",
  async ({ route, info }, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/api/admin/${route}/update-info`,
        info,
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

export const deleteProduct = createAsyncThunk(
  "DELETE_PRODUCT",
  async ({ route, productId }, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `/api/admin/${route}/delete/${productId}`,
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

export const deleteManyProduct = createAsyncThunk(
  "DELETE_MANY_PRODUCT",
  async ({ route, productIds }, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `/api/admin/${route}/delete-many`,
        { data: { productIds } },
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
