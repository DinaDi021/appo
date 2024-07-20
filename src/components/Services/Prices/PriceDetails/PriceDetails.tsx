import { joiResolver } from "@hookform/resolvers/joi";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IPrice, IUpdatePriceParams } from "../../../../interfaces";
import { servicesActions } from "../../../../redux";
import { priceShema } from "../../../../validators";
import styles from "../../../Auth/Form/Form.module.scss";
import { Modal } from "../../../Modal/Modal";
import css from "../../Services.module.scss";

interface IProps extends PropsWithChildren {
  onePrice: IPrice;
}

const PriceDetails: FC<IProps> = ({ onePrice }) => {
  const { title, price, price_id } = onePrice;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { updatedPrice } = useAppSelector((state) => state.services);
  const userId = user.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdatePriceParams>({
    resolver: joiResolver(priceShema),
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (onePrice) {
      setValue("price", price);
    }
    if (updatedPrice && updatedPrice.price_id === price_id) {
      setValue("price", updatedPrice.price);
    }
  }, [price_id, updatedPrice, setValue]);

  const handleUpdatePrice: SubmitHandler<IUpdatePriceParams> = async (
    params,
  ) => {
    await dispatch(
      servicesActions.updatePriceById({
        userId: userId,
        priceId: price_id,
        params,
      }),
    );
    dispatch(servicesActions.setUpdatedParams({ ...params, price_id }));
  };

  const handleDeletePrice = async () => {
    setShowModal(false);
    await dispatch(
      servicesActions.deletePriceById({
        userId,
        priceId: price_id,
      }),
    );
  };

  return (
    <div className={css.price__card}>
      <div className={css.price__title}>
        <h5>{title}</h5>
      </div>
      <form
        className={styles.form__schedule}
        onSubmit={handleSubmit(handleUpdatePrice)}
      >
        <div
          className={styles.form__container}
          style={{ marginBottom: "10px" }}
        >
          <label className={styles.form__label}>
            <MonetizationOnOutlinedIcon className={css.price__svg} />
            <input
              className={css.price__form__input}
              type="number"
              placeholder={"price"}
              {...register("price")}
            />
          </label>
          {errors.price && (
            <div className={styles.form__error}>
              {errors?.price && <span>invalid price</span>}
            </div>
          )}
        </div>
        <div className={css.price__form__actionBtn}>
          <button type="submit">
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </form>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeletePrice}
      />
    </div>
  );
};

export { PriceDetails };
