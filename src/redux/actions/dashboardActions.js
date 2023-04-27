import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getDashboardInfo = createAsyncThunk(
  "GET_DASHBOARD_INFO",
  async (undefined, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.get(`/api/admin/dashboard/info`, {
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
