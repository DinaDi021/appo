import { joiResolver } from "@hookform/resolvers/joi";
import TextField from "@mui/material/TextField/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { IAddSchedule } from "../../../../interfaces/scheduleInterface";
import { schedulesActions } from "../../../../redux";
import { schedulesShema } from "../../../../validators";
import styles from "../../../LoginPanel/Form/Form.module.scss";
import css from "../AllSchedules.module.scss";

const SchedulesForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddSchedule>({ resolver: joiResolver(schedulesShema) });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { dateForSchedules } = useAppSelector((state) => state.schedules);
  const [addedDateTime, setAddedDateTime] = useState<string | null>(null);

  const addSchedule = async (data: IAddSchedule) => {
    await dispatch(
      schedulesActions.addSchedule({
        userId: user.data.id,
        data: { ...data },
      }),
    );
    await dispatch(
      schedulesActions.getAllUsersSchedules({
        userId: user.data.id,
        date: [dateForSchedules],
      }),
    );
    setAddedDateTime(data.date_time);
  };

  return (
    <div>
      <h3 className={styles.form__schedule__title}>
        Choose date and time for add new Schedule:
      </h3>
      <form
        className={styles.form__schedule}
        onSubmit={handleSubmit(addSchedule)}
      >
        <div className={styles.form__container}>
          <label className={css.schedules__form__dateTime}>
            <Controller
              name="date_time"
              control={control}
              defaultValue={dayjs().format("YYYY-MM-DD HH:mm")}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDateTimePicker
                    value={dayjs(value)}
                    onChange={(newValue) => {
                      onChange(
                        newValue ? newValue.format("YYYY-MM-DD HH:mm:ss") : "",
                      );
                    }}
                  />
                  <TextField
                    style={{ display: "none" }}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                </LocalizationProvider>
              )}
            />
            {/*<input*/}
            {/*  type="text"*/}
            {/*  placeholder={"XXXX-XX-XX 00:00:00"}*/}
            {/*  {...register("date_time")}*/}
            {/*/>*/}
          </label>
          {errors.date_time && (
            <div className={styles.form__error}>
              {errors?.date_time && <span>invalid date or time</span>}
            </div>
          )}
        </div>
        <button className={styles.form__schedule__btn}>Add new Schedule</button>
        {addedDateTime && <div>Schedule added for: {addedDateTime}</div>}
      </form>
    </div>
  );
};

export { SchedulesForm };
