import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().min(2).max(32).required(),
  backgroundId: Joi.string().valid('1', '2').default('1').required(),
  iconId: Joi.string().valid('1', '2').default('1').required(),
  userId: Joi.object().required(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(2).max(32),
  backgroundId: Joi.string().valid('1', '2').default('1'),
  iconId: Joi.string().valid('1', '2').default('1'),
  userId: Joi.object(),
});
