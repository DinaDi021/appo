import React, { FC, useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { QueryParams } from "../../../interfaces";
import { usersActions } from "../../../redux";
import { IsLoading } from "../../IsLoading";
import styles from "../Account.module.scss";

const AccountAdmin: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.progress);
  const { filterRole } = useAppSelector((state) => state.filters);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useSearchParams();
  const queryParams: QueryParams = {
    role: [query.get("role")],
  };

  useEffect(() => {
    if (user) {
      if (filterRole !== null) {
        queryParams.role = filterRole;
        setQuery({ query: filterRole });
      } else {
        delete queryParams.role;
      }
      dispatch(usersActions.getUserById({ id: user.data.id }));
      dispatch(usersActions.getAllUsers({ query: queryParams }));
    }
  }, [dispatch, user, filterRole, setQuery, location.search]);

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
              onClick={() => navigate("/me/usersInfo")}
              className={
                location.pathname === "/me/usersInfo"
                  ? styles.account__activeButton
                  : ""
              }
            >
              All users
            </button>
            <button
              onClick={() => navigate("/me/addMaster")}
              className={
                location.pathname === "/me/addMaster"
                  ? styles.account__activeButton
                  : ""
              }
            >
              Create Master
            </button>
            <button
              onClick={() => navigate("/me/addService")}
              className={
                location.pathname === "/me/addService"
                  ? styles.account__activeButton
                  : ""
              }
            >
              Create Service
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

export { AccountAdmin };
