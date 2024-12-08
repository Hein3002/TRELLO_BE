import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { ColumnService } from "../services/columnService";
import { columnSchema } from "../schemas/columnSchema";

@injectable()
export class ColumnController {
    constructor(private columnService: ColumnService) { }

    async createColumn(req: Request, res: Response): Promise<any> {
        const { error, value } = columnSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            await this.columnService.createColumn(value);
            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateInformationColumn(req: Request, res: Response): Promise<any> {
        const { error, value } = columnSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;
            await this.columnService.updateInformationColumn({
                ...value,
                column_id: id,
            });

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            return res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateColumnWhenMoveCard(req: Request, res: Response): Promise<any> {
        const { error, value } = columnSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            await this.columnService.updateColumnWhenMoveCard(value);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            return res.status(500).json({ message: error.message, results: false });
        }
    }

    async deleteColumn(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            await this.columnService.deleteColumn(id);
            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}