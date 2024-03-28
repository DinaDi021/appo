import React from "react";

import { SchedulesMasterInfo } from "../../components/Schedules/SchedulesMasterInfo/SchedulesMasterInfo";
import { useAppSelector } from "../../hooks";

const SchedulePages = () => {
  const { allSchedules } = useAppSelector((state) => state.schedules);

  return (
    <>
      <div>
        {allSchedules.length > 0 ? (
          allSchedules.map((schedule) => (
            <SchedulesMasterInfo
              key={schedule.schedule_id}
              schedule={schedule}
            />
          ))
        ) : (
          <p>No Schedules yet.</p>
        )}
      </div>
    </>
  );
};

export { SchedulePages };
