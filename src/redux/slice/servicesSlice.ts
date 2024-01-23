import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IData, IServices } from "../../interfaces";
import { servicesService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  categories: string[];
  services: IServices[];
}

const initialState: IState = {
  categories: [],
  services: [],
};

const getAllServices = createAsyncThunk<IData, void>(
  "servicesSlice/getAllServices",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await servicesService.getAll();
      return data.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const servicesSlice = createSlice({
  name: "servicesSlice",
  initialState,
  reducers: {},
  extraReducers: (build) =>
    build.addCase(getAllServices.fulfilled, (state, action) => {
      state.services = action.payload.services;
      state.categories = action.payload.categories;
    }),
});

const { reducer: servicesReducer, actions } = servicesSlice;

const servicesActions = {
  ...actions,
  getAllServices,
};
export { servicesActions, servicesReducer };
