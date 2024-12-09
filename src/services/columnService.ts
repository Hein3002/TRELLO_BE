import { injectable } from "tsyringe";
import { ColumnReponsitory } from "../repositories/columnRepository";
import { ColumnModel } from "../models/columnModel";

@injectable()
export class ColumnService {
    constructor(private columnReponsitory: ColumnReponsitory) {};

    async createColumn(column: ColumnModel): Promise<any> {
        console.log(column)
        return this.columnReponsitory.createColumn(column);
    }

    async updateColumn(column: ColumnModel): Promise<any> {
        return this.columnReponsitory.updateColumn(column);
    }

    async getAllColumnByBoardID(id: string): Promise<any> {
        return this.columnReponsitory.getAllColumnByBoardID(id);
    }
}