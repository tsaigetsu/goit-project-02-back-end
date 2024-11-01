import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import authenticate from '../middlewares/authenticate.js';
import * as userControllers from '../controllers/user.js';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/profile', userControllers.getProfile);

userRouter.put(
  '/profile',
  upload.single('photo'),
  userControllers.updateProfile,
);

export default userRouter;
