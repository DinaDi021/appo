import { joiResolver } from "@hookform/resolvers/joi";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAuth } from "../../../interfaces";
import { authActions } from "../../../redux";
import { registerSchema } from "../../../validators";
import styles from "./Form.module.scss";

const RegisterForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>({
    resolver: joiResolver(registerSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);
  const registerUser: SubmitHandler<IAuth> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.register({ user }));

    if (requestStatus === "fulfilled") {
      const loginResponse = await dispatch(authActions.login({ user }));
      if (loginResponse.meta.requestStatus === "fulfilled") {
        reset();
        navigate("/me/info");
      }
    }
  };

  return (
    <>
      <form
        className={styles.form__register}
        onSubmit={handleSubmit(registerUser)}
      >
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <PersonRoundedIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"First Name"}
              required={true}
              {...register("firstname")}
            />
          </label>
          {errors.firstname && (
            <div className={styles.form__error}>
              {errors?.firstname && <span>invalid first Name</span>}
            </div>
          )}
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <PersonRoundedIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"Last Name"}
              required={true}
              {...register("lastname")}
            />
          </label>
          {errors.lastname && (
            <div className={styles.form__error}>
              {errors?.lastname && <span>invalid last Name</span>}
            </div>
          )}
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <PhoneIphoneIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"+380xxxxxxxx"}
              required={true}
              {...register("phone_number")}
            />
          </label>
          {errors.phone_number && (
            <div className={styles.form__error}>
              {errors?.phone_number && <span>invalid phone number</span>}
            </div>
          )}
        </div>
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
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <LockOutlinedIcon />
            <input
              className={styles.form__input}
              type="password"
              placeholder={"Confirm password"}
              required={true}
              {...register("confirm_Password")}
            />
          </label>
          {errors.confirm_Password && (
            <div className={styles.form__error}>
              {errors?.confirm_Password && <span>passwords do not match</span>}
            </div>
          )}
        </div>
        {error && <span className={styles.errMessage}>{error.message}</span>}
        <button>Create Account</button>
      </form>
    </>
  );
};

export { RegisterForm };
