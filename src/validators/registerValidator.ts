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

const registerMasterSchema = Joi.object({
  email: Joi.string().regex(regex.EMAIL).trim(),
  phone_number: Joi.string().regex(regex.PHONE_NUMBER).trim(),
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

const schedulesShema = Joi.object({
  date_time: Joi.string().regex(regex.DATE_AND_TIME).optional(),
});

const priceShema = Joi.object({
  price: Joi.number().min(1).max(10000).optional(),
});
const forgotPasswordSchema = Joi.object({
  email: Joi.string().regex(regex.EMAIL).trim().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().regex(regex.PASSWORD).trim(),
  confirm_Password: Joi.any().valid(Joi.ref("password")).required(),
});

const changePasswordSchema = Joi.object({
  old_password: Joi.string().regex(regex.PASSWORD).trim(),
  new_password: Joi.string().regex(regex.PASSWORD).trim(),
  confirm_Password: Joi.any().valid(Joi.ref("new_password")).required(),
});

const addServices = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(300).required(),
  category: Joi.string().max(50).required(),
});

export {
  registerSchema,
  registerMasterSchema,
  updateShema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginShema,
  schedulesShema,
  priceShema,
  changePasswordSchema,
  addServices,
};
