import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCustomers = createAsyncThunk(
  "GET_CUSTOMERS",
  async ({ searchQ = "", page = "1", perPage = "" }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/admin/customers/get-all?searchQ=${searchQ}&page=${page}&perPage=${perPage}`,
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

export const changeAdminStatus = createAsyncThunk(
  "CHANGE_ADMIN_STATUS",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/api/admin/customers/change-status/${userId}`,
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

export const deleteCustomers = createAsyncThunk(
  "DELETE_CUSTOMERS",
  async ({ userIds }, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `/api/admin/customers/delete-many`,
        { data: { userIds } },
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

export const deleteCustomer = createAsyncThunk(
  "DELETE_CUSTOMER",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `/api/admin/customers/delete-one/${userId}`,
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
