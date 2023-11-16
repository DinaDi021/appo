const baseURL = process.env.REACT_APP_API;

const register = "/register";
const login = "/oauth/login";
const refresh = "/oauth/refresh";
const forgotPassword = "/password/forgot";
const resetPassword = "/password/reset";

const users = "/v1/users";

const urls = {
  auth: {
    register: register,
    login: login,
    refresh: refresh,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
  },
  users: {
    all: users,
    byId: (id: number): string => `${users}/${id}`,
  },
};

export { baseURL, urls };
