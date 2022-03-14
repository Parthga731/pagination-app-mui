import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getPagesData = createAsyncThunk(
  "page/api",
  async (page: number) => {
    const res = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
    );
    return res.data;
  }
);

const initialState = {
  data: [],
  isLoading: true,
  totalpages: 0,
  currentPage: 0,
} as any;

const PaginationSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        data: state.data.concat(action.payload.hits),
      };
    },
    hidePagination: (state) => {
      state.isLoading = false;
    },
    showPagination: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPagesData.fulfilled, (state, action) => {
      return {
        ...state,
        data: state.data.concat(action.payload),
        totalpages: action.payload.nbPages,
        currentPage: action.payload.page,
      };
    });
  },
});

export const { addData, showPagination, hidePagination } =
  PaginationSlice.actions;

export default PaginationSlice;
