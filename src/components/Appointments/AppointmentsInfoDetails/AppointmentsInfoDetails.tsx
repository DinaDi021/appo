import React, { FC, PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IAppointment } from "../../../interfaces";

interface IProps extends PropsWithChildren {
  appointment: IAppointment;
}

const AppointmentsInfoDetails: FC<IProps> = ({ appointment }) => {
  const {
    sum,
    payment,
    title,
    category,
    master_firstname,
    master_lastname,
    date,
    time,
  } = appointment;
  const navigate = useNavigate();

  const getAppointments = () => {
    navigate("/me/appointments");
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
      <Link to={"/me/appointments"}>
        <button onClick={getAppointments}>Back to all appointments</button>
      </Link>
    </div>
  );
};

export { AppointmentsInfoDetails };
