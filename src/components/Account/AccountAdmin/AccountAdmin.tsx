import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ListIcon from "@mui/icons-material/List";
import React, { FC, useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector, useToggle } from "../../../hooks";
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
  const {
    value: isMobileAccountSectionOpen,
    change: toggleOpenAccountSection,
  } = useToggle(false);
  const [query, setQuery] = useSearchParams();
  const queryParams: QueryParams = {
    role_id: filterRole,
  };

  useEffect(() => {
    if (user) {
      if (filterRole && filterRole.length > 0) {
        setQuery({ role_id: filterRole.toString() });
      } else {
        setQuery({});
      }
      dispatch(usersActions.getUserById({ id: user.id }));
      dispatch(usersActions.getAllUsers({ query: queryParams }));
      dispatch(adminActions.getAllRoles());
    }
  }, [dispatch, user, filterRole, query, setQuery]);

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
        </>
      )}
    </div>
  );
};

export { AccountAdmin };
