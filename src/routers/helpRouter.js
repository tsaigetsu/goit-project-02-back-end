// src/routes/helpRouter.js

import express from 'express';
import { sendHelpCommentController } from '../controllers/helpController.js';
import { sendMailSchema } from '../validation/help.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.post('/',
    validateBody(sendMailSchema),
    ctrlWrapper(sendHelpCommentController));

export default router;
