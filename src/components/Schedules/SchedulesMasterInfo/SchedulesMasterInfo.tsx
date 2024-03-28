import { joiResolver } from "@hookform/resolvers/joi";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IUpdateSchedulesParams } from "../../../interfaces";
import { ISchedule } from "../../../interfaces/scheduleInterface";
import { schedulesActions } from "../../../redux";
import { schedulesShema } from "../../../validators";
import styles from "../../LoginPanel/Form/Form.module.scss";

interface IProps extends PropsWithChildren {
  schedule: ISchedule;
}

const SchedulesMasterInfo: FC<IProps> = ({ schedule }) => {
  const { schedule_id, status, date_time } = schedule;
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
    resolver: joiResolver(schedulesShema),
  });

  useEffect(() => {
    if (schedule) {
      setValue("date_time", date_time);
    }
    if (updatedSchedule && updatedSchedule.schedule_id === schedule_id) {
      setValue("date_time", updatedSchedule.date_time);
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
      <h4>Schedules:</h4>
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
              placeholder={"XXXX-XX-XX 00:00:00"}
              {...register("date_time")}
            />
          </label>
          {errors.date_time && (
            <div className={styles.form__error}>
              {errors?.date_time && <span>invalid date or time</span>}
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
