export const regex = {
  PHONE_NUMBER: /^\+380\d{9}$/,
  EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
  BIRTHDATE: /^\d{4}-\d{2}-\d{2}$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  TIME: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
};
