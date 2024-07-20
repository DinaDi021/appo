import { joiResolver } from "@hookform/resolvers/joi";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAddMaster } from "../../../interfaces";
import { adminActions } from "../../../redux";
import { registerMasterSchema } from "../../../validators";
import css from "../../Admin/CreateMaster/CreateMaster.module.scss";
import styles from "./Form.module.scss";

const CreateMasterForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddMaster>({
    resolver: joiResolver(registerMasterSchema),
  });
  const dispatch = useAppDispatch();
  const { error, isSuccess } = useAppSelector((state) => state.admin);
  const registerMaster: SubmitHandler<IAddMaster> = async (data) => {
    const { email, phone_number } = data;
    const url = `https://appo-di-k.netlify.app/resetPassword/${email}`;

    const {
      meta: { requestStatus },
    } = await dispatch(
      adminActions.addMaster({ data: { email, phone_number, url } }),
    );

    if (requestStatus === "fulfilled") {
      dispatch(adminActions.setIsSuccess());
      setTimeout(() => {
        dispatch(adminActions.clearIsSuccess());
      }, 10000);
      reset();
    }
  };

  return (
    <div className={css.addMaster__form__section}>
      <form
        className={css.addMaster__form__body}
        onSubmit={handleSubmit(registerMaster)}
      >
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
        <button>Create Account</button>
      </form>
      {isSuccess && (
        <div className={styles.form__success}>
          Master created successfully. Email sent to user.
        </div>
      )}
      {error && (
        <div
          className={styles.form__error}
          style={{ justifyContent: "center" }}
        >
          {error?.message}
        </div>
      )}
    </div>
  );
};

export { CreateMasterForm };
