import React, { FC } from "react";

import { UsersInfo } from "../../components";
import { useAppSelector } from "../../hooks";
import styles from "../pages.module.scss";

const UserInfoPage: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className={styles.page__userInfo}>
      <UsersInfo key={user.data.id} user={user} />
    </div>
  );
};

export { UserInfoPage };
