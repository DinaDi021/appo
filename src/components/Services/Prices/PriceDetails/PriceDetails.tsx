import React, { FC, PropsWithChildren } from "react";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IPrice } from "../../../../interfaces";
import { servicesActions } from "../../../../redux";
import styles from "../../Services.module.scss";

interface IProps extends PropsWithChildren {
  priceItem: IPrice;
}

const PriceDetails: FC<IProps> = ({ priceItem }) => {
  const { title, price, price_id } = priceItem;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;

  const deletePrice = async () => {
    await dispatch(
      servicesActions.deletePriceById({
        userId,
        priceId: price_id,
      }),
    );
    dispatch(servicesActions.getAllPrices({ userId }));
  };
  return (
    <div className={styles.price__card}>
      <h4>
        {title} - {price} <button>ChangePrice</button>
        <button onClick={deletePrice}>Delete Price</button>
      </h4>
    </div>
  );
};

export { PriceDetails };
