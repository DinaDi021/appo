import React, { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IAppointment } from "../../interfaces";
import { appointmentsActions } from "../../redux";

interface IProps extends PropsWithChildren {
  appointment: IAppointment;
}

const AppointmentsInfo: FC<IProps> = ({ appointment }) => {
  const { id, title, date, time } = appointment;
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;
  const appointmentId = id;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const deleteAppo = async () => {
    await dispatch(
      appointmentsActions.deleteAppointmentById({ userId, appointmentId }),
    );
    dispatch(appointmentsActions.getUserAllAppointments({ userId }));
  };

  const getDetails = () => {
    navigate(`${id}`, { state: appointment });
  };

  return (
    <>
      <div>
        <h4>{title}</h4>
        <h4>{date}</h4>
        <h4>{time}</h4>
        <button onClick={deleteAppo}>Delete appointments</button>
        <button onClick={getDetails}>Get details</button>
      </div>
    </>
  );
};

export { AppointmentsInfo };
