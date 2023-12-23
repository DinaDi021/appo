const baseURL = process.env.REACT_APP_API;

const register = "/register";
const login = "/oauth/login";
const refresh = "/oauth/refresh";
const logout = "/oauth/logout";
const logoutAll = "/oauth/logout/all";
const forgotPassword = "/password/forgot";
const resetPassword = "/password/reset";

const users = "/v1/users";

const appointments = "appointments";
const schedules = "schedules";
const v1 = "/v1";

const cart = "carts";
const checkout = "checkout";

const urls = {
  auth: {
    register: register,
    login: login,
    refresh: refresh,
    logout: logout,
    logoutAll: logoutAll,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
  },
  users: {
    all: users,
    byId: (id: number): string => `${users}/${id}`,
  },
  appointments: {
    all: (userId: number): string => `${users}/${userId}/${appointments}`,
    byId: (userId: number, appointmentId: number): string =>
      `${users}/${userId}/${appointments}/${appointmentId}`,
  },
  schedules: {
    availableSchedules: `${v1}/${schedules}`,
    usersAll: (userId: number): string => `${users}/${userId}/${schedules}`,
    byId: (userId: number, scheduleId: number): string =>
      `${users}/${userId}/${schedules}/${scheduleId}`,
  },
  cart: {
    all: (userId: number): string => `${users}/${userId}/${cart}`,
    byId: (userId: number, cartId: number): string =>
      `${users}/${userId}/${cart}/${cartId}`,
  },
  checkout: {
    all: (userId: number): string => `${users}/${userId}/${checkout}`,
  },
};

export { baseURL, urls };
