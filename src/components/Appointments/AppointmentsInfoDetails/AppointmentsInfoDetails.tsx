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
    paid_sum,
    title,
    category,
    master_firstname,
    master_lastname,
    date_time,
  } = appointment;
  const navigate = useNavigate();

  const getAppointments = () => {
    navigate("/me/appointments");
  };

  const dataTimeWithoutSec = date_time.substring(0, 16);
  const sumForToPay = sum - paid_sum;

  return (
    <div>
      <h4>Category: {category}</h4>
      <h4>Service: {title}</h4>
      <h4>Price: {sum}</h4>
      <h4>
        Your master: {master_firstname} {master_lastname}
      </h4>
      <h4>Date and time: {dataTimeWithoutSec}</h4>
      <h4>
        Type your payment: {payment}
        {payment === "prepayment" && ` - amount ${paid_sum}`}
      </h4>
      <h4>Amount to be paid: {sumForToPay}</h4>

      <Link to={"/me/appointments"}>
        <button onClick={getAppointments}>Back to all appointments</button>
      </Link>
    </div>
  );
};

export { AppointmentsInfoDetails };
