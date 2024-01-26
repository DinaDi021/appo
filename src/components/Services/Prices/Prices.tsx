import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { servicesActions } from "../../../redux";
import styles from "../Services.module.scss";
import { PriceDetails } from "./PriceDetails/PriceDetails";

const Prices: FC = () => {
  const dispatch = useAppDispatch();
  const { allPrices } = useAppSelector((state) => state.services);
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;

  console.log(userId, allPrices);

  useEffect(() => {
    dispatch(servicesActions.getAllPrices({ userId }));
  }, [dispatch, userId]);

  if (!allPrices) {
    return <div>you don`t have price</div>;
  }

  return (
    <div className={styles.price__container}>
      {allPrices.map((priceItem) => (
        <PriceDetails key={priceItem.price_id} priceItem={priceItem} />
      ))}
    </div>
  );
};

export { Prices };
