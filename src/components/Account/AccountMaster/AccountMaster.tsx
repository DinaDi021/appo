import React, { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  appointmentsActions,
  imagesActions,
  servicesActions,
  usersActions,
} from "../../../redux";
import { IsLoading } from "../../IsLoading";
import styles from "../Account.module.scss";

const AccountMaster: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.progress);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.data) {
      dispatch(usersActions.getUserById({ id: user.data.id }));
      dispatch(
        appointmentsActions.getUserAllAppointments({ userId: user.data.id }),
      );
      dispatch(servicesActions.getAllServices());
      dispatch(servicesActions.getAllPrices({ userId: user.data.id }));
      dispatch(imagesActions.getGallery({ userId: user.data.id }));
    }
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (user && location.pathname === "/me") {
      navigate("/me/info");
    }
  }, [user, location.pathname, navigate]);

  if (!user) {
    return <p>User not logged in</p>;
  }

  return (
    <div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className={styles.account}>
          <div className={styles.account__side}>
            <button
              onClick={() => navigate("/me/info")}
              className={
                location.pathname === "/me/info"
                  ? styles.account__activeButton
                  : ""
              }
            >
              Contact Information
            </button>
            <button
              onClick={() => navigate("/me/gallery")}
              className={
                location.pathname === "/me/gallery"
                  ? styles.account__activeButton
                  : ""
              }
            >
              My gallery
            </button>
            <button
              onClick={() => navigate("/me/prices")}
              className={
                location.pathname === "/me/prices"
                  ? styles.account__activeButton
                  : ""
              }
            >
              My prices
            </button>
            <button
              onClick={() => navigate("/me/schedules")}
              className={
                location.pathname === "/me/schedules"
                  ? styles.account__activeButton
                  : ""
              }
            >
              My schedules
            </button>
            <button
              onClick={() => navigate("/me/addSchedules")}
              className={
                location.pathname === "/me/addSchedules"
                  ? styles.account__activeButton
                  : ""
              }
            >
              Add new time
            </button>
            <button
              onClick={() => navigate("/me/appointments")}
              className={
                location.pathname === "/me/appointments"
                  ? styles.account__activeButton
                  : ""
              }
            >
              My appointments
            </button>
          </div>
          <div className={styles.account__main}>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export { AccountMaster };
