import { urls } from "../constants";
import { ICart, ICheckout } from "../interfaces/cartInterface";
import { apiService, IRes } from "./apiServices";

const cartService = {
  getAll: (userId: number): IRes<ICart> =>
    apiService.get(urls.cart.all(userId)),
  addItem: (userId: number): IRes<ICart> =>
    apiService.post(urls.cart.all(userId)),
  deleteItem: (userId: number, cartId: number): IRes<void> =>
    apiService.delete(urls.appointments.byId(userId, cartId)),
  checkoutCart: (userId: number): IRes<ICheckout> =>
    apiService.get(urls.checkout.all(userId)),
};

export { cartService };
