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

const logout = createAsyncThunk<void, void>(
  "authSlice/logout",
  async (_, { dispatch }) => {
    await authService.logout();
    dispatch(authActions.resetUser());
  },
);

const logoutAll = createAsyncThunk<void, void>(
  "authSlice/logoutAll",
  async (_, { dispatch }) => {
    await authService.logoutAll();
    dispatch(authActions.resetUser());
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

const changePassword = createAsyncThunk<
  void,
  { token: string; old_password: string; new_password: string }
>(
  "authSlice/changePassword",
  async ({ token, old_password, new_password }, { rejectWithValue }) => {
    try {
      await authService.changePassword(token, old_password, new_password);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutAll.fulfilled, (state) => {
        state.user = null;
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
  logout,
  logoutAll,
  forgotPassword,
  resetPassword,
  changePassword,
};

export { authActions, authReducer };
