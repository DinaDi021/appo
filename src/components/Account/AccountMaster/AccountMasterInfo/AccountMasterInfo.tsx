import { joiResolver } from "@hookform/resolvers/joi";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../../hooks";
import { IUpdateProfileParams, IUser } from "../../../../interfaces";
import { authActions, usersActions } from "../../../../redux";
import { updateShema } from "../../../../validators";
import styles from "../../../LoginPanel/Form/Form.module.scss";

interface IProps extends PropsWithChildren {
  user: IUser;
}

const AccountMasterInfo: FC<IProps> = ({ user }) => {
  const { id, firstname, lastname, birthdate, email, phone_number } = user.data;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateProfileParams>({
    resolver: joiResolver(updateShema),
  });

  useEffect(() => {
    if (user) {
      setValue("firstname", firstname);
      setValue("lastname", lastname);
      setValue("birthdate", birthdate);
      setValue("email", email);
      setValue("phone_number", phone_number);
    }
  }, [setValue]);

  const update: SubmitHandler<IUpdateProfileParams> = (params) => {
    dispatch(usersActions.updateUserById({ id: user.data.id, params }));
  };

  const logOut = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.logout());

    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };
  const logOutAll = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.logoutAll());

    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  const deleteAccount = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(usersActions.deleteUserById({ id }));

    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div>
      <div>
        <form className={styles.form__register} onSubmit={handleSubmit(update)}>
          <div className={styles.form__container}>
            <label className={styles.form__label}>
              <PersonRoundedIcon />
              <input
                type="text"
                placeholder={"First Name"}
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
                type="text"
                placeholder={"Last Name"}
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
              <PersonRoundedIcon />
              <input
                type="text"
                placeholder={"XXXX-XX-XX"}
                {...register("birthdate")}
              />
            </label>
            {errors.birthdate && (
              <div className={styles.form__error}>
                {errors?.birthdate && <span>invalid birthdate</span>}
              </div>
            )}
          </div>
          <div className={styles.form__container}>
            <label className={styles.form__label}>
              <LockOutlinedIcon />
              <input
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
          <button>Update Account</button>
        </form>
      </div>
      <button onClick={logOut}>Log out</button>
      <button onClick={logOutAll}>Log out in All devices</button>
      <button onClick={deleteAccount}>Delete account</button>
    </div>
  );
};

export { AccountMasterInfo };
