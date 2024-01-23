import { urls } from "../constants";
import { IServicesResponse } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const servicesService = {
  getAll: (): IRes<IServicesResponse> => apiService.get(urls.services.all),
};

export { servicesService };
