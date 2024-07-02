import React from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "../../components";
import { useAppSelector } from "../../hooks";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  const { isMobileMenuOpen } = useAppSelector((state) => state.mobileMenu);
  return (
    <>
      <>
        <Header />
      </>
      <div
        className={`${styles.mainLayout__container} ${isMobileMenuOpen ? styles.__addFilter : ""}`}
      >
        <Outlet />
      </div>
      <>
        <Footer />
      </>
    </>
  );
};

export { MainLayout };
