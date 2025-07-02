import Joi from 'joi';

export const createPostSchema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    content: Joi.string().min(1).max(40000).required(),
    author_id: Joi.number().integer().positive().required()
});