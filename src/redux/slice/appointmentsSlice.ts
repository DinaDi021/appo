import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IAppointment } from "../../interfaces";
import { appointmentsService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  allAppointments: IAppointment[];
  appointment: IAppointment | null;
}

const initialState: IState = {
  allAppointments: [],
  appointment: null,
};

const getUserAllAppointments = createAsyncThunk<
  IAppointment[],
  { userId: number }
>(
  "appointmentsSlice/getUserAllAppointments",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await appointmentsService.getAllAppointments(userId);
      return data.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const getUserAppointmentById = createAsyncThunk<
  IAppointment,
  { userId: number; appointmentId: number }
>(
  "appointmentsSlice/getUserAppointmentById",
  async ({ userId, appointmentId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await appointmentsService.getAppointment(
        userId,
        appointmentId,
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

const deleteAppointmentById = createAsyncThunk<
  void,
  { userId: number; appointmentId: number }
>(
  "appointmentsSlice/deleteAppointmentById",
  async ({ userId, appointmentId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await appointmentsService.deleteAppointment(userId, appointmentId);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const appointmentsSlice = createSlice({
  name: "appointmentsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUserAllAppointments.fulfilled, (state, action) => {
        state.allAppointments = action.payload;
      })
      .addCase(getUserAppointmentById.fulfilled, (state, action) => {
        state.appointment = action.payload;
      })
      .addCase(deleteAppointmentById.fulfilled, (state) => {
        state.appointment = null;
      }),
});

const { reducer: appointmentsReducer, actions } = appointmentsSlice;

const appointmentsActions = {
  ...actions,
  getUserAllAppointments,
  getUserAppointmentById,
  deleteAppointmentById,
};
export { appointmentsActions, appointmentsReducer };
