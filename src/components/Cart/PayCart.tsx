import { FC } from "react";

import { useAppSelector } from "../../hooks";

const PayCart: FC = () => {
  const { cart, payCart } = useAppSelector((state) => state.carts);

  const isCartEmpty = cart === null || cart === undefined;
  const isButtonDisabled = isCartEmpty || cart.totalCount === 0;

  return (
    <>
      {!isButtonDisabled && (
        <div>
          {payCart.html_button && (
            <div dangerouslySetInnerHTML={{ __html: payCart.html_button }} />
          )}
        </div>
      )}
    </>
  );
};

export { PayCart };
