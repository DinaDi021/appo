import React, { FC, PropsWithChildren } from "react";

import { IUser } from "../../../../interfaces";

interface IProps extends PropsWithChildren {
  user: IUser;
}

const AccountClientInfo: FC<IProps> = ({ user }) => {
  const { firstname, lastname, birthdate, email, phone_number } = user.data;

  return (
    <div>
      <h4>{email}</h4>
      <h4>{birthdate}</h4>
      <h4>{firstname}</h4>
      <h4>{lastname}</h4>
      <h4>{phone_number}</h4>
    </div>
  );
};

export { AccountClientInfo };
