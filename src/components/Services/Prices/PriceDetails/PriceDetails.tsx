import { joiResolver } from "@hookform/resolvers/joi";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IPrice, IUpdatePriceParams } from "../../../../interfaces";
import { servicesActions } from "../../../../redux";
import { priceShema } from "../../../../validators";
import styles from "../../../LoginPanel/Form/Form.module.scss";
import css from "../../Services.module.scss";

interface IProps extends PropsWithChildren {
  onePrice: IPrice;
}

const PriceDetails: FC<IProps> = ({ onePrice }) => {
  const { title, price, price_id } = onePrice;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { updatedPrice } = useAppSelector((state) => state.services);
  const userId = user.data.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdatePriceParams>({
    resolver: joiResolver(priceShema),
  });

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
    await dispatch(
      servicesActions.deletePriceById({
        userId,
        priceId: price_id,
      }),
    );
    await dispatch(servicesActions.getAllPrices({ userId }));
  };

  return (
    <div className={css.price__card}>
      <div className={css.price__title}>
        <h4>{title}</h4>
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
              type="number"
              placeholder={"price"}
              {...register("price")}
              style={{ width: "20%" }}
            />
          </label>
          {errors.price && (
            <div className={styles.form__error}>
              {errors?.price && <span>invalid price</span>}
            </div>
          )}
        </div>
        <button>Update Schedule</button>
      </form>
      <button onClick={handleDeletePrice}>Delete Price</button>
    </div>
  );
};

export { PriceDetails };
