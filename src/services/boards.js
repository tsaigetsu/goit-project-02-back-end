import { BoardsCollection } from '../db/models/board.js';
import { ColumnsCollection } from '../db/models/column.js';
import { TasksCollection } from '../db/models/task.js';
import { deleteColumn } from './columns.js';

export const getAllBoards = async ({ userId }) => {
  const boards = await BoardsCollection.find({ userId });

  return boards;
};

export const getBoardById = async (boardId, userId) => {
  const [board, columns, tasks] = await Promise.all([
    BoardsCollection.findOne({ _id: boardId, userId }),
    ColumnsCollection.find({ userId, boardId }),
    TasksCollection.find({ userId }),
  ]);

  const columnsWithTasks = columns.map((column) => {
    const columnTasks = tasks.filter(
      (task) => task.columnId.toString() === column._id.toString(),
    );
    column._doc.tasks = columnTasks;
    return column;
  });
  board._doc.columns = columnsWithTasks;
  return board;
};

export const createBoard = async (payload) => {
  const board = await BoardsCollection.create(payload);
  board._doc.columns = [];
  return board;
};

export const updateBoard = async (boardId, payload, options = {}) => {
  const [rawResult, columns, tasks] = await Promise.all([
    BoardsCollection.findOneAndUpdate(
      { _id: boardId, userId: payload.userId },
      { ...payload },
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    ),
    ColumnsCollection.find({ userId: payload.userId, boardId }),
    TasksCollection.find({ userId: payload.userId }),
  ]);

  if (!rawResult || !rawResult.value) return null;

  const columnsWithTasks = columns.map((column) => {
    const columnTasks = tasks.filter(
      (task) => task.columnId.toString() === column._id.toString(),
    );
    column._doc.tasks = columnTasks;
    return column;
  });

  rawResult.value._doc.columns = columnsWithTasks;

  return {
    board: rawResult.value,
  };
};

export const deleteBoard = async ({ boardId, userId }) => {
  const [board, boardColumns] = await Promise.all([
    BoardsCollection.findOneAndDelete({
      _id: boardId,
      userId,
    }),
    ColumnsCollection.find({ boardId, userId }),
  ]);

  for (const column of boardColumns) {
    deleteColumn({ columnId: column._id, userId });
  }

  return board;
};
