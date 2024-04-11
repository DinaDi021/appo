import React, { FC } from "react";

import { useAppSelector } from "../../../hooks";
import styles from "../Services.module.scss";
import { PriceDetails } from "./PriceDetails/PriceDetails";
import { PriceForm } from "./PriceForm/PriceForm";

const Prices: FC = () => {
  const { allPrices } = useAppSelector((state) => state.services);

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
