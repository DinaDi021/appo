import { joiResolver } from "@hookform/resolvers/joi";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const resetPassword: SubmitHandler<IResetPassword> = async (data) => {
    const { email, token, password } = data;

    const {
      meta: { requestStatus },
    } = await dispatch(authActions.resetPassword({ email, token, password }));

    if (requestStatus === "fulfilled") {
      reset();
      navigate("/me");
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
            <AlternateEmailOutlinedIcon />
            <input
              type="email"
              placeholder={"Email"}
              required={true}
              {...register("email")}
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
