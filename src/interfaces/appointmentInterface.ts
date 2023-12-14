export interface IAppointment {
  id: number;
  schedule_id: number;
  service_id: number;
  sum: number;
  payment: "full" | "prepayment";
  title: string;
  category: string;
  master_firstname: string;
  master_lastname: string;
  date: string;
  time: string;
}

export interface IAppointmentResponse {
  data: IAppointment[];
}
