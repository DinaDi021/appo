import DoneAllIcon from "@mui/icons-material/DoneAll";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IPaymentType } from "../../interfaces/cartInterface";
import { cartsActions } from "../../redux";
import styles from "./Cart.module.scss";

const Checkout: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { checkoutCart } = useAppSelector((state) => state.carts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState<keyof IPaymentType>("full");
  const url = `https://master--appo-di-k.netlify.app/cart/payment/`;

  const handlePaymentTypeChange = (type: keyof IPaymentType) => {
    setPaymentType(type);
  };

  const handlePaymentSubmit = async () => {
    await dispatch(
      cartsActions.pay({
        userId: user.id,
        params: { result_url: url, payment: paymentType },
      }),
    );
    navigate("liqPay");
  };

  return (
    <div className={styles.checkout}>
      <h3 className={styles.checkout__title}>Choose a payment type</h3>
      <div>
        <label className={styles.checkout__select}>
          <input
            className={styles.checkout__inputPay}
            type="radio"
            value="full"
            checked={paymentType === "full"}
            onChange={() => handlePaymentTypeChange("full")}
          />
          <span className={styles.checkout__iconWrapper}>
            <DoneAllIcon />
          </span>
          Full Payment {checkoutCart.totalSum.full}
        </label>
      </div>
      <div>
        <label className={styles.checkout__select}>
          <input
            className={styles.checkout__inputPay}
            type="radio"
            value="prepayment"
            checked={paymentType === "prepayment"}
            onChange={() => handlePaymentTypeChange("prepayment")}
          />
          <span className={styles.checkout__iconWrapper}>
            <DoneAllIcon />
          </span>
          Prepayment {checkoutCart.totalSum.prepayment}
        </label>
      </div>
      <button className={styles.checkout__button} onClick={handlePaymentSubmit}>
        Make an order
      </button>
    </div>
  );
};

export { Checkout };
