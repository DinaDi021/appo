import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { filtersActions } from "../../redux";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.carts);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (user && cart?.totalCount) {
      setShouldShake(true);
      setTimeout(() => {
        setShouldShake(false);
      }, 1300);
    }
  }, [cart?.totalCount]);

  const links = [
    {
      path: "/availableSchedules",
      label: "Available Schedules",
    },
    {
      path: "/services",
      label: "Services",
    },
    {
      path: "/cart",
      label:
        user && cart?.totalCount > 0 ? `Cart (${cart.totalCount})` : "Cart",
      isCardLink: true,
    },
    {
      path: "/me/info",
      label: "Account",
    },
  ];

  const handleClearFilterClick = () => {
    dispatch(filtersActions.clearDateFilter());
    dispatch(filtersActions.clearMasterFilter());
    dispatch(filtersActions.clearCategoryFilter());
    dispatch(filtersActions.clearServiceFilter());
  };

  const handleLinkClick = (path: string) => {
    if (path === "/availableSchedules") {
      handleClearFilterClick();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationMenu}>
        <nav className={styles.navigation}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.link} ${
                link.path === pathname
                  ? styles.link__active
                  : styles.link__inactive
              } ${
                link.isCardLink
                  ? `${styles.cartLink} ${shouldShake ? styles.shakeAnimation : ""}`
                  : ""
              }`}
              onClick={() => handleLinkClick(link.path)}
            >
              {link.label}
            </Link>
          ))}
          {/*{user ? (*/}
          {/*  <Link to={"/me/info"}>*/}
          {/*    <div className={styles.userIcon}>*/}
          {/*      {user.data.firstname.charAt(0)}*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*) : (*/}
          {/*  <LoginPanel />*/}
          {/*)}*/}
        </nav>
      </div>
    </div>
  );
};

export { Header };
