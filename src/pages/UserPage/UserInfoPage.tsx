import React, { FC } from "react";

import { UsersInfo } from "../../components";
import styles from "../pages.module.scss";

const UserInfoPage: FC = () => {
  return (
    <div className={styles.page__userInfo}>
      <UsersInfo />
    </div>
  );
};

export { UserInfoPage };
