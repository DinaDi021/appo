import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SchedulesInfoDetails } from "../../components";
import { useAppDispatch, useAppLocation, useAppSelector } from "../../hooks";
import { ISchedule } from "../../interfaces/scheduleInterface";
import { schedulesActions } from "../../redux";

const SchedulesPageDetails = () => {
  const { state } = useAppLocation<ISchedule>();
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;
  const [schedule, setSchedule] = useState<ISchedule | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state) {
      setSchedule(state);
    } else {
      dispatch(
        schedulesActions.getScheduleById({
          userId,
          scheduleId: +id,
        }),
      );
    }
  }, [id, state, userId, dispatch]);

  return <div>{schedule && <SchedulesInfoDetails schedule={schedule} />}</div>;
};

export { SchedulesPageDetails };
