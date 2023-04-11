import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const loginAdmin = createAsyncThunk(
  "LOGIN_ADMIN",
  async (adminData, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/users/login/admin", adminData);

      localStorage.setItem("techstoreAdmin", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
