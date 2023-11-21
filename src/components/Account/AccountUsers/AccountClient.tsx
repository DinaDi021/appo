import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { usersActions } from "../../../redux";
import { IsLoading } from "../../IsLoading";
import { AccountClientInfo } from "./AccountClientInfo/AccountUserInfo";

const AccountClient: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.progress);

  useEffect(() => {
    if (user?.data) {
      dispatch(usersActions.getUserById({ id: user.data.id }));
    }
  }, [dispatch, user]);

  if (!user) {
    return <p>User not logged in</p>;
  }

  return (
    <div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div>
          <h3>Contact Information </h3>
          <AccountClientInfo key={user.data.id} user={user} />
          <h3>Post history</h3>
        </div>
      )}
    </div>
  );
};

export { AccountClient };
