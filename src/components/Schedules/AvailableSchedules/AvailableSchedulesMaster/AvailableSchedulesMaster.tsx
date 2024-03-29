import React, { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../../../hooks";
import { IMaster } from "../../../../interfaces";
import styles from "../../../../pages/AvailableSchedulesPage/AvailableSchedulesPage.module.scss";
import { schedulesActions } from "../../../../redux";

interface IProps extends PropsWithChildren {
  availableSchedule: IMaster;
}
const AvailableSchedulesMaster: FC<IProps> = ({ availableSchedule }) => {
  const { master_id, master_firstname, master_lastname, categories } =
    availableSchedule;
  const dispatch = useAppDispatch();

  const handleMovieClick = () => {
    dispatch(schedulesActions.setSelectedMaster(availableSchedule));
  };

  return (
    <div className={styles.available__card}>
      <Link to={`/availableSchedules/${master_id}`} onClick={handleMovieClick}>
        <h4>
          {master_firstname} {master_lastname}
        </h4>
        <h4>Categories:</h4>
        <div>
          {categories.map((category, index) => (
            <p key={index}>{category}</p>
          ))}
        </div>
      </Link>
    </div>
  );
};

export { AvailableSchedulesMaster };
