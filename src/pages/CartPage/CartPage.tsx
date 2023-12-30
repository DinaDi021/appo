import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import { Cart } from "../../components/Cart/Cart";

const CartPage: FC = () => {
  return (
    <div>
      <Cart />
      <Outlet />
    </div>
  );
};

export { CartPage };
