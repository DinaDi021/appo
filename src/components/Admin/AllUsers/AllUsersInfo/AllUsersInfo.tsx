import React, { FC, PropsWithChildren } from "react";

import empty_person from "../../../../assets/img/empty_person.png";
import { IUser } from "../../../../interfaces";
import styles from "../../../Users/UsersInfo/UserInfo.module.scss";

interface IProps extends PropsWithChildren {
  user: IUser;
}

const AllUsersInfo: FC<IProps> = ({ user }) => {
  const {
    id,
    firstname,
    lastname,
    birthdate,
    email,
    phone_number,
    image_url,
    role,
  } = user;

  return (
    <div className={styles.user__card__container}>
      <div>
        <img
          className={styles.user__card__img}
          src={image_url || empty_person}
          alt={`Avatar ${id}`}
        />
      </div>
      <div className={styles.user__card__bc}>
        <div className={styles.user__card__details}>
          <p>
            {firstname} {lastname}
          </p>
          <p>{birthdate}</p>
          <p>{email}</p>
          <p>{phone_number}</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
};

export { AllUsersInfo };
