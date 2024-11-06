import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId =
  (mongoId = 'id') =>
  (req, res, next) => {
    const id = req.params[mongoId];
    if (!isValidObjectId(id)) {
      return next(createHttpError(400, 'Invalid id'));
    }

    next();
  };
