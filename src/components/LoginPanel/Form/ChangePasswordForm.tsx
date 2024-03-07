import { joiResolver } from "@hookform/resolvers/joi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useToggle } from "../../../hooks";
import { IChangePassword } from "../../../interfaces";
import { authActions } from "../../../redux";
import { changePasswordSchema } from "../../../validators";
import styles from "./Form.module.scss";

const ChangePasswordForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>({
    resolver: joiResolver(changePasswordSchema),
  });

  const dispatch = useAppDispatch();
  const { token } = useParams();
  const { value: changePasswordSuccess, change: toggleChangePasswordSuccess } =
    useToggle(false);
  const navigate = useNavigate();

  const changePassword: SubmitHandler<IChangePassword> = async (data) => {
    const { old_password, new_password } = data;

    const {
      meta: { requestStatus },
    } = await dispatch(
      authActions.changePassword({ old_password, new_password, token }),
    );

    if (requestStatus === "fulfilled") {
      reset();
      toggleChangePasswordSuccess();
      navigate("/login");
    }
  };

  return (
    <>
      <form
        className={styles.form__login}
        onSubmit={handleSubmit(changePassword)}
      >
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <LockOutlinedIcon />
            <input
              type="password"
              placeholder={"Old Password"}
              required={true}
              {...register("old_password")}
            />
          </label>
          {errors.old_password && (
            <div className={styles.form__error}>
              {errors?.old_password && <span>invalid password</span>}
            </div>
          )}
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <LockOutlinedIcon />
            <input
              type="password"
              placeholder={"New Password"}
              required={true}
              {...register("new_password")}
            />
          </label>
          {errors.new_password && (
            <div className={styles.form__error}>
              {errors?.new_password && <span>passwords do not match</span>}
            </div>
          )}
        </div>
        <button>Confirm password change</button>
      </form>
      {changePasswordSuccess && (
        <p style={{ color: "green" }}>Password changed successfully!</p>
      )}
    </>
  );
};

export { ChangePasswordForm };
