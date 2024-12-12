import Joi from "joi";

export const workspaceSchema = Joi.object({
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).required(),
    description: Joi.any().optional(),
    status: Joi.string().optional(),
    files: Joi.any().optional(),
    workspace_id: Joi.number().optional(),
});