import { Outlet } from "react-router-dom";

import { Checkout } from "../../components/";

const CheckoutPage = () => {
  return (
    <>
      <Checkout />
      <Outlet />
    </>
  );
};

export { CheckoutPage };
