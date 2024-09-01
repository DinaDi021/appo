import React from "react";

import { AppointmentsInfo, IsLoading } from "../../components";
import styles from "../../components/Appointments/AppointmentsInfo.module.scss";
import { useAppSelector } from "../../hooks";

const AppointmentPage = () => {
  const { allAppointments } = useAppSelector((state) => state.appointments);
  const { isLoading } = useAppSelector((state) => state.progress);

  return (
    <>
      {" "}
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className={styles.appointments__container}>
          {allAppointments.length > 0 ? (
            allAppointments.map((appointment) => (
              <AppointmentsInfo
                key={appointment.id}
                appointment={appointment}
              />
            ))
          ) : (
            <p>No appointments yet.</p>
          )}
        </div>
      )}
    </>
  );
};

export { AppointmentPage };
