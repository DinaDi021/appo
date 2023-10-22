const baseURL = "https://api.themoviedb.org/3";

const movies = "/discover/movie";
const topRated = "/movie/top_rated";
const upcoming = "/movie/upcoming";
const popular = "/movie/popular";
const genre = "/genre/movie/list";
const movie = "/movie";
const search = "/search/movie";

const urls = {
  movies,
  topRated,
  upcoming,
  popular,
  genre,
  search,
  movie: {
    byId: (id: number): string => `${movie}/${id}`,
  },
  video: {
    byId: (id: number): string => `${movie}/${id}/videos`,
  },
  credits: {
    byId: (id: number): string => `${movie}/${id}/credits`,
  },
};

export { baseURL, urls };
