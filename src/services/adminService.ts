import { urls } from "../constants";
import {
  IAddMaster,
  IAddService,
  IRolesResponse,
  IServices,
  IUser,
} from "../interfaces";
import { apiService, IRes } from "./apiServices";

const adminService = {
  getRoles: (): IRes<IRolesResponse> => apiService.get(urls.roles),
  addMaster: (data: IAddMaster): IRes<IUser> =>
    apiService.post(urls.admin.master, data),
  addService: (data: IAddService): IRes<IServices> =>
    apiService.post(urls.services.all, data),
};

export { adminService };
