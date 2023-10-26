import React, { FC } from "react";
import { Link } from "react-router-dom";

const LoginPanel: FC = () => {
  return (
    <div>
      <Link to={`/login`}>
        <div>Login</div>
      </Link>
      <Link to={`/register`}>
        <div>Registration</div>
      </Link>
    </div>
  );
};

export { LoginPanel };
