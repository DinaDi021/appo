import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import { LoginPanel } from "../LoginPanel";
import { Logo } from "../Logo";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const { user } = useAppSelector((state) => state.auth);

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
      path: "/courses",
      label: "Courses",
    },
    {
      path: "/contacts",
      label: "Contacts",
    },
  ];
  const { pathname } = useLocation();

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
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {user ? (
          <Link to={"/me"}>
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
