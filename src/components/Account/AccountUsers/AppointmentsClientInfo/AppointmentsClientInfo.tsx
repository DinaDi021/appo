import React, { FC, PropsWithChildren } from "react";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IAppointment } from "../../../../interfaces";
import { appointmentsActions } from "../../../../redux";

interface IProps extends PropsWithChildren {
  appointment: IAppointment;
}

const AppointmentsClientInfo: FC<IProps> = ({ appointment }) => {
  const {
    id,
    sum,
    payment,
    title,
    category,
    master_firstname,
    master_lastname,
    date,
    time,
  } = appointment;
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;
  const appointmentId = id;

  const dispatch = useAppDispatch();

  const deleteAppo = async () => {
    await dispatch(
      appointmentsActions.deleteAppointmentById({ userId, appointmentId }),
    );
    dispatch(appointmentsActions.getUserAllAppointments({ userId }));
  };

  return (
    <div>
      <h4>{sum}</h4>
      <h4>{payment}</h4>
      <h4>{title}</h4>
      <h4>{category}</h4>
      <h4>{master_firstname}</h4>
      <h4>{master_lastname}</h4>
      <h4>{date}</h4>
      <h4>{time}</h4>
      <button onClick={deleteAppo}>Delete appointments</button>
    </div>
  );
};

export { AppointmentsClientInfo };
