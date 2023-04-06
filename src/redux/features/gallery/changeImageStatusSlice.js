import { createSlice } from "@reduxjs/toolkit";
import { changeImageStatus } from "../../actions/galleryActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMsg: "",
  errorMsg: "",
};

const changeImageStatusReducer = createSlice({
  name: "changeImageStatusReducer",
  initialState,
  reducers: {
    resetChangeImageStatus: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(changeImageStatus.pending, (state) => {
      state.isLoading = true;
    }),
      addCase(changeImageStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMsg = payload.msg;
      }),
      addCase(changeImageStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMsg = payload;
      });
  },
});

export const { resetChangeImageStatus } = changeImageStatusReducer.actions;

export default changeImageStatusReducer.reducer;
