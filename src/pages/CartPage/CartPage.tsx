import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import { Cart } from "../../components";
import styles from "../../components/Cart/Cart.module.scss";

const CartPage: FC = () => {
  return (
    <div className={styles.cart__page}>
      <h2 className={styles.cart__page__title}>Your Cart</h2>
      <div className={styles.cart__container}>
        <Cart />
        <Outlet />
      </div>
    </div>
  );
};

export { CartPage };
