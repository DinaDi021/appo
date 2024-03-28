import React, { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  appointmentsActions,
  schedulesActions,
  usersActions,
} from "../../../redux";
import { IsLoading } from "../../IsLoading";
import { UsersInfo } from "../../Users";
import styles from "../Account.module.scss";

const AccountMaster: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.progress);
  const navigate = useNavigate();

  const getSchedules = () => {
    navigate("/me/schedules");
  };

  const addNewSchedules = () => {
    navigate("/me/addSchedules");
  };
  const getAppointments = () => {
    navigate("/me/appointments");
  };

  const getMyPrices = () => {
    navigate("/me/prices");
  };

  const getMyGallary = () => {
    navigate("/me/gallery");
  };

  useEffect(() => {
    if (user?.data) {
      dispatch(usersActions.getUserById({ id: user.data.id }));
      dispatch(schedulesActions.getAllUsersSchedules({ userId: user.data.id }));
      dispatch(
        appointmentsActions.getUserAllAppointments({ userId: user.data.id }),
      );
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
        <div className={styles.account}>
          <h3>Contact Information </h3>
          <UsersInfo key={user.data.id} user={user} />
          <button onClick={getMyGallary}>My gallery</button>
          <button onClick={getMyPrices}>My prices</button>
          <button onClick={getSchedules}>My schedules</button>
          <button onClick={addNewSchedules}>Add new time</button>
          <button onClick={getAppointments}>My appointments</button>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export { AccountMaster };
