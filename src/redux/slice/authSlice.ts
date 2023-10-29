import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IAuth, ITokens, IUser } from "../../interfaces";
import { authService } from "../../services";

interface IState {
  errors: {
    email?: string[];
    detail?: string;
  };
}

const initialState: IState = {
  errors: null,
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

const login = createAsyncThunk<
  { user: IUser } | { tokens: ITokens },
  { user: IAuth }
>("authSlice/login", async ({ user }) => {
  try {
    const userData = await authService.login(user);
    return { user: userData, tokens: undefined };
  } catch (e) {
    const err = e as AxiosError;
    return { tokens: err.response.data, user: undefined };
  }
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(isRejected(), (state, action) => {
        state.errors = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.errors = null;
      }),
});

const { reducer: authReducer, actions } = authSlice;

const authActions = {
  ...actions,
  register,
  login,
};

export { authActions, authReducer };
