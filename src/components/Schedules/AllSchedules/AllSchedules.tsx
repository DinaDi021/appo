import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { schedulesActions } from "../../../redux";
import styles from "../../Filter/Filter.module.scss";
import { ServerDay } from "../../Theme/ServerDay";
import { newTheme } from "../../Theme/ThemeMua";
import css from "./AllSchedules.module.scss";
import { SchedulesMasterInfo } from "./SchedulesMasterInfo/SchedulesMasterInfo";

const AllSchedules = () => {
  const dispatch = useAppDispatch();
  const { allSchedulesByDate, allSchedules } = useAppSelector(
    (state) => state.schedules,
  );
  const { filterDate } = useAppSelector((state) => state.schedules);
  const { user } = useAppSelector((state) => state.auth);
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    const formattedDate = format(filterDate, "yyyy-MM-dd");
    const currentDateParam = query.get("date");

    if (currentDateParam !== formattedDate) {
      dispatch(
        schedulesActions.getAllUsersSchedules({
          userId: user.data.id,
          date: [formattedDate],
        }),
      );
      setQuery({ date: formattedDate });
      dispatch(schedulesActions.getAllUsersSchedules({ userId: user.data.id }));
    }
  }, [dispatch, user, filterDate, query, setQuery]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      dispatch(schedulesActions.setSchedulesByDate(formattedDate));
    }
  };

  const getDaysWithSchedule = () => {
    return allSchedules.map((schedule) => {
      const scheduleDate = new Date(schedule.date_time);
      return format(scheduleDate, "yyyy-MM-dd");
    });
  };

  const baseTheme = createTheme();

  return (
    <div className={css.schedules__container}>
      <div className={styles.filter__calendar}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={newTheme(baseTheme)}>
            <DateCalendar
              value={filterDate ? new Date(filterDate) : null}
              onChange={handleDateChange}
              showDaysOutsideCurrentMonth={true}
              slots={{
                day: (dayProps) => (
                  <ServerDay
                    {...dayProps}
                    highlightedDays={getDaysWithSchedule()}
                  />
                ),
              }}
              sx={{
                ".MuiPickersYear-yearButton.Mui-selected:hover, .Mui-selected:hover.focus":
                  {
                    backgroundColor: "var(--turquoise) !important",
                  },
                ".MuiPickersYear-yearButton.Mui-selected": {
                  backgroundColor: "var(--green-pine) !important",
                },
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
      </div>
      <div className={css.schedules__table}>
        {allSchedulesByDate && allSchedulesByDate.length > 0 ? (
          allSchedulesByDate.map((schedule) => (
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
