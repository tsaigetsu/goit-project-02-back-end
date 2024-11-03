import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';
import * as userControllers from '../controllers/user.js';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/profile', ctrlWrapper(userControllers.getProfile));

userRouter.patch(
  '/profile',
  upload.single('photo'),
  ctrlWrapper(userControllers.updateProfile),
);

export default userRouter;
