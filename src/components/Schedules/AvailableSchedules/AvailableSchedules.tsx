import React, { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { QueryParams } from "../../../interfaces";
import styles from "../../../pages/AvailableSchedulesPage/AvailableSchedulesPage.module.scss";
import { schedulesActions } from "../../../redux";
import { updateQueryParams } from "../../../utils";
import { Filter } from "../../Filter/Filter";
import { AvailableSchedulesMaster } from "./AvailableSchedulesMaster/AvailableSchedulesMaster";

const AvailableSchedules: FC = () => {
  const { availableSchedules } = useAppSelector((state) => state.schedules);
  const { filterDate, filterService, filterCategories, filterMaster } =
    useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams();
  const queryParams: QueryParams = {
    date: [query.get("date")],
    service_id: query.getAll("service_id").map(Number),
    category: [query.get("category")],
    master_id: query.getAll("master_id").map(Number),
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
  }, [dispatch, filterDate, filterService, filterCategories, filterMaster]);

  if (!availableSchedules || availableSchedules.length === 0) {
    return <div>No available schedules</div>;
  }

  return (
    <div className={styles.available__wrapper}>
      <Filter />
      <div className={styles.available__container}>
        {availableSchedules.map((availableSchedule) =>
          availableSchedule && Object.keys(availableSchedule).length !== 0 ? (
            <AvailableSchedulesMaster
              key={availableSchedule.master_id}
              availableSchedule={availableSchedule}
            />
          ) : null,
        )}
      </div>
    </div>
  );
};

export { AvailableSchedules };
