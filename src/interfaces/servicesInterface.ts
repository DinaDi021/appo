export interface IData {
  categories: string[];
  services: IServices[];
}

export interface IServices {
  id: number;
  title: string;
  category: string;
  description: string;
}

export interface IServicesResponse {
  data: IData;
}
