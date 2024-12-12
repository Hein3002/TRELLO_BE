import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { WorkspaceModel } from "../models/workspaceModel";

@injectable()
export class WorkspaceReponsitory {
    constructor(private db: Database) { };

    async createWorkspace(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call CreateWorkspace(?, ?, ?, ?, @err_code, @err_msg)';
            const result = await this.db.query(sql, [
                workspace.name,
                workspace.description,
                workspace.status,
                workspace?.logo
            ]);
            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateWorkspace(workspace: WorkspaceModel): Promise<any> {
        try {
            const sql = 'call UpdateWorkspace(?, ?, ?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                workspace.workspace_id,
                workspace.name,
                workspace.description,
                workspace.status,
                workspace.logo
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getWorkspaceById(id: string): Promise<any> {
        try {
            const sql = 'call GetWorkspaceByID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteWorkspace(id: string): Promise<any> {
        try {
            const sql = 'call DeleteWorkspace(?, @err_code, @err_msg)';

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