export interface IAvailableSchedule {
  schedule_id: number;
  date: string;
  time: string;
  status?: string;
}

export interface IPrice {
  service_id: number;
  price_id: number;
  title: string;
  category: string;
  price: number;
}

export interface IMaster {
  master_id: number;
  master_firstname: string;
  master_lastname: string;
  schedules: IAvailableSchedule[];
  prices: IPrice[];
  categories: string[];
}

export interface IAvailableMasterResponse {
  data: IMaster[];
}
