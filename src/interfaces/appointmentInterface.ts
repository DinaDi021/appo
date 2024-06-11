export interface IAppointment {
  id: number;
  schedule_id: number;
  service_id: number;
  sum: number;
  paid_sum: number;
  payment: "full" | "prepayment";
  title: string;
  category: string;
  firstname?: string;
  master_firstname?: string;
  lastname?: string;
  master_lastname?: string;
  date_time: string;
}

export interface IAppointmentResponse {
  data: IAppointment[];
}
