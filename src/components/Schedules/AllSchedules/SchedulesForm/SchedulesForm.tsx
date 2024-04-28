import { joiResolver } from "@hookform/resolvers/joi";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IAddSchedule } from "../../../../interfaces/scheduleInterface";
import { schedulesActions } from "../../../../redux";
import { schedulesShema } from "../../../../validators";
import styles from "../../../LoginPanel/Form/Form.module.scss";

const SchedulesForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddSchedule>({ resolver: joiResolver(schedulesShema) });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const addSchedule = async (data: IAddSchedule) => {
    await dispatch(
      schedulesActions.addSchedule({
        userId: user.data.id,
        data: { ...data },
      }),
    );
    reset();
    await dispatch(
      schedulesActions.getAllUsersSchedules({ userId: user.data.id }),
    );
  };

  return (
    <div>
      <h3>Choose date and time for add new Schedule:</h3>
      <form
        className={styles.form__schedule}
        onSubmit={handleSubmit(addSchedule)}
      >
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
        <button>Add new Schedule</button>
      </form>
    </div>
  );
};

export { SchedulesForm };
