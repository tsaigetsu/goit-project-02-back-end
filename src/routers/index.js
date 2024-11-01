import { Router } from 'express';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';
import columnsRouter from './columns.js';
import userRouter from './user.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', tasksRouter);
router.use('/columns', columnsRouter);
router.use('/users', userRouter);

export default router;
