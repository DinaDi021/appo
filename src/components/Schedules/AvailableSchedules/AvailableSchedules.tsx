import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { schedulesActions } from "../../../redux";
import { AvailableSchedulesDetails } from "./AvailableSchedulesDetails/AvailableSchedulesDetails";

const AvailableSchedules: FC = () => {
  const { availableSchedules } = useAppSelector((state) => state.schedules);
  console.log(availableSchedules);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(schedulesActions.getAvailableSchedules());
  }, [dispatch]);
  return (
    <>
      {availableSchedules.map((availableSchedule) => (
        <AvailableSchedulesDetails
          key={availableSchedule.master_id}
          availableSchedule={availableSchedule}
        />
      ))}
    </>
  );
};

export { AvailableSchedules };
