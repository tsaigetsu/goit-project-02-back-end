import { TasksCollection } from '../db/models/task.js';

export const createTask = async (payload) => {
  const task = await TasksCollection.create(payload);
  return task;
};

export const updateTask = async (taskId, payload, options = {}) => {
  const rawResult = await TasksCollection.findOneAndUpdate(
    { _id: taskId, userId: payload.userId },
    { ...payload },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    task: rawResult.value,
  };
};

export const deleteTask = async (taskId, userId) => {
  const task = await TasksCollection.findOneAndDelete({
    _id: taskId,
    userId,
  });

  return task;
};
