import React, { FC } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import { IsLoading } from "../IsLoading";
import styles from "./NotFound.module.scss";

const NotFound: FC = () => {
  const { isLoading } = useAppSelector((state) => state.progress);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <h1>404</h1>
          <h2>Page not found</h2>
          <h4>Sorry, we couldn’t find the page you’re looking for.</h4>
          <Link to={`/movies`}>
            <h2 className={styles.linkHome}>← Back to home</h2>
          </Link>
        </>
      )}
    </div>
  );
};

export { NotFound };
