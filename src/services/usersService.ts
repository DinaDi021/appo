import { urls } from "../constants";
import { IUser } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const usersService = {
  getAll: (): IRes<IUser> => apiService.get(urls.users.all),
  getProfile: (id: number): IRes<IUser> => apiService.get(urls.users.byId(id)),
};

export { usersService };
