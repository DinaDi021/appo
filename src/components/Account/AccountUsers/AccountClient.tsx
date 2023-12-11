import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { appointmentsActions, usersActions } from "../../../redux";
import { IsLoading } from "../../IsLoading";
import { AccountClientInfo } from "./AccountClientInfo/AccountUserInfo";
import { AppointmentsClientInfo } from "./AppointmentsClientInfo/AppointmentsClientInfo";

const AccountClient: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { allAppointments } = useAppSelector((state) => state.appointments);
  const { isLoading } = useAppSelector((state) => state.progress);

  useEffect(() => {
    if (user?.data) {
      dispatch(usersActions.getUserById({ id: user.data.id }));
    }
    dispatch(
      appointmentsActions.getUserAllAppointments({ userId: user.data.id }),
    );
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
          <AccountClientInfo key={user.data.id} user={user} />
          <h3>Post history</h3>
          <div>
            {allAppointments.map((appointment) => (
              <AppointmentsClientInfo
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { AccountClient };
