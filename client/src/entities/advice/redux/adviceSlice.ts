import { createSlice } from "@reduxjs/toolkit";
import type { IAdvice } from "../model";
import {
  createAdviceThunk,
  deleteAdviceThunk,
  getAllAdviceThunk,
  getOneAdviceThunk,
} from "./adviceThunk";

type AdviceState = {
  adviceArr: IAdvice[];
  currentAdvice: IAdvice | null;
  loading: boolean;
  errorMessage: string;
};

const initialState: AdviceState = {
  adviceArr: [],
  currentAdvice: null,
  loading: false,
  errorMessage: "",
};

export const adviceSlice = createSlice({
  name: "advice",
  initialState,
  reducers: {
    sortedByTitle: (state) => {
      state.adviceArr.sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdviceThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getAllAdviceThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.adviceArr = action.payload;
      })
      .addCase(getAllAdviceThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(createAdviceThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.adviceArr.push(action.payload);
      })
      .addCase(createAdviceThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(createAdviceThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(deleteAdviceThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(deleteAdviceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.adviceArr = state.adviceArr.filter(
          (advice) => advice.id !== action.payload
        );
      })
      .addCase(deleteAdviceThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(getOneAdviceThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getOneAdviceThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.currentAdvice = action.payload;
      })
      .addCase(getOneAdviceThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
  },
});

export const { sortedByTitle } = adviceSlice.actions;

export default adviceSlice.reducer;
