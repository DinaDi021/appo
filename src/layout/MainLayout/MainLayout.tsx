import React from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "../../components";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <div>
      <>
        <Header />
      </>
      <div className={styles.container}>
        <Outlet />
      </div>
      <>
        <Footer />
      </>
    </div>
  );
};

export { MainLayout };
