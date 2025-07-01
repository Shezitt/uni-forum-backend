import { getRepliesByPostId, createReply } from '../models/replyModel.js';

export const getReplies = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const replies = await getRepliesByPostId(postId);
        res.json(replies);
    } catch(err) {
        next(err);
    }
};

export const addReply = async (req, res, next) => {
    try {
        const { content, author_id } = req.body;
        const { postId } = req.params;

        if (!content || !author_id) {
            const error = new Error('Content and author are required.');
            error.statusCode = 400;
            throw error;
        }

        const newReply = createReply(content, author_id, postId);
        res.status(201).json(newReply);

    } catch(err) {
        next(err);
    }
};