import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { container } from "tsyringe";
import { ColumnService } from "../services/columnService";
import { columnSchema } from "../schemas/columnSchema";


const uploadMiddleware = container.resolve(UploadMiddleware);

@injectable()
export class ColumnController {
    constructor(private columnService: ColumnService) { }

    async createColumn(req: Request, res: Response): Promise<any> {
        const { error, value } = columnSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        const files = req.files as Express.Multer.File[];
        let filePaths: string[] = [];
        
        if (files.length > 0) {
            filePaths = files.map(file => file.path);
        } else {
            filePaths = [req.body.files];
        }

        try {
            await this.columnService.createColumn({
                ...value,
                background: filePaths,
            });
            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateColumn(req: Request, res: Response): Promise<any> {
        const { error, value } = columnSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const files = req.files as Express.Multer.File[];
            const filePaths = files.map(file => file.path);

            const oldFilePath = await this.columnService.updateColumn({
                ...value,
                background: filePaths,
            });

            uploadMiddleware.Remove(oldFilePath.old_path);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getAllColumnByBoardID(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.columnService.getAllColumnByBoardID(id);
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