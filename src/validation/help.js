import Joi from 'joi';

export const sendMailSchema = Joi.object({
  email: Joi.string().min(4).max(50).required(),
  userId: Joi.object().required(),
  comment: Joi.string().min(2).max(500).required(),
});
