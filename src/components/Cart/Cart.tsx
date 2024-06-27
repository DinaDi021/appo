import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { cartsActions } from "../../redux";
import { IsLoading } from "../IsLoading";
import css from "../LoginPanel/Form/Form.module.scss";
import { Modal } from "../Modal/Modal";
import styles from "./Cart.module.scss";

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cart, error } = useAppSelector((state) => state.carts);
  const { isLoading } = useAppSelector((state) => state.progress);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(cartsActions.getAllItem({ userId: user.id }));
    }
  }, [dispatch, user, showMessage]);

  if (!user) {
    return <p>User not logged in</p>;
  }

  const isCartEmpty = cart === null || cart === undefined;

  const deleteAppointment = async () => {
    if (selectedAppointmentId !== null) {
      setShowModal(false);
      const itemToDelete = cart.items.find(
        (item) => item.id === selectedAppointmentId,
      );
      await dispatch(
        cartsActions.deleteItem({
          userId: user.id,
          cartId: selectedAppointmentId,
        }),
      );
      dispatch(cartsActions.getAllItem({ userId: user.id }));
      if (itemToDelete && itemToDelete.message) {
        setShowMessage(false);
      }
      setSelectedAppointmentId(null);
    }
  };

  const checkoutCart = async () => {
    const validItems = cart.items.filter((item) => item.message);
    if (validItems.length > 0) {
      setShowMessage(true);
      return;
    }
    if (!error && cart.totalCount > 0) {
      await dispatch(cartsActions.checkoutCart({ userId: user.id }));
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
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedAppointmentId(item.id);
                      }}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </div>
                  <div className={styles.cart__appointment__bc}>
                    <div className={styles.cart__appointment__details}>
                      <div className={styles.cart__appointment__data}>
                        <p>{item.title}</p>
                        <p>
                          Your master: {item.master_firstname}{" "}
                          {item.master_lastname}
                        </p>
                        <p>{item.date_time}</p>
                        <p>${item.price}</p>
                      </div>

                      {item.message && (
                        <div className={styles.cart__appointment__message}>
                          <p>{item.message}</p>
                        </div>
                      )}
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
            {showMessage && (
              <div
                className={css.form__error}
                style={{ justifyContent: "center" }}
              >
                You have to delete unavaliable appointment
              </div>
            )}
          </>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteAppointment}
      />
    </>
  );
};

export { Cart };
