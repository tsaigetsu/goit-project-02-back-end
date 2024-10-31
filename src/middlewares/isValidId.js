import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(createHttpError(400, `${id} is not a valid id`));
  }
  next();
};

export default isValidId;
