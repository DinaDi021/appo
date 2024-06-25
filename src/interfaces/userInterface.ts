export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string | null;
  email: string;
  phone_number: string;
  role: string;
  role_id: number;
  image_url: string;
}

export interface IUserResponse {
  data: IUser;
}
