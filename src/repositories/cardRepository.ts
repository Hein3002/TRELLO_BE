import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { CardModel } from "../models/cardModel";

@injectable()
export class CardReponsitory {
    constructor(private db: Database) { };

    async createCard(card: CardModel): Promise<any> {
        try {
            const sql = 'call CreateCard(?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                card.column_id,
                card.name,
                card.status
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCard(card: CardModel): Promise<any> {
        try {
            const sql = 'call UpdateCard(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                card.card_id,
                card.name,
                card.description,
                card.background,
                card.user_id_join,
                card.start_date,
                card.end_date,
                card.timer,
                card.status
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getCardByID(id: string): Promise<any> {
        try {
            const sql = 'call GetCardByID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async deleteCard(id: string): Promise<any> {
        try {
            const sql = 'call DeleteCard(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}