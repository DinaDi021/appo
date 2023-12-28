import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ICart, ICheckout, IItem } from "../../interfaces/cartInterface";
import { cartsService } from "../../services/cartsService";
import { progressActions } from "./progressSlice";

interface IState {
  cart: ICart | null;
  item: IItem | null;
  selectedCategory: IItem | null;
  selectedSchedule: IItem | null;
  selectedPrice: IItem | null;
  error: {
    message?: string;
  };
}

const initialState: IState = {
  cart: null,
  item: null,
  selectedCategory: null,
  selectedSchedule: null,
  selectedPrice: null,
  error: null,
};

const getAllItem = createAsyncThunk<ICart, { userId: number }>(
  "cartsSlice/getAllItem",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await cartsService.getAll(userId);
      return data.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const addItem = createAsyncThunk<ICart, { userId: number; data: IItem }>(
  "cartsSlice/addItem",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      await cartsService.addItem(userId, data);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const deleteItem = createAsyncThunk<void, { userId: number; cartId: number }>(
  "cartsSlice/deleteItem",
  async ({ userId, cartId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await cartsService.deleteItem(userId, cartId);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const checkoutCart = createAsyncThunk<ICheckout, { userId: number }>(
  "cartsSlice/checkoutCart",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await cartsService.checkoutCart(userId);
      return data.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const cartsSlice = createSlice({
  name: "cartsSlice",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSchedule: (state, action) => {
      state.selectedSchedule = action.payload;
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    resetCartSelection: (state) => {
      state.selectedCategory = null;
      state.selectedSchedule = null;
      state.selectedPrice = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.item = null;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
      }),
});

const { reducer: cartsReducer, actions } = cartsSlice;

const cartsActions = {
  ...actions,
  getAllItem,
  addItem,
  deleteItem,
  checkoutCart,
};
export { cartsActions, cartsReducer };
