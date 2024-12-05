import { injectable } from "tsyringe";
import { CardReponsitory } from "../repositories/cardRepository";
import { CardModel } from "../models/cardModel";

@injectable()
export class CardService {
    constructor(private cardReponsitory: CardReponsitory) {};

    async createCard(card: CardModel): Promise<any> {
        return this.cardReponsitory.createCard(card);
    }

    async updateCard(card: CardModel): Promise<any> {
        return this.cardReponsitory.updateCard(card);
    }

    async getCardByID(id: string): Promise<any> {
        return this.cardReponsitory.getCardByID(id);
    }
}