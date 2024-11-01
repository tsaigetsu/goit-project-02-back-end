import { BoardsCollection } from '../db/models/board.js';

export const getAllboards = async ({ userId }) => {
  const boards = await BoardsCollection.find({ userId });

  return boards;
};

export const getBoardById = async (boardId, userId) => {
  const board = await BoardsCollection.findOne({ _id: boardId, userId });

  return board;
};

export const createBoard = async (payload) => {
  const board = await BoardsCollection.create(payload);
  return board;
};

export const updateboard = async (boardId, payload, options = {}) => {
  const rawResult = await BoardsCollection.findOneAndUpdate(
    { _id: boardId, userId: payload.userId },
    { ...payload },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    board: rawResult.value,
  };
};

export const deleteBoard = async (boardId, userId) => {
  const board = await BoardsCollection.findOneAndDelete({
    _id: boardId,
    userId,
  });

  return board;
};
