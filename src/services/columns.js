import { ColumnsCollection } from '../db/models/column.js';
import { TasksCollection } from '../db/models/task.js';

export const createColumn = async (payload) => {
  const column = await ColumnsCollection.create(payload);
  column._doc.tasks = [];
  return column;
};

export const updateColumn = async (columnId, payload, options = {}) => {
  const [rawResult, tasks] = await Promise.all([
    ColumnsCollection.findOneAndUpdate(
      { _id: columnId, userId: payload.userId },
      { ...payload },
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    ),
    TasksCollection.find({ userId: payload.userId, columnId }),
  ]);

  if (!rawResult || !rawResult.value) return null;

  rawResult.value._doc.tasks = tasks;
  return {
    column: rawResult.value,
  };
};

export const deleteColumn = async ({ columnId, userId }) => {
  const [column] = await Promise.all([
    ColumnsCollection.findOneAndDelete({
      _id: columnId,
      userId,
    }),
    TasksCollection.deleteMany({
      columnId,
      userId,
    }),
  ]);

  return column;
};
