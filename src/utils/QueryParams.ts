import { SetURLSearchParams } from "react-router-dom";

import { QueryParams } from "../interfaces";

export const updateQueryParams = (
  queryParams: QueryParams,
  setQuery: SetURLSearchParams,
  filterDate?: string[],
  filterService?: number[],
  filterCategories?: string[],
  filterMaster?: number,
) => {
  const newParams: QueryParams = { ...queryParams };

  if (filterDate?.length) {
    newParams.date = filterDate;
  } else {
    delete newParams.date;
  }

  if (filterService) {
    newParams.service_id = filterService;
  } else {
    delete newParams.service_id;
  }

  if (filterCategories?.length) {
    newParams.category = filterCategories;
  } else {
    delete newParams.category;
  }

  if (filterMaster !== null && filterMaster !== undefined) {
    newParams.master_id = filterMaster;
  } else {
    delete newParams.master_id;
  }

  const params = new URLSearchParams();

  Object.entries(newParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => params.append(key, val.toString()));
    } else if (value !== undefined) {
      params.append(key, value.toString());
    }
  });

  setQuery(params);
};
