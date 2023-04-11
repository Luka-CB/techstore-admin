import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "../../actions/adminActions";

const adminFromStorage = localStorage.getItem("techstoreAdmin")
  ? JSON.parse(localStorage.getItem("techstoreAdmin"))
  : {};

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMsg: "",
  admin: adminFromStorage,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = "";
      state.admin = {};
    },
    logout: (state) => {
      state.admin = {};
      localStorage.removeItem("techstoreAdmin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = payload;
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetAuth, logout } = authReducer.actions;

export default authReducer.reducer;
