export interface IUpdateProfileParams {
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  phone_number?: string;
  email?: string;
  image_url?: string;
}

export interface IUpdateSchedulesParams {
  date_time: string;
}
