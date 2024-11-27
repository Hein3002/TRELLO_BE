import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { ColumnModel } from "../models/columnModel";

@injectable()
export class ColumnReponsitory {
    constructor(private db: Database) { };

    async createColumn(column: ColumnModel): Promise<any> {
        try {
            const sql = 'call CreateColumn(?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                column.board_id,
                column.name,
                column.background,
                column.status
            ]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateColumn(column: ColumnModel): Promise<any> {
        try {
            const sql = 'call UpdateColumn(?, ?, ?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                column.column_id,
                column.name,
                column.background,
                column.card_id_order,
                column.status
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAllColumnByBoardID(id: string): Promise<any> {
        try {
            const sql = 'call GetAllColumnByBoardID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}