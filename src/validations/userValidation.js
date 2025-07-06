import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(4).max(80).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required()
}); 

export const updateProfileSchema = Joi.object({
    bio: Joi.string().max(500),
    avatar_url: Joi.string().url()
});