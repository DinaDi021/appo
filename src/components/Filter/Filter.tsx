import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import React, { FC, SyntheticEvent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IServices } from "../../interfaces";
import { servicesActions } from "../../redux";
import { filtersActions } from "../../redux/slice/filtersSlice";
import { newTheme } from "../Theme";
import styles from "./Filter.module.scss";

const Filter: FC = () => {
  const { categories, services } = useAppSelector((state) => state.services);
  const { availableSchedules } = useAppSelector((state) => state.schedules);
  const { filterDate, filterService, filterCategories, filterMaster } =
    useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const filteredServices =
    filterCategories && filterCategories.length > 0
      ? services.filter((service) =>
          filterCategories.includes(service.category),
        )
      : services;

  const handleDateChange = (dates: Date[]) => {
    const formattedDates = Array.isArray(dates)
      ? dates.map((date) => format(date, "yyyy-MM-dd"))
      : [format(dates, "yyyy-MM-dd")];

    dispatch(filtersActions.setDateFilter(formattedDates));
  };

  const handleServiceChange = (
    event: SyntheticEvent,
    selectedServices: IServices[],
  ) => {
    const serviceIds = selectedServices.map((service) => service.id);
    dispatch(filtersActions.setServiceFilter(serviceIds));
  };

  const handleMasterChange = (selectedMasterId: number | null) => {
    dispatch(filtersActions.setMasterFilter(selectedMasterId));
  };

  const handleCategoryChange = (
    event: SyntheticEvent,
    selectedCategory: string[],
  ) => {
    dispatch(filtersActions.setCategoryFilter(selectedCategory));
  };

  const handleClearFilterClick = () => {
    dispatch(filtersActions.clearDateFilter());
    dispatch(filtersActions.clearMasterFilter());
    dispatch(filtersActions.clearCategoryFilter());
    dispatch(filtersActions.clearServiceFilter());
  };

  useEffect(() => {
    dispatch(servicesActions.getAllServices());
  }, [dispatch]);

  const baseTheme = createTheme();

  return (
    <div className={styles.filter__container}>
      <div className={styles.filter__calendar}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={newTheme(baseTheme)}>
            <DateCalendar
              onChange={handleDateChange}
              value={filterDate ? new Date(filterDate[0]) : null}
              sx={{
                ".MuiPickersYear-yearButton.Mui-selected:hover, .Mui-selected:hover.focus":
                  {
                    backgroundColor: "var(--turquoise) !important",
                  },
                ".MuiPickersYear-yearButton.Mui-selected": {
                  color: "var(--basic-white)",
                  backgroundColor: "var(--green-pine) !important",
                },
                ".MuiPickersYear-yearButton": {
                  color: "var(--basic-black)",
                },
                ".MuiPickersCalendarHeader-label": {
                  color: "var(--basic-black)",
                },
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
      </div>
      <div className={styles.filter__autocomplete}>
        <div>
          <ThemeProvider theme={newTheme(baseTheme)}>
            <Autocomplete
              multiple
              id="size-small-standard-multi"
              size="medium"
              options={categories}
              value={filterCategories || []}
              sx={{ width: 280 }}
              getOptionLabel={(option) => option}
              onChange={(event, value) => handleCategoryChange(event, value)}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={newTheme(baseTheme)}>
            <Autocomplete
              multiple
              id="size-small-standard-multi"
              size="medium"
              options={filteredServices}
              value={filteredServices.filter((service) =>
                filterService?.includes(service.id),
              )}
              sx={{ width: 280 }}
              getOptionLabel={(service) => service.title}
              onChange={(event, value) => handleServiceChange(event, value)}
              renderInput={(params) => (
                <TextField {...params} label="Services" />
              )}
            />
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={newTheme(baseTheme)}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size={"medium"}
              options={availableSchedules}
              value={
                availableSchedules.find(
                  (schedule) => schedule.master_id === filterMaster,
                ) || null
              }
              sx={{ width: 280 }}
              getOptionLabel={(schedule) =>
                `${schedule.master_firstname} ${schedule.master_lastname}`
              }
              onChange={(event, value) =>
                handleMasterChange(value?.master_id ?? null)
              }
              isOptionEqualToValue={(option, value) =>
                option?.master_id === value?.master_id
              }
              renderInput={(params) => (
                <TextField {...params} label="Masters" />
              )}
            />
          </ThemeProvider>
        </div>
      </div>

      <div>
        <button onClick={() => handleClearFilterClick()}>Clear filters</button>
      </div>
    </div>
  );
};

export { Filter };
