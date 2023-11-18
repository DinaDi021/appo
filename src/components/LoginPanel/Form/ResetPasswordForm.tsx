import { joiResolver } from "@hookform/resolvers/joi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../../../hooks";
import { IResetPassword } from "../../../interfaces";
import { authActions } from "../../../redux";
import { resetPasswordSchema } from "../../../validators";
import styles from "./Form.module.scss";

const ResetPasswordForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>({
    resolver: joiResolver(resetPasswordSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, token } = useParams();

  console.log(email, token);

  const resetPassword: SubmitHandler<IResetPassword> = async (data) => {
    const { password } = data;

    const {
      meta: { requestStatus },
    } = await dispatch(authActions.resetPassword({ email, password, token }));

    if (requestStatus === "fulfilled") {
      reset();
      navigate("/login");
    }
  };

  return (
    <>
      <form
        className={styles.form__login}
        onSubmit={handleSubmit(resetPassword)}
      >
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <LockOutlinedIcon />
            <input
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
        <button>confirm password change</button>
      </form>
    </>
  );
};

export { ResetPasswordForm };
