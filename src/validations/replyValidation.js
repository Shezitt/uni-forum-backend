import Joi from 'joi';

export const createReplySchema = Joi.object({
    content: Joi.string().min(1).max(1000).required()
});