import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { cartsActions } from "../../redux";
import { IsLoading } from "../IsLoading";

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.carts);
  const { isLoading } = useAppSelector((state) => state.progress);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.data) {
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
    await dispatch(cartsActions.checkoutCart({ userId: user.data.id }));
    navigate("checkout");
  };

  return (
    <div>
      <div>
        <h2>Your Cart</h2>
        {isLoading ? (
          <IsLoading />
        ) : isCartEmpty ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div key={item.id}>
                <p>Title: {item.title}</p>
                <p>Data and time: {item.date_time}</p>
                <p>Category: {item.category}</p>
                <p>Price: ${item.price}</p>
                <button onClick={() => deleteAppointment(item.id)}>
                  Delete appointment
                </button>
                <hr />
              </div>
            ))}
            <h3>Total Sum: ${cart.totalSum}</h3>
            <h3>Total Count: {cart.totalCount}</h3>
            <button onClick={checkoutCart}>Confirm and receive payment</button>
          </>
        )}
      </div>
    </div>
  );
};

export { Cart };
