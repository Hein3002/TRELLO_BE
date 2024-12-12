import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9]*$/).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
});