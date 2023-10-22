import { urls } from "../constants";
import { IMovie, IPagination, IRes } from "../interfaces";
import { apiService } from "./apiService";

const popularService = {
  getAll: (page: number): IRes<IPagination<IMovie>> =>
    apiService.get(urls.popular, { params: { page } }),
};

export { popularService };
