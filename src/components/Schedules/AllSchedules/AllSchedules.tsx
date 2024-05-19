import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { schedulesActions } from "../../../redux";
import styles from "../../Filter/Filter.module.scss";
import css from "./AllSchedules.module.scss";
import { SchedulesMasterInfo } from "./SchedulesMasterInfo/SchedulesMasterInfo";

const AllSchedules = () => {
  const dispatch = useAppDispatch();
  const { allSchedules, dateForSchedules } = useAppSelector(
    (state) => state.schedules,
  );

  const handleDateChange = (date: string | null) => {
    if (date) {
      const formattedDate = format(new Date(date), "yyyy-MM-dd");
      dispatch(schedulesActions.setSchedulesByDate(formattedDate));
    }
  };

  return (
    <div className={css.schedules__container}>
      <div className={styles.filter__calendar}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar value={dateForSchedules} onChange={handleDateChange} />
        </LocalizationProvider>
      </div>
      <div className={css.schedules__table}>
        {allSchedules && allSchedules.length > 0 ? (
          allSchedules.map((schedule) => (
            <SchedulesMasterInfo
              key={schedule.schedule_id}
              schedule={schedule}
            />
          ))
        ) : (
          <p>No Schedules yet</p>
        )}
      </div>
    </div>
  );
};

export { AllSchedules };
