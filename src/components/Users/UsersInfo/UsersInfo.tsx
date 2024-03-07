import { joiResolver } from "@hookform/resolvers/joi";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import empty_person from "../../../assets/img/empty_person.jpg";
import { useAppDispatch, useToggle } from "../../../hooks";
import { IUpdateProfileParams, IUser } from "../../../interfaces";
import { authActions, usersActions } from "../../../redux";
import { updateShema } from "../../../validators";
import { ChangePasswordForm } from "../../LoginPanel/Form/ChangePasswordForm";
import styles from "../../LoginPanel/Form/Form.module.scss";

interface IProps extends PropsWithChildren {
  user: IUser;
}

const UsersInfo: FC<IProps> = ({ user }) => {
  const { id, firstname, lastname, birthdate, email, phone_number, image_url } =
    user.data;
  const dispatch = useAppDispatch();
  const {
    value: isChangePasswordFormVisible,
    change: toggleChangePasswordForm,
  } = useToggle(false);
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

  // const deleteAvatar = async () => {
  //   await dispatch(imagesActions.deleteAvatar({ userId: id }));
  // };

  // const addPhoto = async () => {
  //   const formData = new FormData();
  //   const file: Blob = fileInput.current.files[0];
  //   formData.append("avatar", file);
  //   await imagesService.postAvatar(id, formData);
  //   setImage(URL.createObjectURL(file));
  // };

  const toggleChangePasswordVisibility = () => {
    toggleChangePasswordForm();
  };

  return (
    <div>
      <div>
        <div>
          <img
            className={styles.image__container}
            src={image_url ? image_url : empty_person}
            alt={`Avatar ${id}`}
          />
        </div>
        {/*<div>*/}
        {/*  <button onClick={deleteAvatar}>delete avatar</button>*/}
        {/*</div>*/}
      </div>
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
      {isChangePasswordFormVisible ? (
        <>
          <ChangePasswordForm />
          <button onClick={toggleChangePasswordVisibility}>
            Hide Change Password Form
          </button>
        </>
      ) : (
        <button onClick={toggleChangePasswordVisibility}>
          Change password
        </button>
      )}
      <button onClick={logOut}>Log out</button>
      <button onClick={logOutAll}>Log out in All devices</button>
      <button onClick={deleteAccount}>Delete account</button>
    </div>
  );
};

export { UsersInfo };
