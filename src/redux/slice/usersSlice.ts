import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IPagination, IUser } from "../../interfaces";
import { usersService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  users: IUser[];
  user: IUser | null;
  userForUpdate: IUser | null;
}

const initialState: IState = {
  users: [],
  user: null,
  userForUpdate: null,
};

const getAllUsers = createAsyncThunk<IPagination<IUser>>(
  "movieSlice/getAllTop",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await usersService.getAll();
      return data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const getUsersById = createAsyncThunk<IUser, { id: number }>(
  "usersSlice/getUsersById",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await usersService.getProfile(id);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    clearUserById: (state) => {
      state.user = null;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(getAllUsers.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.users = data;
      })
      .addCase(getUsersById.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
});

const { reducer: usersReducer, actions } = usersSlice;

const usersActions = {
  ...actions,
  getAllUsers,
  getUsersById,
};
export { usersActions, usersReducer };
