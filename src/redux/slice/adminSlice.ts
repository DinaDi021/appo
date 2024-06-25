import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  IAddMaster,
  IAddService,
  IRoles,
  IServices,
  IUser,
} from "../../interfaces";
import { adminService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  services: IServices[];
  roles: IRoles[];
  users: IUser[];
  error: {
    message?: string;
  };
  isSuccess: boolean;
}

const initialState: IState = {
  services: [],
  roles: [],
  users: [],
  error: null,
  isSuccess: false,
};

const getAllRoles = createAsyncThunk<IRoles[], void>(
  "adminSlice/getAllRoles",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await adminService.getRoles();
      return data.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const addMaster = createAsyncThunk<IUser, { data: IAddMaster }>(
  "adminSlice/addMaster",
  async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await adminService.addMaster(data);
      return response.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const addService = createAsyncThunk<IServices, { data: IAddService }>(
  "adminSlice/addService",
  async ({ data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await adminService.addService(data);
      return response.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setIsSuccess: (state) => {
      state.isSuccess = true;
    },
    clearIsSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(addMaster.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addMatcher(isRejected(), (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
      }),
});

const { reducer: adminReducer, actions } = adminSlice;

const adminActions = {
  ...actions,
  getAllRoles,
  addMaster,
  addService,
};
export { adminActions, adminReducer };
