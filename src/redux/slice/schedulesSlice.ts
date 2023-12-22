import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IUpdateSchedulesParams } from "../../interfaces";
import { ISchedule } from "../../interfaces/scheduleInterface";
import { schedulesService } from "../../services/schedulesService";
import { progressActions } from "./progressSlice";

interface IState {
  allSchedules: ISchedule[];
  schedule: ISchedule | null;
  updatedSchedule: ISchedule | null;
}

const initialState: IState = {
  allSchedules: [],
  schedule: null,
  updatedSchedule: null,
};

const getAllUsersSchedules = createAsyncThunk<ISchedule[], { userId: number }>(
  "schedulesSlice/getAllUsersSchedules",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await schedulesService.getAllUsersSchedules(userId);
      return data.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const getScheduleById = createAsyncThunk<
  ISchedule,
  { userId: number; scheduleId: number }
>(
  "schedulesSlice/getScheduleById",
  async ({ userId, scheduleId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await schedulesService.getSchedule(userId, scheduleId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const updateScheduleById = createAsyncThunk<
  ISchedule,
  { userId: number; scheduleId: number; params: IUpdateSchedulesParams }
>(
  "schedulesSlice/updateScheduleById",
  async ({ userId, scheduleId, params }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await schedulesService.updateSchedule(
        userId,
        scheduleId,
        params,
      );
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const deleteScheduleById = createAsyncThunk<
  void,
  { userId: number; scheduleId: number }
>(
  "schedulesSlice/deleteScheduleById",
  async ({ userId, scheduleId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await schedulesService.deleteSchedule(userId, scheduleId);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const schedulesSlice = createSlice({
  name: "schedulesSlice",
  initialState,
  reducers: {
    setUpdatedParams: (state, action) => {
      state.updatedSchedule = action.payload;
    },
    clearUpdatedParams: (state) => {
      state.updatedSchedule = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllUsersSchedules.fulfilled, (state, action) => {
        state.allSchedules = action.payload;
      })
      .addCase(getScheduleById.fulfilled, (state, action) => {
        state.schedule = action.payload;
      })
      .addCase(updateScheduleById.fulfilled, (state, action) => {
        state.schedule = action.payload;
        state.updatedSchedule = null;
      })
      .addCase(deleteScheduleById.fulfilled, (state) => {
        state.schedule = null;
      }),
});

const { reducer: schedulesReducer, actions } = schedulesSlice;

const schedulesActions = {
  ...actions,
  getAllUsersSchedules,
  getScheduleById,
  updateScheduleById,
  deleteScheduleById,
};
export { schedulesActions, schedulesReducer };
