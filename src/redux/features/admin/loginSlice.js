import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "../../actions/adminActions";

const adminFromStorage = localStorage.getItem("techstoreAdmin")
  ? JSON.parse(localStorage.getItem("techstoreAdmin"))
  : {};

const initialState = {
  isLoading: false,
  isSuccess: false,
  error: "",
  admin: adminFromStorage,
};

const adminLoginReducer = createSlice({
  name: "adminLoginReducer",
  initialState,
  reducers: {
    resetAdmin: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(loginAdmin.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = payload;
      }),
      addCase(loginAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { resetAdmin } = adminLoginReducer.actions;

export default adminLoginReducer.reducer;
