import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { FC, PropsWithChildren, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IAppointment } from "../../interfaces";
import { appointmentsActions } from "../../redux";
import { Modal } from "../Modal/Modal";
import styles from "./AppointmentsInfo.module.scss";

interface IProps extends PropsWithChildren {
  appointment: IAppointment;
}

const AppointmentsInfo: FC<IProps> = ({ appointment }) => {
  const {
    id,
    sum,
    payment,
    paid_sum,
    title,
    category,
    master_firstname,
    master_lastname,
    date_time,
  } = appointment;
  const { user } = useAppSelector((state) => state.auth);
  const userId = user.id;
  const appointmentId = id;
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const dataTimeWithoutSec = date_time.substring(0, 16);
  const sumForToPay = sum - paid_sum;

  const deleteAppo = async () => {
    setShowModal(false);
    await dispatch(
      appointmentsActions.deleteAppointmentById({ userId, appointmentId }),
    );
    dispatch(appointmentsActions.getUserAllAppointments({ userId }));
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card__infoWrapper}>
          <div className={styles.card__info}>
            <h4>Category: {category}</h4>
            <h4>Service: {title}</h4>
            <h4>
              Your master: {master_firstname} {master_lastname}
            </h4>
            <h4 className={styles.card__info__date}>{dataTimeWithoutSec}</h4>
          </div>
        </div>
        <div className={styles.card__price}>
          <h4>Price: {sum}</h4>
          <h4>
            Type your payment: {payment}
            {payment === "prepayment" && ` - ${paid_sum}`}
          </h4>
          <h4>Amount to be paid: {sumForToPay}</h4>
          <button
            onClick={() => setShowModal(true)}
            className={styles.card__btnAction}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteAppo}
      />
    </>
  );
};

export { AppointmentsInfo };
