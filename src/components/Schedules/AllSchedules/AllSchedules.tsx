import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";

import { useAppSelector } from "../../../hooks";
import { ISchedule } from "../../../interfaces/scheduleInterface";
import styles from "../../Filter/Filter.module.scss";
import css from "./AllSchedules.module.scss";
import { SchedulesMasterInfo } from "./SchedulesMasterInfo/SchedulesMasterInfo";

const AllSchedules = () => {
  const { allSchedules } = useAppSelector((state) => state.schedules);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const groupedSchedules: { [key: string]: ISchedule[] } = {};
  allSchedules.forEach((schedule) => {
    const date = schedule.date_time.split(" ")[0];
    if (!groupedSchedules[date]) {
      groupedSchedules[date] = [];
    }
    groupedSchedules[date].push(schedule);
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className={css.schedules__container}>
      <div className={styles.filter__calendar}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar value={selectedDate} onChange={handleDateChange} />
        </LocalizationProvider>
      </div>
      <div className={css.schedules__table}>
        {selectedDate &&
        groupedSchedules[selectedDate.toISOString().split("T")[0]] ? (
          <div className={css.schedules__table__dateColumn}>
            <div className={css.schedules__table__date}>
              <h3>{selectedDate.toDateString()}</h3>
            </div>
            {groupedSchedules[selectedDate.toISOString().split("T")[0]].map(
              (schedule) => (
                <SchedulesMasterInfo
                  key={schedule.schedule_id}
                  schedule={schedule}
                />
              ),
            )}
          </div>
        ) : (
          <p>No Schedules yet.</p>
        )}
      </div>
    </div>
  );
};

export { AllSchedules };
