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

            await this.workspaceService.createWorkspace({
                ...value,
                logo: filePaths,
            });
            return res.status(200).json({ message: 'Success', results: true });
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
            const files = req.files as Express.Multer.File[];
            const filePaths = files.map(file => file.path);

            const oldFilePath = await this.workspaceService.updateWorkspace({
                ...value,
                logo: filePaths,
            });

            uploadMiddleware.Remove(oldFilePath.old_path);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
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
            await this.workspaceService.deleteWorkspace(id);
            res.status(200).json({ message: 'Success', success: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, success: false });
        }
    }
}