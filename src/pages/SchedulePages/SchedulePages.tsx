import React from "react";

import { SchedulesForm } from "../../components/Schedules/SchedulesForm/SchedulesForm";
import { SchedulesMasterInfo } from "../../components/Schedules/SchedulesMasterInfo/SchedulesMasterInfo";
import { useAppSelector } from "../../hooks";

const SchedulePages = () => {
  const { allSchedules } = useAppSelector((state) => state.schedules);

  return (
    <>
      <SchedulesForm />
      <h4>Schedules:</h4>
      <div>
        {allSchedules.map((schedule) => (
          <SchedulesMasterInfo key={schedule.schedule_id} schedule={schedule} />
        ))}
      </div>
    </>
  );
};

export { SchedulePages };
