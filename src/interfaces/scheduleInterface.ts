import { IAppointment } from "./appointmentInterface";

export interface ISchedule {
  schedule_id: number;
  date: string;
  time: string;
  status: string;
  appointment?: IAppointment;
}

export interface ISchedulesResponse {
  data: ISchedule[];
}
