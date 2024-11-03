import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (userId) {
      await schema.validateAsync(
        { ...req.body, userId },
        {
          convert: false,
          abortEarly: false,
        },
      );
    } else {
      await schema.validateAsync(req.body, {
        convert: false,
        abortEarly: false,
      });
    }
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
