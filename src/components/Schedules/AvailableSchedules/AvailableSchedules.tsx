import React, { FC, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { QueryParams } from "../../../interfaces";
import { schedulesActions } from "../../../redux";
import { updateQueryParams } from "../../../utils";
import { Filter } from "../../Filter/Filter";
import styles from "./AvailableSchedules.module.scss";
import { AvailableSchedulesMaster } from "./AvailableSchedulesMaster/AvailableSchedulesMaster";

const AvailableSchedules: FC = () => {
  const { availableSchedules } = useAppSelector((state) => state.schedules);
  const { filterDate, filterService, filterCategories, filterMaster } =
    useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [query, setQuery] = useSearchParams();
  const queryParams: QueryParams = {
    date: [query.get("date")],
    service_id: query.getAll("service_id").map(Number),
    category: [query.get("category")],
    master_id: +query.getAll("master_id"),
  };

  useEffect(() => {
    updateQueryParams(
      queryParams,
      setQuery,
      filterDate,
      filterService,
      filterCategories,
      filterMaster,
    );

    dispatch(schedulesActions.getAvailableSchedules({ query: queryParams }));
  }, [
    dispatch,
    filterService,
    filterCategories,
    filterMaster,
    filterDate,
    location.search,
  ]);

  if (!availableSchedules || availableSchedules.length === 0) {
    return (
      <div className={styles.noavailable__wrapper}>
        <Filter />
        <div className={styles.noavailable__text}>
          <h4>No available schedules. Please choose different parameters.</h4>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.available__wrapper}>
      <Filter />
      <div className={styles.available__container}>
        {availableSchedules.map((availableSchedule) => (
          <AvailableSchedulesMaster
            key={availableSchedule.master_id}
            availableSchedule={availableSchedule}
          />
        ))}
      </div>
    </div>
  );
};

export { AvailableSchedules };
