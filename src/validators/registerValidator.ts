import Joi from "joi";

import { regex } from "../constants";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).trim(),
  lastName: Joi.string().min(2).max(50).trim(),
  phoneNumber: Joi.number(),
  email: Joi.string().regex(regex.EMAIL).trim(),
  password: Joi.string().regex(regex.PASSWORD).trim(),
});

export { registerSchema };
