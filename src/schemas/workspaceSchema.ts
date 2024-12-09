import Joi from "joi";

export const workspaceSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9 ]*$/).required(),
    description: Joi.string().optional(),
    status: Joi.string().optional(),
    files: Joi.any().optional(),
    workspace_id: Joi.number().optional(),
});