import React from "react";

import { AccountClient, AccountMaster } from "../../components";
import { useAppSelector } from "../../hooks";
import styles from "../pages.module.scss";

const PersonalAccount = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user ? user.data.role : null;

  const renderAccountComponent = () => {
    if (userRole === "master") {
      return <AccountMaster />;
    } else if (userRole === "client") {
      return <AccountClient />;
    } else {
      return <div>Unsupported user role</div>;
    }
  };

  return (
    <div className={styles.personalAccount}>
      <>{renderAccountComponent()}</>
    </div>
  );
};

export { PersonalAccount };
