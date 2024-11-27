import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';
import { ColumnController } from '../controllers/columnController';

const columnRouter = Router();
const columnController = container.resolve(ColumnController);
const uploadMiddleware = container.resolve(UploadMiddleware);

columnRouter.post(
    '/create', uploadMiddleware.Upload,
    authenticate,
    columnController.createColumn.bind(columnController)
);

columnRouter.post(
    '/update', uploadMiddleware.Upload,
    authenticate,
    columnController.updateColumn.bind(columnController)
);

columnRouter.get(
    '/getallbyboardid/:id',
    authenticate,
    columnController.getAllColumnByBoardID.bind(columnController)
);

export default columnRouter;