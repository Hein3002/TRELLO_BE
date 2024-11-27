import Joi from "joi";

export const columnSchema = Joi.object({
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).required(),
    status: Joi.string().optional(),
    files: Joi.string().allow('').optional(),
    column_id: Joi.number().optional(),
    board_id: Joi.number().optional(),
    card_id_order: Joi.string().allow('').optional(),
});