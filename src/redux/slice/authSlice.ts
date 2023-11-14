import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IAuth } from "../../interfaces";
import { authService } from "../../services";

interface IState {
  error: {
    email?: string[];
    message?: string;
  };
}

const initialState: IState = {
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

const login = createAsyncThunk<void, { user: IAuth }>(
  "authSlice/login",
  async ({ user }, { rejectWithValue }) => {
    try {
      await authService.login(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const forgotPassword = createAsyncThunk<
  void,
  { email: string; resetUrl: string }
>(
  "authSlice/forgotPassword",
  async ({ email, resetUrl }, { rejectWithValue }) => {
    try {
      await authService.forgotPassword(email, resetUrl);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const resetPassword = createAsyncThunk<
  void,
  { email: string; token: string; password: string }
>(
  "authSlice/resetPassword",
  async ({ email, token, password }, { rejectWithValue }) => {
    try {
      await authService.resetPassword(email, token, password);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
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
