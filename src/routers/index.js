import { Router } from 'express';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';
import columnsRouter from './columns.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', tasksRouter);
router.use('/columns', columnsRouter);

export default router;
