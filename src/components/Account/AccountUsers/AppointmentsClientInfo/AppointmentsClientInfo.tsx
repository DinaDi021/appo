import React, { FC, PropsWithChildren } from "react";

import { IAppointment } from "../../../../interfaces";

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

  return (
    <div>
      <h4>{id}</h4>
      <h4>{sum}</h4>
      <h4>{payment}</h4>
      <h4>{title}</h4>
      <h4>{category}</h4>
      <h4>{master_firstname}</h4>
      <h4>{master_lastname}</h4>
      <h4>{date}</h4>
      <h4>{time}</h4>
      <button>Delete appointments</button>
    </div>
  );
};

export { AppointmentsClientInfo };
