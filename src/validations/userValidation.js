import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(4).max(80).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required()
}); 