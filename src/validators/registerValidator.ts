import Joi from "joi";

import { regex } from "../constants";

const registerSchema = Joi.object({
  firstname: Joi.string().min(2).max(50).trim(),
  lastname: Joi.string().min(2).max(50).trim(),
  phone_number: Joi.string().regex(regex.PHONE_NUMBER).trim(),
  email: Joi.string().regex(regex.EMAIL).trim(),
  password: Joi.string().regex(regex.PASSWORD).trim(),
  confirm_Password: Joi.any().valid(Joi.ref("password")).required(),
});

const loginShema = Joi.object({
  email: Joi.string().regex(regex.EMAIL).trim().required(),
  password: Joi.string().regex(regex.PASSWORD).trim(),
});

const updateShema = Joi.object({
  firstname: Joi.string().min(2).max(50).trim().optional(),
  lastname: Joi.string().min(2).max(50).trim().optional(),
  birthdate: Joi.string().regex(regex.BIRTHDATE).optional(),
  phone_number: Joi.string().regex(regex.PHONE_NUMBER).trim().optional(),
  email: Joi.string().regex(regex.EMAIL).trim().optional(),
});

const updateShemaSchedules = Joi.object({
  date: Joi.string().regex(regex.DATE).optional(),
  time: Joi.string().regex(regex.TIME).optional(),
}).or("date", "time");
const forgotPasswordSchema = Joi.object({
  email: Joi.string().regex(regex.EMAIL).trim().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().regex(regex.PASSWORD).trim(),
  confirm_Password: Joi.any().valid(Joi.ref("password")).required(),
});

export {
  registerSchema,
  updateShema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginShema,
  updateShemaSchedules,
};
