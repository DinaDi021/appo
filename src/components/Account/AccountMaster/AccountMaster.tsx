import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { usersActions } from "../../../redux";
import { IsLoading } from "../../IsLoading";
import { AccountMasterInfo } from "./AccountMasterInfo/AccountMasterInfo";
import { SchedulesMasterInfo } from "./SchedulesMasterInfo/SchedulesMasterInfo";

const AccountMaster: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { allSchedules } = useAppSelector((state) => state.schedules);
  const { isLoading } = useAppSelector((state) => state.progress);

  useEffect(() => {
    if (user?.data) {
      dispatch(usersActions.getUserById({ id: user.data.id }));
    }
  }, [dispatch, user]);

  if (!user) {
    return <p>User not logged in</p>;
  }

  return (
    <div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div>
          <h3>Contact Information </h3>
          <AccountMasterInfo key={user.data.id} user={user} />
          <h3>Post history</h3>
          <div>
            {allSchedules.map((schedule) => (
              <SchedulesMasterInfo
                key={schedule.schedule_id}
                schedule={schedule}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { AccountMaster };
