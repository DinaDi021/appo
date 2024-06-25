import { QueryParams } from "../interfaces";

export const updateQueryParams = (
  queryParams: QueryParams,
  setQuery: any,
  filterDate?: string[],
  filterService?: number[],
  filterCategories?: string[],
  filterMaster?: number,
  filterRole?: number[],
) => {
  queryParams = { ...queryParams };

  if (filterDate && filterDate.length > 0) {
    queryParams.date = filterDate;
  } else {
    delete queryParams.date;
  }

  if (filterService !== null) {
    queryParams.service_id = filterService;
  } else {
    delete queryParams.service_id;
  }

  if (filterCategories && filterCategories.length > 0) {
    queryParams.category = filterCategories;
  } else {
    delete queryParams.category;
  }

  if (filterMaster !== null) {
    queryParams.master_id = filterMaster;
  } else {
    delete queryParams.master_id;
  }

  if (filterRole !== null) {
    queryParams.role_id = filterRole;
  } else {
    delete queryParams.role_id;
  }

  setQuery(queryParams);
};
