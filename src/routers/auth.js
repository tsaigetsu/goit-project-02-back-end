import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  // loginWithGoogleOAuthSchema,
  registerUserSchema,
} from '../validation/auth.js';
import {
  // getGoogleAuthUrlController,
  // loginWithGoogleController,
  logoutUserController,
  loginUserController,
  registerUserController,
  // refreshController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

// router.post('/refresh', ctrlWrapper(refreshController));

router.post('/logout', ctrlWrapper(logoutUserController));

// router.get('/get-oauth-url', ctrlWrapper(getGoogleAuthUrlController));

// router.post(
//   '/confirm-google-auth',
//   validateBody(loginWithGoogleOAuthSchema),
//   ctrlWrapper(loginWithGoogleController),
// );

export default router;
