import { joiResolver } from "@hookform/resolvers/joi";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IUpdateSchedulesParams } from "../../../interfaces";
import { ISchedule } from "../../../interfaces/scheduleInterface";
import { schedulesActions } from "../../../redux";
import { updateShemaSchedules } from "../../../validators";
import styles from "../../LoginPanel/Form/Form.module.scss";

interface IProps extends PropsWithChildren {
  schedule: ISchedule;
}

const SchedulesMasterInfo: FC<IProps> = ({ schedule }) => {
  const { schedule_id, status, date, time } = schedule;
  const { user } = useAppSelector((state) => state.auth);
  const { updatedSchedule } = useAppSelector((state) => state.schedules);
  const userId = user.data.id;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateSchedulesParams>({
    resolver: joiResolver(updateShemaSchedules),
  });

  useEffect(() => {
    if (schedule) {
      setValue("date", date);
      setValue("time", time);
    }
    if (updatedSchedule && updatedSchedule.schedule_id === schedule_id) {
      setValue("date", updatedSchedule.date);
      setValue("time", updatedSchedule.time);
    }
  }, [schedule_id, updatedSchedule, setValue]);

  const deleteSchedule = async () => {
    await dispatch(
      schedulesActions.deleteScheduleById({
        userId,
        scheduleId: schedule_id,
      }),
    );
    dispatch(schedulesActions.getAllUsersSchedules({ userId }));
  };

  const getDetails = () => {
    navigate(`${schedule_id}`, { state: schedule });
  };

  // delete client's appointment from master account

  // const deleteAppo = async () => {
  //   await dispatch(
  //     appointmentsActions.deleteAppointmentById({
  //       userId,
  //       appointmentId: appointment.id,
  //     }),
  //   );
  //   dispatch(appointmentsActions.getUserAllAppointments({ userId }));
  // };

  const update: SubmitHandler<IUpdateSchedulesParams> = async (params) => {
    await dispatch(
      schedulesActions.updateScheduleById({
        userId: userId,
        scheduleId: schedule_id,
        params,
      }),
    );
    dispatch(schedulesActions.setUpdatedParams({ ...params, schedule_id }));
  };

  return (
    <div>
      <div className={styles.schedule__status}>
        <AssignmentTurnedInOutlinedIcon />
        <h4>{status}</h4>
      </div>
      <form className={styles.form__schedule} onSubmit={handleSubmit(update)}>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <EventOutlinedIcon />
            <input
              type="text"
              placeholder={"XXXX-XX-XX"}
              {...register("date")}
            />
          </label>
          {errors.date && (
            <div className={styles.form__error}>
              {errors?.date && <span>invalid date</span>}
            </div>
          )}
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label}>
            <AccessTimeOutlinedIcon />
            <input type="text" placeholder={"XX:XX"} {...register("time")} />
          </label>
          {errors.time && (
            <div className={styles.form__error}>
              {errors?.time && <span>invalid time</span>}
            </div>
          )}
        </div>
        <button>Update Schedule</button>
      </form>

      <button onClick={deleteSchedule}>Delete schedule</button>
      <button onClick={getDetails}>Get details</button>
    </div>
  );
};

export { SchedulesMasterInfo };
