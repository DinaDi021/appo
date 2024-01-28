import { IAppointment } from "./appointmentInterface";

export interface ISchedule {
  schedule_id: number;
  date_time: string;
  status: string;
  appointment?: IAppointment;
}

export interface IAddSchedule {
  date_time: string;
}

export interface ISchedulesResponse {
  data: ISchedule[];
}
