import React from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "../../components";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <>
      <>
        <Header />
      </>
      <div className={styles.container}>
        <Outlet />
      </div>
      <>
        <Footer />
      </>
    </>
  );
};

export { MainLayout };
