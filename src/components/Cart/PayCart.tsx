import { FC } from "react";

import { useAppSelector } from "../../hooks";

const PayCart: FC = () => {
  const { payCart } = useAppSelector((state) => state.carts);

  return (
    <div>
      {payCart.html_button && (
        <div dangerouslySetInnerHTML={{ __html: payCart.html_button }} />
      )}
    </div>
  );
};

export { PayCart };
