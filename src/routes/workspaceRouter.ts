import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { WorkspaceController } from '../controllers/workspaceController';
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const workspaceRouter = Router();
const workspaceController = container.resolve(WorkspaceController);
const uploadMiddleware = container.resolve(UploadMiddleware);

workspaceRouter.post(
    '/create', uploadMiddleware.Upload,
    authenticate,
    workspaceController.createWorkspace.bind(workspaceController)
);

workspaceRouter.post(
    '/update/:id', uploadMiddleware.Upload,
    authenticate,
    workspaceController.updateWorkspace.bind(workspaceController)
);

workspaceRouter.get(
    '/getbyid/:id',
    authenticate,
    workspaceController.getWorkspaceById.bind(workspaceController)
);

workspaceRouter.delete(
    '/delete/:id',
    authenticate,
    workspaceController.deleteWorkspace.bind(workspaceController)
);

export default workspaceRouter;