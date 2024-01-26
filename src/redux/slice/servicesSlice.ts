import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  IAddPrice,
  IData,
  IPrice,
  IServices,
  IUpdatePriceParams,
} from "../../interfaces";
import { servicesService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  categories: string[];
  services: IServices[];
  allPrices: IPrice[];
  price: IPrice | null;
  updatedPrice: IPrice | null;
}

const initialState: IState = {
  categories: [],
  services: [],
  allPrices: [],
  price: null,
  updatedPrice: null,
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

const getAllPrices = createAsyncThunk<IPrice[], { userId: number }>(
  "servicesSlice/getAllPrices",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await servicesService.getAllPrices(userId);
      return data.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const getPriceById = createAsyncThunk<
  IPrice,
  { userId: number; priceId: number }
>(
  "servicesSlice/getPriceById",
  async ({ userId, priceId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await servicesService.getPriceById(userId, priceId);
      return data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const addPrice = createAsyncThunk<IPrice, { userId: number; data: IAddPrice }>(
  "servicesSlice/addPrice",
  async ({ userId, data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await servicesService.addPrice(userId, data);
      return response.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const updatePriceById = createAsyncThunk<
  IPrice,
  { userId: number; priceId: number; params: IUpdatePriceParams }
>(
  "servicesSlice/updatePriceById",
  async ({ userId, priceId, params }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await servicesService.updatePriceById(
        userId,
        priceId,
        params,
      );
      return data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const deletePriceById = createAsyncThunk<
  void,
  { userId: number; priceId: number }
>(
  "servicesSlice/deletePriceById",
  async ({ userId, priceId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await servicesService.deletePriceById(userId, priceId);
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
  reducers: {
    setUpdatedParams: (state, action) => {
      state.updatedPrice = action.payload;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.services = action.payload.services;
        state.categories = action.payload.categories;
      })
      .addCase(getAllPrices.fulfilled, (state, action) => {
        state.allPrices = action.payload;
      })
      .addCase(getPriceById.fulfilled, (state, action) => {
        state.price = action.payload;
      })
      .addCase(addPrice.fulfilled, (state, action) => {
        state.allPrices.push(action.payload);
      })
      .addCase(updatePriceById.fulfilled, (state, action) => {
        state.price = action.payload;
        state.updatedPrice = null;
      })
      .addCase(deletePriceById.fulfilled, (state) => {
        state.price = null;
      }),
});

const { reducer: servicesReducer, actions } = servicesSlice;

const servicesActions = {
  ...actions,
  getAllServices,
  getAllPrices,
  getPriceById,
  addPrice,
  updatePriceById,
  deletePriceById,
};
export { servicesActions, servicesReducer };
