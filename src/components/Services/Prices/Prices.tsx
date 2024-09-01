import React, { FC } from "react";

import { useAppSelector } from "../../../hooks";
import { IPrice } from "../../../interfaces";
import { IsLoading } from "../../IsLoading";
import styles from "../Services.module.scss";
import { PriceDetails } from "./PriceDetails/PriceDetails";
import { PriceForm } from "./PriceForm/PriceForm";

const Prices: FC = () => {
  const { allPrices } = useAppSelector((state) => state.services);
  const { isLoading } = useAppSelector((state) => state.progress);

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
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className={styles.price__container}>
          <h4 className={styles.price__container__title}>Services and price</h4>
          <h5 className={styles.price__container__description}>
            You can create price for your services
          </h5>
          <PriceForm />
          <div className={styles.priceTable}>
            {uniqueCategories.map((category, index) => (
              <div key={index} className={styles.priceTable__column}>
                <div className={styles.priceTable__column__header}>
                  <h4>{category}</h4>
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
      )}
    </>
  );
};

export { Prices };
