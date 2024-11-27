import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { BoardModel } from "../models/boardModel";

@injectable()
export class BoardReponsitory {
    constructor(private db: Database) { };

    async createBoard(board: BoardModel): Promise<any> {
        try {
            const sql = 'call CreateBoard(?, ?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                board.workspace_id,
                board.name,
                board.description,
                board.background,
                board.status
            ]);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateBoard(board: BoardModel): Promise<any> {
        try {
            const sql = 'call UpdateBoard(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                board.board_id,
                board.name,
                board.description,
                board.status,
                board.background,
                board.column_id_order
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getBoardById(id: string): Promise<any> {
        try {
            const sql = 'call GetBoardByID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAllBoardByWorkspaceID(id: string): Promise<any> {
        try {
            const sql = 'call GetAllBoardByWorkspaceID(?, @err_code, @err_msg)';
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