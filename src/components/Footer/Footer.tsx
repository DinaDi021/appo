import React, { FC } from "react";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Want to register as a master? Contact the admin at{" "}
        <a href="mailto:di.ilina.work@gmail.com" className={styles.email}>
          admin@gmail.com
        </a>
      </p>
    </div>
  );
};

export { Footer };
