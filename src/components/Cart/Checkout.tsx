import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IPaymentType } from "../../interfaces/cartInterface";
import { cartsActions } from "../../redux";

const Checkout: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { checkoutCart } = useAppSelector((state) => state.carts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState<keyof IPaymentType>("full");
  const url = `http://localhost:3000/cart/payment/`;

  const handlePaymentTypeChange = (type: keyof IPaymentType) => {
    setPaymentType(type);
  };
  const handlePaymentSubmit = async () => {
    await dispatch(
      cartsActions.pay({
        userId: user.data.id,
        params: { result_url: url, payment: paymentType },
      }),
    );
    navigate("liqPay");
  };

  return (
    <div>
      {checkoutCart ? (
        <>
          <p>Total Items: {checkoutCart.totalCount}</p>
          {checkoutCart.totalSum && (
            <>
              <p>Total Amount: ${checkoutCart.totalSum.full}</p>
              <p>Total Amount: ${checkoutCart.totalSum.prepayment}</p>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <h2>Payment Options</h2>
      <div>
        <label>
          <input
            type="radio"
            value="full"
            checked={paymentType === "full"}
            onChange={() => handlePaymentTypeChange("full")}
          />
          Full Payment ₴{checkoutCart.totalSum.full}
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="prepayment"
            checked={paymentType === "prepayment"}
            onChange={() => handlePaymentTypeChange("prepayment")}
          />
          Prepayment ₴{checkoutCart.totalSum.prepayment}
        </label>
      </div>

      <button onClick={handlePaymentSubmit}>Go to Payment</button>
    </div>
  );
};

export { Checkout };
