import Joi from "joi";

export const boardSchema = Joi.object({
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).required(),
    description: Joi.string().optional().allow(''),
    status: Joi.string().optional(),
    background: Joi.string().optional(),
    workspace_id: Joi.number().optional(),
    board_id: Joi.number().optional(),
    column_id_order: Joi.string().allow('').optional(),
});