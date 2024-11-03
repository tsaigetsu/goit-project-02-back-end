import Joi from 'joi';

export const createColumnSchema = Joi.object({
  title: Joi.string().min(2).max(32).required(),
  userId: Joi.object().required(),
  boardId: Joi.string().min(2).max(32).required(),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().min(2).max(32),
  userId: Joi.object(),
  boardId: Joi.string().min(2).max(32),
});
