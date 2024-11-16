import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(2).max(32).required(),
  description: Joi.string().min(2).max(300).required(),
  deadline: Joi.string().min(2).max(32).required(),
  priority: Joi.string()
    .valid('without priority', 'low', 'medium', 'high')
    .default('without priority')
    .required(),
  userId: Joi.object().required(),
  columnId: Joi.string().min(2).max(32).required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(2).max(32),
  description: Joi.string().min(2).max(300),
  deadline: Joi.string().min(2).max(32),
  priority: Joi.string()
    .valid('without priority', 'low', 'medium', 'high')
    .default('without priority'),
  userId: Joi.object(),
  columnId: Joi.string().min(2).max(32),
});
