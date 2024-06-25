import React, { FC, useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { QueryParams } from "../../../interfaces";
import { adminActions, usersActions } from "../../../redux";
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
    role_id: query.getAll("role_id").map(Number),
  };

  const roleIds = filterRole?.map((role) => role.id);

  useEffect(() => {
    if (user) {
      if (roleIds && roleIds.length > 0) {
        setQuery({ role_id: roleIds.map(String) });
      } else {
        setQuery({});
      }
      dispatch(usersActions.getUserById({ id: user.id }));
      dispatch(usersActions.getAllUsers({ query: queryParams }));
      dispatch(adminActions.getAllRoles());
    }
  }, [dispatch, user, filterRole, location.search]);

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
              onClick={() => navigate("/me/admin/usersInfo")}
              className={
                location.pathname === "/me/admin/usersInfo"
                  ? styles.account__activeButton
                  : ""
              }
            >
              All users
            </button>
            <button
              onClick={() => navigate("/me/admin/addMasters")}
              className={
                location.pathname === "/me/admin/addMasters"
                  ? styles.account__activeButton
                  : ""
              }
            >
              Create Master
            </button>
            <button
              onClick={() => navigate("/me/admin/addServices")}
              className={
                location.pathname === "/me/admin/addServices"
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
