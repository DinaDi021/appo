export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  password: string;
  phone_number: string;
  role: {
    id: number;
    role: string;
  };
}
