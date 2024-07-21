import { joiResolver } from "@hookform/resolvers/joi";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleIcon from "@mui/icons-material/Title";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IAddService } from "../../../interfaces";
import { adminActions } from "../../../redux";
import { addServices } from "../../../validators";
import styles from "../../Auth/Form/Form.module.scss";
import css from "../CreateMaster/CreateMaster.module.scss";

const CreateServicesForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddService>({
    resolver: joiResolver(addServices),
  });
  const dispatch = useAppDispatch();
  const { isSuccess, error } = useAppSelector((state) => state.admin);

  const createServices: SubmitHandler<IAddService> = async (data) => {
    const { title, description, category } = data;
    const {
      meta: { requestStatus },
    } = await dispatch(
      adminActions.addService({ data: { title, description, category } }),
    );

    if (requestStatus === "fulfilled") {
      dispatch(adminActions.setIsSuccess());
      setTimeout(() => {
        dispatch(adminActions.clearIsSuccess);
      }, 10000);
      reset();
    }
  };

  return (
    <div className={css.addMaster__form__section}>
      <form
        className={css.addMaster__form__body}
        onSubmit={handleSubmit(createServices)}
      >
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <TitleIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"title"}
              required={true}
              {...register("title")}
            />
          </label>
          {errors.title && (
            <div className={styles.form__error}>
              {errors?.title && <span>invalid title</span>}
            </div>
          )}
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <DescriptionIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"description"}
              {...register("description")}
            />
          </label>
          {errors.description && (
            <div className={styles.form__error}>
              {errors?.description && <span>invalid description</span>}
            </div>
          )}
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <CategoryIcon />
            <input
              className={styles.form__input}
              type="text"
              placeholder={"category"}
              {...register("category")}
            />
          </label>
          {errors.category && (
            <div className={styles.form__error}>
              {errors?.category && <span>invalid category</span>}
            </div>
          )}
        </div>
        <button>Create Service</button>
      </form>
      {isSuccess && (
        <div className={styles.form__success}>Service created successfully</div>
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

export { CreateServicesForm };
