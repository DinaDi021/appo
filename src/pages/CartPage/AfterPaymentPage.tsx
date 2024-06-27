import React from "react";
import { Link } from "react-router-dom";

const AfterPaymentPage = () => {
  return (
    <div>
      <Link to={"/me/appointments"}>
        <button>Check appointment</button>
      </Link>
      <Link to={"/me"}>
        <button>Go to personal account</button>
      </Link>
    </div>
  );
};

export { AfterPaymentPage };
