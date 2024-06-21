import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { filtersActions } from "../../redux/slice/filtersSlice";
import { LoginPanel } from "../LoginPanel";
import { Logo } from "../Logo";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.carts);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (cart?.totalCount) {
      setShouldShake(true);
      setTimeout(() => {
        setShouldShake(false);
      }, 1300);
    }
  }, [cart?.totalCount]);

  const links = [
    {
      path: "/main",
      label: "Main",
    },
    {
      path: "/availableSchedules",
      label: "Available Schedules",
    },
    {
      path: "/aboutUs",
      label: "About us",
    },
    {
      path: "/services",
      label: "Services",
    },
    {
      path: "/cart",
      label: cart?.totalCount > 0 ? `Cart (${cart.totalCount})` : "Cart",
      isCardLink: true,
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
      <Logo />
      <div className={styles.navigationMenu}>
        <nav className={styles.navigation}>
          {links.map((link) => (
            <Link
              key={link.path}
              style={{ color: link.path === pathname ? "black" : "white" }}
              to={link.path}
              className={
                link.isCardLink
                  ? `${styles.cartLink} ${shouldShake ? styles.shakeAnimation : ""}`
                  : ""
              }
              onClick={() => handleLinkClick(link.path)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {user ? (
          <Link to={"/me/info"}>
            <div className={styles.userIcon}>
              {user.data.firstname.charAt(0)}
            </div>
          </Link>
        ) : (
          <LoginPanel />
        )}
      </div>
    </div>
  );
};

export { Header };
