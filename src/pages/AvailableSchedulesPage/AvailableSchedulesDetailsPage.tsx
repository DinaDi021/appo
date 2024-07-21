import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AvailableSchedulesDetails, IsLoading } from "../../components";
import { GalleryForClient } from "../../components/Gallery/GalleryForClient";
import styles from "../../components/Schedules/AvailableSchedules/AvailableSchedules.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { authActions } from "../../redux";

const AvailableSchedulesDetailsPage: FC = () => {
  const { selectedMaster } = useAppSelector((state) => state.schedules);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(
        authActions.setError({
          message: "You need to be logged in to access this page.",
        }),
      );
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <IsLoading />;
  }
  return (
    <div className={styles.available__page}>
      <AvailableSchedulesDetails availableSchedule={selectedMaster} />
      <GalleryForClient selectedMaster={selectedMaster} />
    </div>
  );
};

export { AvailableSchedulesDetailsPage };
