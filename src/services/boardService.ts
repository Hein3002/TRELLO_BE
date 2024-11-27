import { injectable } from "tsyringe";
import { BoardReponsitory } from "../repositories/boardRepository";
import { BoardModel } from "../models/boardModel";

@injectable()
export class BoardService {
    constructor(private boardReponsitory: BoardReponsitory) {};

    async createBoard(board: BoardModel): Promise<any> {
        return this.boardReponsitory.createBoard(board);
    }

    async updateBoard(board: BoardModel): Promise<any> {
        return this.boardReponsitory.updateBoard(board);
    }

    async getBoardById(id: string): Promise<any> {
        return this.boardReponsitory.getBoardById(id);
    }

    async getAllBoardByWorkspaceID(id: string): Promise<any> {
        return this.boardReponsitory.getAllBoardByWorkspaceID(id);
    }
}