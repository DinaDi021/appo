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

const forgotPasswordSchema = Joi.object({
  email: Joi.string().regex(regex.EMAIL).trim().required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().regex(regex.EMAIL).trim().required(),
  password: Joi.string().regex(regex.PASSWORD).trim(),
  confirm_Password: Joi.any().valid(Joi.ref("password")).required(),
});

export { registerSchema, forgotPasswordSchema, resetPasswordSchema };
