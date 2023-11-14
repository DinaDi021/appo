import React from "react";
import { Link } from "react-router-dom";

import { ResetPasswordForm } from "../../components/LoginPanel/Form";
import styles from "../pages.module.scss";

const ResetPasswordPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h3>Manage your records from your personal account</h3>
        </div>
        <div className={styles.card}>
          <h3>Recover Password</h3>
          <ResetPasswordForm />
          <h5>Already have an account?</h5>
          <h5>
            <Link to={`/login`}>Log in</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export { ResetPasswordPage };
