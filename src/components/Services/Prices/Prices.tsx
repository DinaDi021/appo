import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { servicesActions } from "../../../redux";
import styles from "../Services.module.scss";
import { PriceDetails } from "./PriceDetails/PriceDetails";
import { PriceForm } from "./PriceForm/PriceForm";

const Prices: FC = () => {
  const dispatch = useAppDispatch();
  const { allPrices } = useAppSelector((state) => state.services);
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;

  useEffect(() => {
    dispatch(servicesActions.getAllPrices({ userId }));
  }, [dispatch, userId]);

  if (!allPrices) {
    return (
      <div>
        <h4>you don`t have price</h4>
        <button>Create new price item</button>
      </div>
    );
  }

  return (
    <div className={styles.price__container}>
      <PriceForm />
      <div>
        {allPrices.map((onePrice) => (
          <PriceDetails key={onePrice.price_id} onePrice={onePrice} />
        ))}
      </div>
    </div>
  );
};

export { Prices };
