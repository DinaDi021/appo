import React, { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { appointmentsActions, usersActions } from "../../../redux";
import { IsLoading } from "../../IsLoading";
import { UsersInfo } from "../../Users/";
import styles from "../Account.module.scss";

const AccountClient: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.progress);
  const navigate = useNavigate();
  const location = useLocation();

  const getSchedules = () => {
    navigate("/me/schedules");
  };

  const getAppointments = () => {
    navigate("/me/appointments");
  };

  useEffect(() => {
    if (user?.data) {
      dispatch(usersActions.getUserById({ id: user.data.id }));
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
        <div>
          <h3>Contact Information </h3>
          <UsersInfo key={user.data.id} user={user} />
          <button
            onClick={getSchedules}
            className={
              location.pathname === "/me/schedules"
                ? styles.account__activeButton
                : ""
            }
          >
            My schedules
          </button>
          <button
            onClick={getAppointments}
            className={
              location.pathname === "/me/appointments"
                ? styles.account__activeButton
                : ""
            }
          >
            My appointments
          </button>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export { AccountClient };
