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
    if (user) {
      dispatch(usersActions.getUsersById({ id: user.data.id }));
    }
  }, [dispatch, user]);

  console.log(user.data.id);

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
