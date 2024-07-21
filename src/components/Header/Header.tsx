import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { filtersActions, mobileMenuActions } from "../../redux";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.carts);
  const { isMobileMenuOpen } = useAppSelector((state) => state.mobileMenu);
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
      path: user ? "/me/info" : "/login",
      label: user ? "Account" : "Sign In",
    },
  ];

  const handleClearFilterClick = () => {
    dispatch(filtersActions.clearDateFilter());
    dispatch(filtersActions.clearMasterFilter());
    dispatch(filtersActions.clearCategoryFilter());
    dispatch(filtersActions.clearServiceFilter());
  };

  const handleLinkClick = (path: string) => {
    dispatch(mobileMenuActions.toggleMobileMenu());
    if (path === "/availableSchedules") {
      handleClearFilterClick();
    }
  };

  const handleToogleMobileMenuClick = () => {
    dispatch(mobileMenuActions.toggleMobileMenu());
  };

  return (
    <div
      className={
        isMobileMenuOpen
          ? `${styles.header__container__mobile} ${styles.header__container__mobileBc}`
          : styles.header__container
      }
    >
      <div
        className={styles.header__navigationMenu__mobile}
        onClick={handleToogleMobileMenuClick}
      >
        {isMobileMenuOpen ? <CloseOutlinedIcon /> : <MenuIcon />}
      </div>
      <div
        className={`${styles.header__navigationMenu} ${isMobileMenuOpen ? styles.menuOpen : styles.menuClosed}`}
      >
        <nav className={styles.header__navigation}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.header__link} ${
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
        </nav>
      </div>
    </div>
  );
};

export { Header };
