import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createВoardCtrl,
  deleteBoardCtrl,
  getAllBoardsCtrl,
  getBoardByIdCtrl,
  patchBoardCtrl,
} from '../controllers/boards.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createBoardSchema, updateBoardSchema } from '../validation/boards.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.use(authenticate);

router.use('/:boardId', isValidId('boardId'));

router.get('/', ctrlWrapper(getAllBoardsCtrl));

router.get('/:boardId', ctrlWrapper(getBoardByIdCtrl));

router.post('/', validateBody(createBoardSchema), ctrlWrapper(createВoardCtrl));

router.patch(
  '/:boardId',
  validateBody(updateBoardSchema),
  ctrlWrapper(patchBoardCtrl),
);

router.delete('/:boardId', ctrlWrapper(deleteBoardCtrl));

export default router;
