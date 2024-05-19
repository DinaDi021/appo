import { urls } from "../constants";
import {
  IAddPrice,
  IPrice,
  IPriceResponse,
  IServicesResponse,
  IUpdatePriceParams,
} from "../interfaces";
import { apiService, IRes } from "./apiServices";

const servicesService = {
  getAll: (): IRes<IServicesResponse> => apiService.get(urls.services.all),
  getAllPrices: (userId: number, data?: string[]): IRes<IPriceResponse> =>
    apiService.get(urls.prices.all(userId), {
      params: {
        filter: {
          date: data,
        },
      },
    }),
  getPriceById: (userId: number, priceId: number): IRes<IPrice> =>
    apiService.get(urls.prices.byId(userId, priceId)),
  addPrice: (userId: number, data: IAddPrice): IRes<IPrice> =>
    apiService.post(urls.prices.all(userId), data),
  deletePriceById: (userId: number, priceId: number): IRes<IPrice> =>
    apiService.delete(urls.prices.byId(userId, priceId)),
  updatePriceById: (
    userId: number,
    priceId: number,
    params: IUpdatePriceParams,
  ): IRes<IPrice> =>
    apiService.patch(urls.prices.byId(userId, priceId), params),
};

export { servicesService };
