import React, { FC } from "react";

import { AvailableSchedulesDetails } from "../../components";
import { GalleryForClient } from "../../components/Gallery/GalleryForClient";
import { useAppSelector } from "../../hooks";
import styles from "./AvailableSchedulesPage.module.scss";

const AvailableSchedulesDetailsPage: FC = () => {
  const { selectedMaster } = useAppSelector((state) => state.schedules);
  return (
    <div className={styles.available__page}>
      <AvailableSchedulesDetails availableSchedule={selectedMaster} />
      <GalleryForClient selectedMaster={selectedMaster} />
    </div>
  );
};

export { AvailableSchedulesDetailsPage };
