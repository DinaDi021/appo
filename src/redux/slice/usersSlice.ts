import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  IPagination,
  IUpdateProfileParams,
  IUser,
  IUserResponse,
  QueryParams,
} from "../../interfaces";
import { usersService } from "../../services";
import { authActions } from "./authSlice";
import { progressActions } from "./progressSlice";

interface IState {
  users: IUser[];
  user: IUser | null;
}

const initialState: IState = {
  users: [],
  user: null,
};

const getAllUsers = createAsyncThunk<
  IPagination<IUser>,
  { query: QueryParams }
>(
  "usersSlice/getAllUsers",
  async ({ query }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await usersService.getAll(query.role_id);
      const { data } = response.data;
      return {
        data,
      };
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const getUserById = createAsyncThunk<IUserResponse, { id: number }>(
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

const updateUserById = createAsyncThunk<
  IUserResponse,
  { id: number; params: IUpdateProfileParams }
>(
  "usersSlice/updateUserById",
  async ({ id, params }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await usersService.updateProfile(id, params);
      dispatch(authActions.setLoggedInUser(data.data));
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const deleteUserById = createAsyncThunk<void, { id: number }>(
  "usersSlice/deleteUserById",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await usersService.deleteProfile(id);
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
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.user = action.payload.data;
      }),
});

const { reducer: usersReducer, actions } = usersSlice;

const usersActions = {
  ...actions,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
export { usersActions, usersReducer };
