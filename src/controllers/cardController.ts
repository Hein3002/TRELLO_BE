import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { container } from "tsyringe";
import { CardService } from "../services/cardService";
import { cardSchema } from "../schemas/cardSchema";

const uploadMiddleware = container.resolve(UploadMiddleware);

@injectable()
export class CardController {
    constructor(private cardService: CardService) { }

    async createCard(req: Request, res: Response): Promise<any> {
        const { error, value } = cardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
           const response = await this.cardService.createCard(value);
            return res.status(200).json({ message: 'Success', results: response[0][0] });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateCard(req: Request, res: Response): Promise<any> {
        const { error, value } = cardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const files = req.files as Express.Multer.File[];
            const filePaths = files.map(file => file.path);

            const oldFilePath = await this.cardService.updateCard({
                ...value,
                background: filePaths,
            });

            uploadMiddleware.Remove(oldFilePath.old_path);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getCardByID(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.cardService.getCardByID(id);
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