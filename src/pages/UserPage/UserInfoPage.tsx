import React, { FC } from "react";

import { IsLoading, UsersInfo } from "../../components";
import { useAppSelector } from "../../hooks";
import styles from "../pages.module.scss";

const UserInfoPage: FC = () => {
  const { isLoading } = useAppSelector((state) => state.progress);
  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className={styles.page__userInfo}>
          <UsersInfo />
        </div>
      )}
    </>
  );
};

export { UserInfoPage };
