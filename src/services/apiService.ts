import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const access = process.env.REACT_APP_API_ACCESS_TOKEN;

const apiService = axios.create({ baseURL });

apiService.interceptors.request.use((req) => {
  if (access) {
    req.headers.Authorization = `Bearer ${access}`;
  }
  return req;
});

export { apiService };
