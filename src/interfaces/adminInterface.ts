export interface IRoles {
  id: number;
  role: string;
}

export interface IRolesResponse {
  data: IRoles[];
}

export interface IAddMaster {
  email: string;
  phone_number: string;
  url: string;
}

export interface IAddService {
  title: string;
  description: string;
  category: string;
}
