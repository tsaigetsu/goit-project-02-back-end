import { Router } from 'express';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';
import columnsRouter from './columns.js';
import userRouter from './user.js';
import boardsRouter from './boards.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/tasks', tasksRouter);
router.use('/boards', boardsRouter);
router.use('/columns', columnsRouter);
router.use('/user', userRouter);

export default router;
