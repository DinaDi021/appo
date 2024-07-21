import { joiResolver } from "@hookform/resolvers/joi";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAuth } from "../../../interfaces";
import { authActions } from "../../../redux";
import { loginShema } from "../../../validators";
import styles from "./Form.module.scss";

const LoginForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>({
    resolver: joiResolver(loginShema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { changePasswordStatus, error } = useAppSelector((state) => state.auth);
  const login: SubmitHandler<IAuth> = async (user) => {
    dispatch(authActions.setSuccessfulStatus(false));
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login({ user }));

    if (requestStatus === "fulfilled") {
      reset();
      navigate("/me/info");
    }
  };

  return (
    <>
      <form className={styles.form__login} onSubmit={handleSubmit(login)}>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <EmailOutlinedIcon />
            <input
              className={styles.form__input}
              type="email"
              placeholder={"Email"}
              required={true}
              {...register("email")}
            />
          </label>
          {errors.email && (
            <div className={styles.form__error}>
              {errors?.email && <span>invalid email</span>}
            </div>
          )}
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <LockOutlinedIcon />
            <input
              className={styles.form__input}
              type="password"
              placeholder={"Password"}
              required={true}
              {...register("password")}
            />
          </label>
          {errors.password && (
            <div className={styles.form__error}>
              {errors?.password && <span>invalid password</span>}
            </div>
          )}
        </div>
        {error && <span className={styles.errMessage}>{error.message}</span>}
        {changePasswordStatus && (
          <div className={styles.form__success}>
            Password changed successfully!
          </div>
        )}
        <button>Log in</button>
      </form>
    </>
  );
};

export { LoginForm };
