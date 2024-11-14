// src/routes/helpRouter.js

import express from 'express';
import { sendHelpCommentController } from '../controllers/helpController.js';

const router = express.Router();

router.post('/', sendHelpCommentController);

export default router;
