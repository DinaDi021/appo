import { joiResolver } from "@hookform/resolvers/joi";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector, useToggle } from "../../../hooks";
import { IForgotPassword } from "../../../interfaces";
import { authActions } from "../../../redux";
import { forgotPasswordSchema } from "../../../validators";
import styles from "./Form.module.scss";

const ForgotPasswordForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    resolver: joiResolver(forgotPasswordSchema),
  });
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const { value: isFormVisible, change: toggleFormVisibility } =
    useToggle(true);

  const forgotPassword: SubmitHandler<IForgotPassword> = async (data) => {
    const { email } = data;
    const url = `http://localhost:3000/resetPassword/${email}`;

    const {
      meta: { requestStatus },
    } = await dispatch(authActions.forgotPassword({ email, url }));

    if (requestStatus === "fulfilled") {
      reset();
      toggleFormVisibility();
    }
  };

  return (
    <>
      {isFormVisible ? (
        <form
          className={styles.form__login}
          onSubmit={handleSubmit(forgotPassword)}
        >
          <div className={styles.form__container}>
            <label className={styles.form__label}>
              <AlternateEmailOutlinedIcon />
              <input
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
          {error && <span className={styles.errMessage}>{error.message}</span>}
          <button>Reset the password</button>
        </form>
      ) : (
        <div>
          <h3 className={styles.emailMessage}>
            Password reset successful! Please check your email.
          </h3>
        </div>
      )}
    </>
  );
};

export { ForgotPasswordForm };
