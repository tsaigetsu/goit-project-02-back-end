import createHttpError from 'http-errors';
import {
  createBoard,
  deleteBoard,
  getAllboards,
  getBoardById,
  updateboard,
} from '../services/boards.js';

export const getAllBoardsCtrl = async (req, res) => {
  const userId = req.user?._id;

  const boards = await getAllboards({
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found boards!',
    data: boards,
  });
};

export const getBoardByIdCtrl = async (req, res, next) => {
  const { boardId } = req.params;
  const userId = req.user?._id;
  const board = await getBoardById(boardId, userId);

  if (!board) {
    throw createHttpError(404, 'board not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found board with id ${boardId}!`,
    data: board,
  });
};

export const createВoardCtrl = async (req, res) => {
  const board = await createBoard({
    ...req.body,
    userId: req.user?._id,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a board!`,
    data: board,
  });
};

export const patchBoardCtrl = async (req, res, next) => {
  const { boardId } = req.params;
  const userId = req.user?._id;

  const result = await updateboard(boardId, {
    ...req.body,
    userId,
  });

  if (!result) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a board!`,
    data: result.board,
  });
};

export const deleteBoardCtrl = async (req, res, next) => {
  const { boardId } = req.params;
  const userId = req.user?._id;

  const board = await deleteBoard(boardId, userId);

  if (!board) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  res.status(204).send();
};
