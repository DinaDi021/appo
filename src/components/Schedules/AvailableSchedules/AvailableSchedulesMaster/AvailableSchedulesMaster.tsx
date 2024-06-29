import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import empty_person from "../../../../assets/img/empty_person.png";
import { useAppDispatch } from "../../../../hooks";
import { IMaster } from "../../../../interfaces";
import { schedulesActions } from "../../../../redux";
import styles from "../AvailableSchedules.module.scss";

interface IProps extends PropsWithChildren {
  availableSchedule: IMaster;
}
const AvailableSchedulesMaster: FC<IProps> = ({ availableSchedule }) => {
  const {
    master_id,
    master_firstname,
    master_lastname,
    master_image,
    categories,
  } = availableSchedule;
  const dispatch = useAppDispatch();

  const handleMovieClick = () => {
    dispatch(schedulesActions.setSelectedMaster(availableSchedule));
  };

  return (
    <div className={styles.available__card}>
      <Link
        to={`/availableSchedules/${master_id}`}
        onClick={handleMovieClick}
        className={styles.available__profile}
      >
        <img
          className={styles.master__photo}
          src={master_image || empty_person}
          alt={`Avatar ${master_id}`}
        />
        <div className={styles.available__profile__info}>
          <h5>
            {master_firstname} {master_lastname}
          </h5>
          <h5>Categories:</h5>
          <div className={styles.master__category}>
            {categories.map((category, index) => (
              <p key={index}>{category}</p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export { AvailableSchedulesMaster };
