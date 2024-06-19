import { QueryParams } from "../interfaces";

export const updateQueryParams = (
  queryParams: QueryParams,
  setQuery: any,
  filterDate: string[],
  filterService?: number[],
  filterCategories?: string[],
  filterMaster?: number,
) => {
  const newQueryParams: { [key: string]: string | string[] } = {};

  if (filterDate && filterDate.length > 0) {
    newQueryParams.date = filterDate;
  }

  if (filterService && filterService.length > 0) {
    newQueryParams.service_id = filterService.map(String);
  }

  if (filterCategories && filterCategories.length > 0) {
    newQueryParams.category = filterCategories;
  }

  if (filterMaster !== undefined && filterMaster !== null) {
    newQueryParams.master_id = String(filterMaster);
  }

  setQuery(newQueryParams);
};
