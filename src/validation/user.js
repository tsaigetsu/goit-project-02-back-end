import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';

export const patchUser = Joi.object({
  name: Joi.string().min(2).max(32),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(8).max(32),
  photo: Joi.string(),
});
