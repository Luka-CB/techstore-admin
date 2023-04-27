import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isPostModalOpen: false,
};

const postModalReducer = createSlice({
  name: "postModalReducer",
  initialState,
  reducers: {
    setPostModalData: (state, { payload }) => {
      state.data = payload;
    },
    togglePostModal: (state, { payload }) => {
      state.isPostModalOpen = payload;
    },
  },
});

export const { setPostModalData, togglePostModal } = postModalReducer.actions;

export default postModalReducer.reducer;
