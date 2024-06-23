import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { cartsActions } from "../../redux";
import { IsLoading } from "../IsLoading";
import styles from "./Cart.module.scss";

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.carts);
  const { isLoading } = useAppSelector((state) => state.progress);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(cartsActions.getAllItem({ userId: user.data.id }));
    }
  }, [dispatch, user]);

  if (!user) {
    return <p>User not logged in</p>;
  }

  const isCartEmpty = cart === null || cart === undefined;

  const deleteAppointment = async (cartId: number) => {
    await dispatch(cartsActions.deleteItem({ userId: user.data.id, cartId }));
    dispatch(cartsActions.getAllItem({ userId: user.data.id }));
  };

  const checkoutCart = async () => {
    if (cart.totalSum > 0) {
      await dispatch(cartsActions.checkoutCart({ userId: user.data.id }));
      navigate("checkout");
    }
  };

  return (
    <>
      <div className={styles.cart__appointment}>
        {isLoading ? (
          <IsLoading />
        ) : isCartEmpty ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className={styles.cart__appointment__main}>
              {cart.items.map((item) => (
                <div key={item.id} className={styles.cart__appointment__info}>
                  <div className={styles.cart__appointment__button}>
                    <button onClick={() => deleteAppointment(item.id)}>
                      <DeleteForeverIcon />
                    </button>
                  </div>
                  <div className={styles.cart__appointment__bc}>
                    <div className={styles.cart__appointment__details}>
                      <p>{item.title}</p>
                      <p>
                        Your master: {item.master_firstname}{" "}
                        {item.master_lastname}
                      </p>
                      <p>{item.date_time}</p>
                      <p>${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cart__appointment__aside}>
              <h3>Total to pay: ${cart.totalSum}</h3>
              <h3>Total appointment: {cart.totalCount}</h3>
              <button onClick={checkoutCart}>
                Confirm and receive payment
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { Cart };
