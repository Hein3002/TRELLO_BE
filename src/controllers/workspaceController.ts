import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { WorkspaceService } from "../services/workspaceService";
import { workspaceSchema } from "../schemas/workspaceSchema";
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { container } from "tsyringe";

const uploadMiddleware = container.resolve(UploadMiddleware);

@injectable()
export class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) { }

    async createWorkspace(req: Request, res: Response): Promise<any> {
        const { error, value } = workspaceSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const files = req.files as Express.Multer.File[];
            const filePaths = files.map(file => file.path);
            const user = (req as any).user;
            const results = await this.workspaceService.createWorkspace({
                ...value,
                logo: filePaths,
                user_id: user.user_id,
            });
            return res.status(200).json({ message: 'Success', results: result[0][0] });

        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateWorkspace(req: Request, res: Response): Promise<any> {
        const { error, value } = workspaceSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;
            const files = req.files as Express.Multer.File[];
            const filePaths = files.map(file => file.path);

            const oldFilePath = await this.workspaceService.updateWorkspace({
                ...value,
                workspace_id: id,
                logo: filePaths,
            });

            uploadMiddleware.Remove(oldFilePath.old_path);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            return res.status(500).json({ message: error.message, results: false });
        }
    }

    async getWorkspaceById(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.workspaceService.getWorkspaceById(id);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteWorkspace(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const oldFilePath  = await this.workspaceService.deleteWorkspace(id);
            uploadMiddleware.Remove(oldFilePath.old_path);
            return res.status(200).json({ message: 'Success', success: true });
        } catch (error: any) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }

    async createMember(req: Request, res: Response): Promise<any> {
        const { error, value } = workspaceSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            await this.workspaceService.createMember(value);
            return res.status(200).json({ message: 'Success', success: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getAllWorkspaceByUserId(req: Request, res: Response): Promise<any> {
        try {
            const user = (req as any).user;
            const results = await this.workspaceService.getAllWorkspaceByUserId(user.user_id);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}