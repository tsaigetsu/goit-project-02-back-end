import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().min(2).max(32).required(),
  backgroundId: Joi.string().valid(
    'nobg',
    'bg1',
    'bg2',
    'bg3',
    'bg4',
    'bg5',
    'bg6',
    'bg7',
    'bg8',
    'bg9',
    'bg10',
    'bg11',
    'bg12',
    'bg13',
    'bg14',
    'bg15',
  ),
  // .default('nobg')
  // .required(),
  iconId: Joi.string()
    .valid('ic1', 'ic2', 'ic3', 'ic4', 'ic5', 'ic6', 'ic7', 'ic8')
    .default('ic1')
    .required(),
  userId: Joi.object().required(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(2).max(32),
  backgroundId: Joi.string()
    .valid(
      'nobg',
      'bg1',
      'bg2',
      'bg3',
      'bg4',
      'bg5',
      'bg6',
      'bg7',
      'bg8',
      'bg9',
      'bg10',
      'bg11',
      'bg12',
      'bg13',
      'bg14',
      'bg15',
    )
    .default('nobg'),
  iconId: Joi.string()
    .valid('ic1', 'ic2', 'ic3', 'ic4', 'ic5', 'ic6', 'ic7', 'ic8')
    .default('ic1'),
  userId: Joi.object(),
});
