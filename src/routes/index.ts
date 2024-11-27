import 'reflect-metadata';
import { Router } from 'express';
import userRouter from "./userRouter";
import workspaceRouter from './workspaceRouter';
import boardRouter from './boardRouter';
import columnRouter from './columnRouter';

const router = Router();
router.use('', userRouter);
router.use('/workspace', workspaceRouter);
router.use('/board', boardRouter);
router.use('/column', columnRouter);

export default router;