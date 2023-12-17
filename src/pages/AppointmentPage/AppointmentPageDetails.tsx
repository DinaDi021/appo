import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AppointmentsInfoDetails } from "../../components/Appointments/AppointmentsInfoDetails/AppointmentsInfoDetails";
import { useAppDispatch, useAppLocation, useAppSelector } from "../../hooks";
import { IAppointment } from "../../interfaces";
import { appointmentsActions } from "../../redux";

const AppointmentPageDetails = () => {
  const { state } = useAppLocation<IAppointment>();
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.data.id;
  const [appointment, setAppointment] = useState<IAppointment | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state) {
      setAppointment(state);
    } else {
      dispatch(
        appointmentsActions.getUserAppointmentById({
          userId,
          appointmentId: +id,
        }),
      );
    }
  }, [id, state, userId, dispatch]);

  return (
    <div>
      {appointment && <AppointmentsInfoDetails appointment={appointment} />}
    </div>
  );
};

export { AppointmentPageDetails };
