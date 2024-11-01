import createHttpError from 'http-errors';
import { createTask, deleteTask, updateTask } from '../services/tasks.js';

export const createTaskCtrl = async (req, res) => {
  const task = await createTask({
    ...req.body,
    userId: req.user?._id,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a task!`,
    data: task,
  });
};

export const patchTaskCtrl = async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user?._id;

  const result = await updateTask(taskId, {
    ...req.body,
    userId,
  });

  if (!result) {
    next(createHttpError(404, 'Task not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a task!`,
    data: result.task,
  });
};

export const deleteTaskCtrl = async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user?._id;

  const task = await deleteTask(taskId, userId);

  if (!task) {
    next(createHttpError(404, 'Task not found'));
    return;
  }

  res.status(204).send();
};
