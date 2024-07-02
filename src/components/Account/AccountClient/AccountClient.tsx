import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ListIcon from "@mui/icons-material/List";
import React, { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector, useToggle } from "../../../hooks";
import { appointmentsActions, usersActions } from "../../../redux";
import { IsLoading } from "../../IsLoading";
import styles from "../Account.module.scss";

const AccountClient: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.progress);
  const navigate = useNavigate();
  const {
    value: isMobileAccountSectionOpen,
    change: toggleOpenAccountSection,
  } = useToggle(false);

  useEffect(() => {
    if (user) {
      dispatch(usersActions.getUserById({ id: user.id }));
      dispatch(appointmentsActions.getUserAllAppointments({ userId: user.id }));
    }
    navigate("/me/info");
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (isMobileAccountSectionOpen) {
      toggleOpenAccountSection();
    }
  }, [location.pathname]);

  if (!user) {
    return <p>User not logged in</p>;
  }

  return (
    <div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <div
            className={styles.account__side__mobileMenu}
            onClick={toggleOpenAccountSection}
          >
            <button>
              {isMobileAccountSectionOpen ? (
                <CloseOutlinedIcon />
              ) : (
                <ListIcon />
              )}
            </button>
          </div>
          <div className={styles.account}>
            <div
              className={`${styles.account__side} ${isMobileAccountSectionOpen ? styles.visible : styles.hidden}`}
            >
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
        </>
      )}
    </div>
  );
};

export { AccountClient };
