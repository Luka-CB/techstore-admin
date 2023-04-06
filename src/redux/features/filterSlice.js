import { createSlice } from "@reduxjs/toolkit";

const perPageFromStorage = localStorage.getItem("perPage")
  ? JSON.parse(localStorage.getItem("perPage"))
  : 20;

const initialState = {
  page: 1,
  perPage: perPageFromStorage,
  searchQ: "",
};

const filterReducer = createSlice({
  name: "filterReducer",
  initialState,
  reducers: {
    resetFilter: () => initialState,

    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setPerPage: (state, { payload }) => {
      state.perPage = payload;
    },
    setSearchQ: (state, { payload }) => {
      state.searchQ = payload;
    },
  },
});

export const { setPage, setPerPage, setSearchQ, resetFilter } =
  filterReducer.actions;

export default filterReducer.reducer;
