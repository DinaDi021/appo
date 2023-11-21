import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IAuth, IUser } from "../../interfaces";
import { authService } from "../../services";

interface IState {
  user: IUser | null;
  error: {
    email?: string[];
    message?: string;
  };
}

const initialState: IState = {
  user: null,
  error: null,
};

const register = createAsyncThunk<void, { user: IAuth }>(
  "authSlice/register",
  async ({ user }, { rejectWithValue }) => {
    try {
      await authService.register(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const login = createAsyncThunk<IUser, { user: IAuth }>(
  "authSlice/login",
  async ({ user }, { rejectWithValue }) => {
    try {
      const loggedInUser = await authService.login(user);
      return loggedInUser;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const forgotPassword = createAsyncThunk<void, { email: string; url: string }>(
  "authSlice/forgotPassword",
  async ({ email, url }, { rejectWithValue }) => {
    try {
      await authService.forgotPassword(email, url);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const resetPassword = createAsyncThunk<
  void,
  { email: string; password: string; token: string }
>(
  "authSlice/resetPassword",
  async ({ email, password, token }, { rejectWithValue }) => {
    try {
      await authService.resetPassword(email, password, token);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (build) =>
    build
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
      }),
});

const { reducer: authReducer, actions } = authSlice;

const authActions = {
  ...actions,
  register,
  login,
  forgotPassword,
  resetPassword,
};

export { authActions, authReducer };
