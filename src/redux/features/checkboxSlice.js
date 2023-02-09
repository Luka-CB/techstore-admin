import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedData: {
    contentType: "",
    checkedItemIds: [],
  },
};

const checkboxReducer = createSlice({
  name: "checkboxReducer",
  initialState,
  reducers: {
    addAllCheckItems: (state, { payload }) => {
      state.checkedData.contentType = payload.contentType;
      state.checkedData.checkedItemIds = payload.itemIds;
    },
    addCheckItem: (state, { payload }) => {
      state.checkedData.checkedItemIds.push(payload.itemId);
      state.checkedData.contentType = payload.contentType;
    },

    removeAllCheckItems: (state) => {
      state.checkedData = initialState.checkedData;
    },
    removeCheckItem: (state, { payload }) => {
      state.checkedData.checkedItemIds =
        state.checkedData.checkedItemIds.filter((itemId) => itemId !== payload);
    },
  },
});

export const {
  addAllCheckItems,
  addCheckItem,
  removeAllCheckItems,
  removeCheckItem,
} = checkboxReducer.actions;

export default checkboxReducer.reducer;
