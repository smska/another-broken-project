import type { IApiResponseError } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { AdviceApi } from "../api/AdviceApi";
import type { IAdvice, IRawAdvice } from "../model";

export const getAllAdviceThunk = createAsyncThunk<IAdvice[] | null, void>(
  "advice/getAllAdvice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AdviceApi.getAll();
      return response.data.data as IAdvice[]; // action.payload
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const createAdviceThunk = createAsyncThunk<IAdvice | null, IRawAdvice>(
  "advice/createAdvice",
  async (advice: IRawAdvice) => {
    try {
      const response = await AdviceApi.create(advice);
      return response.data.data as IAdvice;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
);
// 1 - что в return, 2 - что в параметрах
export const deleteAdviceThunk = createAsyncThunk<number, number>(
  "advice/deleteAdvice",
  async (id: number, { rejectWithValue }) => {
    try {
      await AdviceApi.delete(id);
      return id; // action.payload
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const getOneAdviceThunk = createAsyncThunk<IAdvice | null, number>(
  "advice/getOneAdvice",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await AdviceApi.getOne(id);
      return response.data.data as IAdvice; // action.payload
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<IApiResponseError>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);
