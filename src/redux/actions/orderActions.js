import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getOrders = createAsyncThunk(
  "GET_ORDERS",
  async (rppn = 0, thunkAPI) => {
    const {
      auth: { admin },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.get(
        `/api/admin/orders/get-all?rppn=${rppn}`,
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
