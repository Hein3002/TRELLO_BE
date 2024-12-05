import 'reflect-metadata';
import { Router } from 'express';
import userRouter from "./userRouter";
import workspaceRouter from './workspaceRouter';
import boardRouter from './boardRouter';
import columnRouter from './columnRouter';
import cardRouter from './cardRouter';
import conversationRouter from './conversationRouter';
import messageRouter from './messageRouter';

const router = Router();
router.use('', userRouter);
router.use('/workspace', workspaceRouter);
router.use('/board', boardRouter);
router.use('/column', columnRouter);
router.use('/card', cardRouter);
router.use('/conversation', conversationRouter);
router.use('/message', messageRouter);

export default router;