export interface IItem {
  id?: number;
  schedule_id: number;
  service_id: number;
  price_id: number;
  price: number;
  title: string;
  category: string;
  master_firstname: string;
  master_lastname: string;
  date_time: string;
  message?: string;
}

export interface ICart {
  items: IItem[];
  totalSum: number;
  totalCount: number;
}

export interface ICheckout {
  items: IItem[];
  totalSum: IPaymentType;
  totalCount: number;
}
export interface ICheckoutResponse {
  data: ICheckout;
}
export interface IPaymentType {
  full: number;
  prepayment: number;
}

export interface ICartResponse {
  data: ICart;
}

export interface IPayment {
  payment: string;
  order_id: number;
  html_button: string;
}

export interface IPaymentResponse {
  data: IPayment;
}

export interface IPaymentParams {
  result_url: string;
  payment: string;
}
