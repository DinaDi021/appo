import { QueryParams } from "../interfaces";

export const updateQueryParams = (
  queryParams: QueryParams,
  setQuery: any,
  selectedGenreId: number,
  selectedSortBy: string,
) => {
  queryParams = { ...queryParams, page: queryParams.page || "1" };

  if (selectedGenreId) {
    queryParams.genreId = selectedGenreId.toString();
  } else {
    delete queryParams.genreId;
  }

  if (selectedSortBy) {
    queryParams.sorted = selectedSortBy;
  } else {
    delete queryParams.sorted;
  }

  setQuery(queryParams);
};
