// src/routes/helpRouter.js

import express from 'express';
import { sendHelpCommentController } from '../controllers/helpController.js';

const router = express.Router();

router.post('/help', sendHelpCommentController);

export default router;
