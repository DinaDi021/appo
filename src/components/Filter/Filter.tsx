import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import dayjs from "dayjs";
import React, { FC, SyntheticEvent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IServices } from "../../interfaces";
import { servicesActions } from "../../redux";
import { filtersActions } from "../../redux/slice/filtersSlice";
import styles from "./Filter.module.scss";

const Filter: FC = () => {
  const { categories, services } = useAppSelector((state) => state.services);
  const { availableSchedules } = useAppSelector((state) => state.schedules);
  const { filterDate, filterService, filterCategories, filterMaster } =
    useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  console.log(filterDate, filterService, filterCategories, filterMaster);

  const handleDateChange = (dates: Date[]) => {
    console.log(dates);

    dispatch(filtersActions.setDateFilter(dates));
  };

  const handleServiceChange = (
    event: SyntheticEvent,
    selectedServices: IServices[],
  ) => {
    const serviceIds = selectedServices.map((service) => service.id);
    dispatch(filtersActions.setServiceFilter(serviceIds));
  };

  const handleMasterChange = (selectedMasters: number) => {
    dispatch(filtersActions.setMasterFilter(selectedMasters));
  };

  const handleCategoryChange = (
    event: SyntheticEvent,
    selectedCategory: string[],
  ) => {
    dispatch(filtersActions.setCategoryFilter(selectedCategory));
  };

  const handleClearFilterClick = () => {
    console.log("Clearing filters...");
    dispatch(filtersActions.clearDateFilter());
    dispatch(filtersActions.clearMasterFilter());
    dispatch(filtersActions.clearCategoryFilter());
    dispatch(filtersActions.clearServiceFilter());
  };

  useEffect(() => {
    dispatch(servicesActions.getAllServices());
  }, [dispatch]);

  return (
    <div className={styles.filter__container}>
      <div className={styles.filter__calendar}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar onChange={handleDateChange} />
        </LocalizationProvider>
      </div>
      <div>
        <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={categories}
          sx={{ width: 280 }}
          getOptionLabel={(option) => option}
          onChange={(event, value) => handleCategoryChange(event, value)}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
      </div>
      <div>
        <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={services}
          sx={{ width: 280 }}
          getOptionLabel={(service) => service.title}
          onChange={(event, value) => handleServiceChange(event, value)}
          renderInput={(params) => <TextField {...params} label="Services" />}
        />
      </div>
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={availableSchedules}
          sx={{ width: 280 }}
          getOptionLabel={(schedule) =>
            `${schedule.master_firstname} ${schedule.master_lastname}`
          }
          onChange={(event, value) =>
            handleMasterChange(value?.master_id ?? null)
          }
          renderInput={(params) => <TextField {...params} label="Masters" />}
        />
      </div>
      <div>
        <button onClick={() => handleClearFilterClick()}>Clear filters</button>
      </div>
    </div>
  );
};

export { Filter };
