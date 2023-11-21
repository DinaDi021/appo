import { urls } from "../constants";
import { IPagination, IUser } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const usersService = {
  getAll: (): IRes<IPagination<IUser>> => apiService.get(urls.users.all),
  getProfile: (id: number): IRes<IUser> => apiService.get(urls.users.byId(id)),
  deleteProfile: (id: number): IRes<void> =>
    apiService.delete(urls.users.byId(id)),
};

export { usersService };
