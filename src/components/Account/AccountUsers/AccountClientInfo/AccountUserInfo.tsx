import React, { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../../hooks";
import { IUser } from "../../../../interfaces";
import { authActions, usersActions } from "../../../../redux";

interface IProps extends PropsWithChildren {
  user: IUser;
}

const AccountClientInfo: FC<IProps> = ({ user }) => {
  const { id, firstname, lastname, birthdate, email, phone_number } = user.data;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.logout());

    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };
  const logOutAll = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.logoutAll());

    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  const deleteAccount = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(usersActions.deleteUserById({ id }));

    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div>
      <h4>{email}</h4>
      <h4>{birthdate}</h4>
      <h4>{firstname}</h4>
      <h4>{lastname}</h4>
      <h4>{phone_number}</h4>
      <button onClick={logOut}>Log out</button>
      <button onClick={logOutAll}>Log out in All devices</button>
      <button onClick={deleteAccount}>Delete account</button>
    </div>
  );
};

export { AccountClientInfo };
