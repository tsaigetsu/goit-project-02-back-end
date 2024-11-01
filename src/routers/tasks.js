import { Router } from 'express';
// import authenticate from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createTaskSchema, updateTaskSchema } from '../validation/tasks.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createTaskCtrl,
  deleteTaskCtrl,
  patchTaskCtrl,
} from '../controllers/tasks.js';

const router = Router();

// router.use(authenticate);

router.use('/:taskId', isValidId('taskId'));

router.post('/', validateBody(createTaskSchema), ctrlWrapper(createTaskCtrl));

router.patch(
  '/:taskId',
  validateBody(updateTaskSchema),
  ctrlWrapper(patchTaskCtrl),
);

router.delete('/:taskId', ctrlWrapper(deleteTaskCtrl));

export default router;
