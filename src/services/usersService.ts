import { urls } from "../constants";
import { IUpdateProfileParams, IUser, IUserResponse } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const usersService = {
  getAll: (role: string[]): IRes<IUserResponse> =>
    apiService.get(urls.users.all, {
      params: {
        filter: {
          role: role,
        },
      },
    }),
  getProfile: (id: number): IRes<IUser> => apiService.get(urls.users.byId(id)),
  deleteProfile: (id: number): IRes<void> =>
    apiService.delete(urls.users.byId(id)),
  updateProfile: (id: number, params: IUpdateProfileParams): IRes<IUser> =>
    apiService.patch(urls.users.byId(id), params),
};

export { usersService };
