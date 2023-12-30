import { urls } from "../constants";
import {
  ICartResponse,
  ICheckoutResponse,
  IItem,
  IPaymentParams,
  IPaymentResponse,
} from "../interfaces/cartInterface";
import { apiService, IRes } from "./apiServices";

const cartsService = {
  getAll: (userId: number): IRes<ICartResponse> =>
    apiService.get(urls.carts.all(userId)),
  addItem: (userId: number, data: IItem): IRes<ICartResponse> =>
    apiService.post(urls.carts.all(userId), data),
  deleteItem: (userId: number, cartId: number): IRes<void> =>
    apiService.delete(urls.carts.byId(userId, cartId)),
  checkoutCart: (userId: number): IRes<ICheckoutResponse> =>
    apiService.get(urls.checkout.all(userId)),
  payButton: (userId: number, params: IPaymentParams): IRes<IPaymentResponse> =>
    apiService.get(urls.pay.all(userId), { params }),
};

export { cartsService };
