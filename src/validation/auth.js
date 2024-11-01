import Joi from 'joi';
import { emailRegexp, passwordRegexp } from '../constants/users.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(16).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.min': `"name" should have at least {#limit} characters`,
    'string.max': `"name" should have at most {#limit} characters`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': `"email" must be a valid email address`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(passwordRegexp)
    .required()
    .messages({
      'string.base': `"password" should be a type of 'text'`,
      'string.min': `"password" should have at least {#limit} characters`,
      'string.max': `"password" should have at most {#limit} characters`,
      'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, and one number`,
      'any.required': `"password" is a required field`,
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(32).required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

// export const loginWithGoogleOAuthSchema = Joi.object({
//   code: Joi.string().required(),
// });
