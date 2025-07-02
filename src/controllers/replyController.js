import { getRepliesByPostId, createReply } from '../models/replyModel.js';
import { getPostById } from '../models/postModel.js';

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

        const post = await getPostById(postId);

        if (!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }

        const newReply = await createReply(content, author_id, postId);
        res.status(201).json(newReply);

    } catch(err) {
        next(err);
    }
};