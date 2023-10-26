const baseURL = process.env.REACT_APP_API;

const register = "/register";
const login = "/login";
// const refresh = "/refresh";
// const users = "/users";

const urls = {
  register: register,
  login: login,
  // refresh: refresh,
};

// const urls = {
//   auth: {
//     login: auth,
//     refresh: `${auth}/refresh`,
//     register: users,
//     me: `${auth}/me`,
//   },
// };

export { baseURL, urls };
