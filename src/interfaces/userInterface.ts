export interface IUser {
  data: {
    id: number;
    firstname: string;
    lastname: string;
    birthdate: string | null;
    email: string;
    phone_number: string;
    role: {
      id: number;
      role: string;
    };
  };
}
