const baseURL = process.env.REACT_APP_API;

const v1 = "/v1";

const register = "/register";
const login = "/oauth/login";
const refresh = "/oauth/refresh";
const logout = "/oauth/logout";
const logoutAll = "/oauth/logout/all";
const forgotPassword = "/password/forgot";
const resetPassword = "/password/reset";

const users = "users";

const appointments = "appointments";
const schedules = "schedules";
const services = "services";
const prices = "prices";

const carts = "carts";
const checkout = "checkout";
const button = "button";

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
    byId: (id: number): string => `${v1}/${users}/${id}`,
  },
  services: {
    all: `${v1}/${services}`,
  },
  prices: {
    all: (userId: number): string => `${v1}/${users}/${userId}/${prices}`,
    byId: (userId: number, priceId: number): string =>
      `${v1}/${users}/${userId}/${prices}/${priceId}`,
  },
  appointments: {
    all: (userId: number): string => `${v1}/${users}/${userId}/${appointments}`,
    byId: (userId: number, appointmentId: number): string =>
      `${v1}/${users}/${userId}/${appointments}/${appointmentId}`,
  },
  schedules: {
    availableSchedules: `${v1}/${schedules}`,
    usersAll: (userId: number): string =>
      `${v1}/${users}/${userId}/${schedules}`,
    byId: (userId: number, scheduleId: number): string =>
      `${v1}/${users}/${userId}/${schedules}/${scheduleId}`,
  },
  carts: {
    all: (userId: number): string => `${v1}/${users}/${userId}/${carts}`,
    byId: (userId: number, cartId: number): string =>
      `${v1}/${users}/${userId}/${carts}/${cartId}`,
  },
  checkout: {
    all: (userId: number): string => `${v1}/${users}/${userId}/${checkout}`,
  },
  pay: {
    all: (userId: number): string => `${v1}/${users}/${userId}/${button}`,
  },
};

export { baseURL, urls };
