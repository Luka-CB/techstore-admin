import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorAlert: false,
  successAlert: false,
};

const alertReducer = createSlice({
  name: "alertReducer",
  initialState,
  reducers: {
    toggleErrorAlert: (state, { payload }) => {
      state.errorAlert = payload;
    },
    toggleSuccessAlert: (state, { payload }) => {
      state.successAlert = payload;
    },
  },
});

export const { toggleErrorAlert, toggleSuccessAlert } = alertReducer.actions;

export default alertReducer.reducer;
