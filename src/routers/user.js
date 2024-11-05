import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { patchUser } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import * as userControllers from '../controllers/user.js';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/profile', ctrlWrapper(userControllers.getProfile));

userRouter.patch(
  '/profile',
  upload.single('photo'),
  validateBody(patchUser),
  ctrlWrapper(userControllers.updateProfile),
);

export default userRouter;
