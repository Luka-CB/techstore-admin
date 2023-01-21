import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAdmin = createAsyncThunk(
  "LOGIN_ADMIN",
  async (adminData, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/users/admin/login", adminData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      localStorage.setItem("techstoreAdmin", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  "LOGOUT_ADMIN",
  async (undefined, thunkAPI) => {
    try {
      await axios.post(
        "/api/users/admin/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.removeItem("techstoreAdmin");
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
