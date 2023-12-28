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
  date: string;
  time: string;
  message?: string;
}

export interface ICart {
  items: IItem[];
  totalSum: number;
}

export interface ICheckout {
  items: IItem[];
  totalSum: {
    full: number;
    prepayment: number;
  };
}

export interface ICartResponse {
  data: ICart;
}

export interface ICheckoutResponse {
  data: ICheckout;
}
