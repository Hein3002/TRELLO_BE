import 'reflect-metadata';
import { Router } from "express";
import { container } from "tsyringe";
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';
import { CardController } from '../controllers/cardController';

const cardRouter = Router();
const cardController = container.resolve(CardController);
const uploadMiddleware = container.resolve(UploadMiddleware);

cardRouter.post(
    '/create',
    authenticate,
    cardController.createCard.bind(cardController)
);

cardRouter.post(
    '/update', uploadMiddleware.Upload,
    authenticate,
    cardController.updateCard.bind(cardController)
);

cardRouter.get(
    '/getbyid/:id',
    authenticate,
    cardController.getCardByID.bind(cardController)
);

export default cardRouter;