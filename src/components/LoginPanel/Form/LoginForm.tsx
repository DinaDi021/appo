import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAuth } from "../../../interfaces";
import { authActions } from "../../../redux";

const LoginForm: FC = () => {
  const { register, reset, handleSubmit } = useForm<IAuth>();
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const login: SubmitHandler<IAuth> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login({ user }));

    if (requestStatus === "fulfilled") {
      reset();
      navigate("/main");
    }
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <input type="text" placeholder={"email"} {...register("email")} />
      <input type="text" placeholder={"password"} {...register("password")} />
      <button>Login</button>
      {errors && <span>{errors.detail}</span>}
    </form>
  );
};

export { LoginForm };
