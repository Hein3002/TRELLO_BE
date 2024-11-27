import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9]*$/),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});