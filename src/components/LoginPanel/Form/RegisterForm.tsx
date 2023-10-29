import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAuth } from "../../../interfaces";
import { authActions } from "../../../redux";
import styles from "./Form/Form.module.scss";

const RegisterForm: FC = () => {
  const { register, reset, handleSubmit } = useForm<IAuth>();
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(true);
  const registerUser: SubmitHandler<IAuth> = async (user) => {
    const { password, confirm_Password } = user;

    if (password !== confirm_Password) {
      setIsFormValid(false);
      return;
    }

    const {
      meta: { requestStatus },
    } = await dispatch(authActions.register({ user }));

    if (requestStatus === "fulfilled") {
      reset();
      navigate("/login");
    }
  };

  //Add disabled button, when input empty

  return (
    <>
      <form
        className={styles.form__register}
        onSubmit={handleSubmit(registerUser)}
      >
        <div className={styles.input}>
          <PersonRoundedIcon />
          <input
            type="text"
            placeholder={"First Name"}
            required={true}
            {...register("firstname")}
          />
        </div>
        <div className={styles.input}>
          <PersonRoundedIcon />
          <input
            type="text"
            placeholder={"Last Name"}
            required={true}
            {...register("lastname")}
          />
        </div>
        <div className={styles.input}>
          <LockOutlinedIcon />
          <input
            type="text"
            placeholder={"+380xxxxxxxx"}
            required={true}
            {...register("phone_number")}
          />
        </div>
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
            onChange={() => setIsFormValid(true)}
          />
        </div>
        <div className={styles.input}>
          <LockOutlinedIcon />
          <input
            type="password"
            placeholder={"Confirm password"}
            required={true}
            {...register("confirm_Password")}
            onChange={() => setIsFormValid(true)}
          />
        </div>

        {!isFormValid && (
          <span className={styles.error}>Password mismatch</span>
        )}
        <button disabled={!isFormValid}>Create Account</button>

        {errors?.email && <span>email is invalid</span>}
      </form>
    </>
  );
};

export { RegisterForm };
