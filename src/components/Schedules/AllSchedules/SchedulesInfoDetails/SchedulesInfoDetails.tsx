import React, { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import { ISchedule } from "../../../../interfaces/scheduleInterface";
import styles from "../../../Appointments/AppointmentsInfo.module.scss";

interface IProps extends PropsWithChildren {
  schedule: ISchedule;
}

const SchedulesInfoDetails: FC<IProps> = ({ schedule }) => {
  const { status, date_time, appointment } = schedule;
  const navigate = useNavigate();
  const getSchedules = () => {
    navigate("/me/schedules");
  };

  const dataTimeWithoutSec = date_time.substring(0, 16);
  const sumForToPay = appointment ? appointment.sum - appointment.paid_sum : 0;

  return (
    <div>
      {appointment ? (
        <div className={styles.card}>
          <div className={styles.card__infoWrapper}>
            <div className={styles.card__info}>
              <h4>Category: {appointment.category}</h4>
              <h4>Service: {appointment.title}</h4>
              <h4>
                Customer: {appointment.firstname} {appointment.lastname}
              </h4>
              <h4 className={styles.card__info__date}>{dataTimeWithoutSec}</h4>
            </div>
          </div>
          <div className={styles.card__price}>
            <h4>Price: {appointment.sum}</h4>
            <h4>
              Сustomer payment type: {appointment.payment}
              {appointment.payment === "prepayment" &&
                ` - ${appointment.paid_sum}`}
            </h4>
            <h4>Amount to be paid: {sumForToPay}</h4>
          </div>
        </div>
      ) : (
        <p style={{ margin: "10px" }}>
          This schedule have status - {status}. No appointment information
          available yet.
        </p>
      )}
      <button style={{ margin: "10px" }} onClick={getSchedules}>
        Back to all schedules
      </button>
    </div>
  );
};

export { SchedulesInfoDetails };
