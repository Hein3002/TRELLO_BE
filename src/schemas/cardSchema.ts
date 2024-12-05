import Joi from "joi";

export const cardSchema = Joi.object({
    name: Joi.string().pattern(/^[\p{L}\p{N} ]*$/u).required(),
    status: Joi.string().optional(),
    files: Joi.string().allow('').optional(),
    column_id: Joi.number().optional(),
    card_id: Joi.number().optional(),
    user_id_join: Joi.string().allow('').optional(),
    description: Joi.string().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    timer: Joi.date().optional(),
});