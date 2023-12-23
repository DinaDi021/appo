import React, { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import { ISchedule } from "../../../interfaces/scheduleInterface";

interface IProps extends PropsWithChildren {
  schedule: ISchedule;
}

const SchedulesInfoDetails: FC<IProps> = ({ schedule }) => {
  const { schedule_id, status, date, time, appointment } = schedule;
  const navigate = useNavigate();
  const getSchedules = () => {
    navigate("/me/schedules");
  };

  return (
    <div>
      <h4>{status}</h4>
      <h4>{date}</h4>
      <h4>{time}</h4>
      <h1>{schedule_id}</h1>
      {appointment ? (
        <div>
          <p>Title: {appointment.title}</p>
          <p>Category: {appointment.category}</p>
          <p>Payment: {appointment.payment}</p>
        </div>
      ) : (
        <p>No appointment information available</p>
      )}
      <button onClick={getSchedules}>Back to all schedules</button>
    </div>
  );
};

export { SchedulesInfoDetails };
