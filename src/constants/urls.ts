const baseURL = process.env.REACT_APP_API;

const register = "/register";
const login = "/oauth/login";
const refresh = "/oauth/refresh";

const urls = {
  auth: {
    register: register,
    login: login,
    refresh: refresh,
  },
};

export { baseURL, urls };
