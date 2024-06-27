import { FC } from "react";

import { useAppSelector } from "../../hooks";
import styles from "./Cart.module.scss";

const PayCart: FC = () => {
  const { payCart, error } = useAppSelector((state) => state.carts);

  if (!payCart) {
    return (
      <div className={styles.checkout__error}>
        {error?.message} <p>Please delete the inactive appointment first</p>
      </div>
    );
  }

  return (
    <div>
      {payCart.html_button && (
        <div dangerouslySetInnerHTML={{ __html: payCart.html_button }} />
      )}
    </div>
  );
};

export { PayCart };
