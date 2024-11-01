import createHttpError from 'http-errors';
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from '../services/columns.js';

export const createColumnCtrl = async (req, res) => {
  const column = await createColumn({
    ...req.body,
    userId: req.user?._id,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a column!`,
    data: column,
  });
};

export const patchColumnCtrl = async (req, res, next) => {
  const { columnId } = req.params;
  const userId = req.user?._id;

  const result = await updateColumn(columnId, {
    ...req.body,
    userId,
  });

  if (!result) {
    next(createHttpError(404, 'Column not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a column!`,
    data: result.column,
  });
};

export const deleteColumnCtrl = async (req, res, next) => {
  const { columnId } = req.params;
  const userId = req.user?._id;

  const column = await deleteColumn(columnId, userId);

  if (!column) {
    next(createHttpError(404, 'Column not found'));
    return;
  }

  res.status(204).send();
};
