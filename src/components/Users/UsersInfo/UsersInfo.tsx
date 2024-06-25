import { joiResolver } from "@hookform/resolvers/joi";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Cropper, { Area } from "react-easy-crop";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import empty_person from "../../../assets/img/empty_person.png";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IUpdateProfileParams, IUser } from "../../../interfaces";
import { authActions, imagesActions, usersActions } from "../../../redux";
import { croppedImg, dataURLtoFile } from "../../../utils/CroppedImg";
import { updateShema } from "../../../validators";
import { ChangePasswordForm } from "../../LoginPanel/Form/ChangePasswordForm";
import styles from "../../LoginPanel/Form/Form.module.scss";
import { Modal } from "../../Modal/Modal";
import css from "./UserInfo.module.scss";

interface IProps extends PropsWithChildren {
  user: IUser;
}

const UsersInfo: FC<IProps> = ({ user }) => {
  const { id, firstname, lastname, birthdate, email, phone_number, image_url } =
    user;
  const { error } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();
  const [isChangePasswordFormVisible, setIsChangePasswordFormVisible] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateProfileParams>({
    resolver: joiResolver(updateShema),
  });
  const fileInput = useRef<HTMLInputElement>();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setValue("firstname", firstname);
      setValue("lastname", lastname);
      setValue("birthdate", birthdate);
      setValue("email", email);
      setValue("phone_number", phone_number);
    }
  }, [setValue, image_url]);

  const update: SubmitHandler<IUpdateProfileParams> = (params) => {
    dispatch(usersActions.updateUserById({ id: id, params }));
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
    setShowModal(false);
    const {
      meta: { requestStatus },
    } = await dispatch(usersActions.deleteUserById({ id }));

    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  const deleteImage = async () => {
    await dispatch(imagesActions.deleteAvatar({ userId: id }));
    dispatch(
      usersActions.updateUserById({
        id,
        params: { image_url: null },
      }),
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result as string));
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    [],
  );

  const handleCrop = async () => {
    if (imageSrc && croppedArea) {
      const croppedImage = await croppedImg(imageSrc, croppedArea);
      const file = dataURLtoFile(croppedImage, "croppedImage.jpg");
      const formData = new FormData();
      formData.append("image", file);
      const result = await dispatch(
        imagesActions.addAvatar({ userId: id, data: formData }),
      );
      if (result.payload && result.meta.requestStatus === "fulfilled") {
        const newImageUrl = result.payload as string;
        dispatch(
          usersActions.updateUserById({
            id,
            params: { image_url: newImageUrl },
          }),
        );
      }
    }
  };

  const toggleChangePasswordVisibility = () => {
    setIsChangePasswordFormVisible(!isChangePasswordFormVisible);
  };

  return (
    <div className={css.user__container}>
      <div className={css.user__container__info}>
        <h3>Contact Information </h3>
        <div>{error && <p>{error.message}</p>}</div>
        {imageSrc && (
          <div className={css.crop__modal}>
            <div className={css.crop__container}>
              <div>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <button className={css.crop__button} onClick={handleCrop}>
                Crop
              </button>
            </div>
          </div>
        )}
        <div className={css.user__img__container}>
          <img
            className={css.user__img__avatar}
            src={image_url || empty_person}
            alt={`Avatar ${id}`}
            onClick={() => fileInput.current.click()}
          />
          <input
            type={"file"}
            accept={"image/jpeg, image/png"}
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInput}
          />
          <button className={css.user__img__del} onClick={deleteImage}>
            Delete avatar
          </button>
        </div>
        <div>
          <form
            className={styles.form__register}
            onSubmit={handleSubmit(update)}
          >
            <div className={styles.form__container}>
              <label className={styles.form__label}>
                <PersonRoundedIcon />
                <input
                  className={styles.form__input}
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
                  className={styles.form__input}
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
                  className={styles.form__input}
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
                <AlternateEmailOutlinedIcon />
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
            <button>Update Account</button>
          </form>
        </div>
      </div>

      <div className={css.user__container__action}>
        <h3>Your actions</h3>
        <div
          className={
            isChangePasswordFormVisible
              ? `${css.changePasswordForm} ${css.visible}`
              : css.changePasswordForm
          }
        >
          <ChangePasswordForm />
        </div>
        <button onClick={toggleChangePasswordVisibility}>
          {isChangePasswordFormVisible
            ? "Hide Change Password Form"
            : "Change password"}
        </button>
        <button onClick={logOut}>Log out</button>
        <button onClick={logOutAll}>Log out in All devices</button>
        <button onClick={() => setShowModal(true)}>Delete account</button>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteAccount}
      />
    </div>
  );
};

export { UsersInfo };
