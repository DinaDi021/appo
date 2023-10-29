import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAuth } from "../../../interfaces";
import { authActions } from "../../../redux";
import styles from "./Form/Form.module.scss";

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
    <>
      <form className={styles.form__login} onSubmit={handleSubmit(login)}>
        <div className={styles.input}>
          <AlternateEmailOutlinedIcon />
          <input
            type="email"
            placeholder={"Email"}
            required={true}
            {...register("email")}
          />
        </div>
        <div className={styles.input}>
          <LockOutlinedIcon />
          <input
            type="password"
            placeholder={"Password"}
            required={true}
            {...register("password")}
          />
        </div>
        <button>Log in</button>
        {errors && <span>{errors.detail}</span>}
      </form>
    </>
  );
};

export { LoginForm };
