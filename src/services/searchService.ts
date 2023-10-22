import { urls } from "../constants";
import { IMovie, IPagination, IRes } from "../interfaces";
import { apiService } from "./apiService";

const searchService = {
  getAll: (query: string, page: number): IRes<IPagination<IMovie>> =>
    apiService.get(urls.search, {
      params: { query, page },
    }),
};

export { searchService };
