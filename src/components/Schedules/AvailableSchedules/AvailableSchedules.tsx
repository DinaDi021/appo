import React, { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { QueryParams } from "../../../interfaces";
import { schedulesActions } from "../../../redux";
import { updateQueryParams } from "../../../utils";
import { Filter } from "../../Filter/Filter";
import { IsLoading } from "../../IsLoading";
import styles from "../AvailableSchedules/AvailableSchedules.module.scss";
import { AvailableSchedulesMaster } from "./AvailableSchedulesMaster/AvailableSchedulesMaster";

const AvailableSchedules: FC = () => {
  const { availableSchedules } = useAppSelector((state) => state.schedules);
  const { isLoading } = useAppSelector((state) => state.progress);
  const { filterDate, filterService, filterCategories, filterMaster } =
    useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const [, setQuery] = useSearchParams();
  const queryParams: QueryParams = {
    date: filterDate,
    service_id: filterService,
    category: filterCategories,
    master_id: filterMaster,
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
  }, [dispatch, filterService, filterCategories, filterMaster, filterDate]);

  if (!availableSchedules || availableSchedules.length === 0) {
    return (
      <div className={styles.noavailable__wrapper}>
        <Filter />
        {isLoading ? (
          <div className={styles.available__container}>
            <IsLoading />
          </div>
        ) : (
          <div className={styles.noavailable__text}>
            No available schedules. Please choose different parameters.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.available__wrapper}>
      <Filter />
      {isLoading ? (
        <div className={styles.available__container}>
          <IsLoading />
        </div>
      ) : (
        <div className={styles.available__container}>
          {availableSchedules.map((availableSchedule) => (
            <AvailableSchedulesMaster
              key={availableSchedule.master_id}
              availableSchedule={availableSchedule}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export { AvailableSchedules };
