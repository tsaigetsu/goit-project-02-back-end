import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createColumnSchema,
  updateColumnSchema,
} from '../validation/columns.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createColumnCtrl,
  deleteColumnCtrl,
  patchColumnCtrl,
} from '../controllers/columns.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import authenticate from '../middlewares/authenticate.js';

const router = Router();

// router.use(authenticate);

router.use('/:columnId', isValidId('columnId'));

router.post(
  '/',
  validateBody(createColumnSchema),
  ctrlWrapper(createColumnCtrl),
);

router.patch(
  '/:columnId',
  validateBody(updateColumnSchema),
  ctrlWrapper(patchColumnCtrl),
);

router.delete('/:columnId', ctrlWrapper(deleteColumnCtrl));

export default router;
