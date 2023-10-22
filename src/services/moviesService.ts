import { urls } from "../constants";
import { IMovie, IPagination, IRes } from "../interfaces";
import { apiService } from "./apiService";

const moviesService = {
  getAll: (
    page: number,
    genreId: string,
    sorted: string,
  ): IRes<IPagination<IMovie>> =>
    apiService.get(urls.movies, {
      params: {
        page,
        with_genres: genreId,
        sort_by: sorted,
      },
    }),
  getById: (id: number): IRes<IMovie> => apiService.get(urls.movie.byId(id)),
};

export { moviesService };
