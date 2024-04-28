import React, { FC } from "react";

import { useAppSelector } from "../../../hooks";
import { IPrice } from "../../../interfaces";
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

  const uniqueCategories = Array.from(
    new Set(allPrices.map((price) => price.category)),
  );

  const pricesByCategory: { [key: string]: IPrice[] } = {};
  allPrices.forEach((price) => {
    if (!pricesByCategory[price.category]) {
      pricesByCategory[price.category] = [];
    }
    pricesByCategory[price.category].push(price);
  });

  return (
    <div className={styles.price__container}>
      <h3 style={{ marginBottom: "10px" }}>Services and price</h3>
      <h4>You can create price for your services</h4>
      <PriceForm />
      <div
        className={styles.priceTable}
        style={{
          gridTemplateColumns: `repeat(${uniqueCategories.length}, 1fr)`,
        }}
      >
        {uniqueCategories.map((category, index) => (
          <div key={index} className={styles.priceTable__column}>
            <div className={styles.priceTable__column__header}>
              <h3>{category}</h3>
            </div>
            {pricesByCategory[category].map((price, index) => (
              <div key={index} className={styles.priceTable__column__item}>
                <PriceDetails onePrice={price} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Prices };
