import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IMaster, IUpdateSchedulesParams, QueryParams } from "../../interfaces";
import { IAddSchedule, ISchedule } from "../../interfaces/scheduleInterface";
import { schedulesService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  allSchedules: ISchedule[];
  schedule: ISchedule | null;
  updatedSchedule: ISchedule | null;
  availableSchedules: IMaster[];
  selectedMaster: IMaster | null;
}

const initialState: IState = {
  allSchedules: [],
  schedule: null,
  updatedSchedule: null,
  availableSchedules: [],
  selectedMaster: null,
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

const getAvailableSchedules = createAsyncThunk<
  IMaster[],
  { query: QueryParams }
>(
  "schedulesSlice/getAvailableSchedules",
  async ({ query }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await schedulesService.availableSchedules(
        query.date,
        query.service_id,
        query.category,
        +query.master_id,
      );
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

const addSchedule = createAsyncThunk<
  ISchedule,
  { userId: number; data: IAddSchedule }
>(
  "schedulesSlice/addSchedule",
  async ({ userId, data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await schedulesService.addSchedule(userId, data);
      return response.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
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
    setSelectedMaster: (state, action) => {
      state.selectedMaster = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAvailableSchedules.fulfilled, (state, action) => {
        state.availableSchedules = action.payload;
      })
      .addCase(getAllUsersSchedules.fulfilled, (state, action) => {
        state.allSchedules = action.payload;
      })
      .addCase(getScheduleById.fulfilled, (state, action) => {
        state.schedule = action.payload;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.allSchedules.push(action.payload);
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
  getAvailableSchedules,
  getAllUsersSchedules,
  getScheduleById,
  addSchedule,
  updateScheduleById,
  deleteScheduleById,
};
export { schedulesActions, schedulesReducer };
