export interface IAuth {
  firstname: string;
  lastname: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_Password: string;
}

export interface IResetPassword
  extends Pick<IAuth, "email" | "password" | "confirm_Password"> {
  token: string;
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
  token: string;
}

export type IForgotPassword = Pick<IAuth, "email">;
