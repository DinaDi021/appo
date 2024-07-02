import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";

import { IMaster, IUpdateSchedulesParams, QueryParams } from "../../interfaces";
import { IAddSchedule, ISchedule } from "../../interfaces/scheduleInterface";
import { schedulesService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  allSchedules: ISchedule[];
  allSchedulesByDate: ISchedule[];
  schedule: ISchedule | null;
  updatedSchedule: ISchedule | null;
  availableSchedules: IMaster[];
  selectedMaster: IMaster | null;
  filterDate: string;
  addedDateTime: string;
  error: {
    message?: string;
  };
}

const initialState: IState = {
  allSchedules: [],
  allSchedulesByDate: [],
  schedule: null,
  updatedSchedule: null,
  availableSchedules: [],
  selectedMaster: null,
  filterDate: dayjs().toDate().toISOString(),
  addedDateTime: null,
  error: null,
};

const getAllUsersSchedules = createAsyncThunk<
  ISchedule[],
  { userId: number; date?: string[] }
>(
  "schedulesSlice/getAllUsersSchedules",
  async ({ userId, date }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await schedulesService.getAllUsersSchedules(
        userId,
        date,
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
    setSchedulesByDate: (state, action) => {
      state.filterDate = action.payload;
    },
    setAddedDateTime: (state, action) => {
      state.addedDateTime = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAvailableSchedules.fulfilled, (state, action) => {
        state.availableSchedules = action.payload;
      })
      .addCase(getAllUsersSchedules.fulfilled, (state, action) => {
        if (action.meta.arg.date) {
          state.allSchedulesByDate = action.payload;
        } else {
          state.allSchedules = action.payload;
        }
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
      })
      .addMatcher(isRejected(), (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
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
