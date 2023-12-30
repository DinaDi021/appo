import React from "react";
import { Link } from "react-router-dom";

const AfterPaymentPage = () => {
  return (
    <div>
      <h2>your payment has been sent for processing</h2>
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
