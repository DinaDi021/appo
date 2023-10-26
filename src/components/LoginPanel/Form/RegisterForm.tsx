import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAuth } from "../../../interfaces";
import { authActions } from "../../../redux";

const RegisterForm: FC = () => {
  const { register, reset, handleSubmit } = useForm<IAuth>();
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const registerUser: SubmitHandler<IAuth> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.register({ user }));

    if (requestStatus === "fulfilled") {
      reset();
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <input
        type="text"
        placeholder={"first Name"}
        {...register("firstname")}
      />
      <input type="text" placeholder={"last Name"} {...register("lastname")} />
      <input
        type="text"
        placeholder={"+3801112233"}
        {...register("phone_number")}
      />
      <input type="text" placeholder={"email"} {...register("email")} />
      <input type="text" placeholder={"password"} {...register("password")} />
      <button>Register</button>
      {errors?.username && <span>username already exists</span>}
    </form>
  );
};

export { RegisterForm };
