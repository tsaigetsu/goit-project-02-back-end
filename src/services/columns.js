import { ColumnsCollection } from '../db/models/column.js';

export const createColumn = async (payload) => {
  const column = await ColumnsCollection.create(payload);
  return column;
};

export const updateColumn = async (columnId, payload, options = {}) => {
  const rawResult = await ColumnsCollection.findOneAndUpdate(
    { _id: columnId, userId: payload.userId },
    { ...payload },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    column: rawResult.value,
  };
};

export const deleteColumn = async (columnId, userId) => {
  const column = await ColumnsCollection.findOneAndDelete({
    _id: columnId,
    userId,
  });

  return column;
};
