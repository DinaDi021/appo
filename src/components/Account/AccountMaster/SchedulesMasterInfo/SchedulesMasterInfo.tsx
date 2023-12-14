import React, { FC, PropsWithChildren } from "react";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { ISchedule } from "../../../../interfaces/scheduleInterface";
import { schedulesActions } from "../../../../redux";

interface IProps extends PropsWithChildren {
  schedule: ISchedule;
}

const SchedulesMasterInfo: FC<IProps> = ({ schedule }) => {
  const { schedule_id, status, date, time, appointment } = schedule;
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;
  const scheduleId = schedule_id;

  const dispatch = useAppDispatch();

  const deleteAppo = async () => {
    await dispatch(schedulesActions.deleteScheduleById({ userId, scheduleId }));
    dispatch(schedulesActions.getAllSchedules({ userId }));
  };

  // const updateAppo = async () => {
  //     await dispatch(schedulesActions.updateScheduleById({userId, scheduleId, }))
  // }

  return (
    <div>
      <h4>{status}</h4>
      <h4>{date}</h4>
      <h4>{time}</h4>
      {appointment ? (
        <div>
          <p>Title: {appointment.title}</p>
          <p>Title: {appointment.category}</p>
          <p>Title: {appointment.payment}</p>
        </div>
      ) : (
        <p>No appointment information available</p>
      )}
      <button onClick={deleteAppo}>Delete schedule</button>
    </div>
  );
};

export { SchedulesMasterInfo };
