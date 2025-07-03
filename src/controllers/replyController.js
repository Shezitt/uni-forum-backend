import { getRepliesByPostId, getReplyById, createReply, deleteReplyById } from '../models/replyModel.js';
import { getPostById } from '../models/postModel.js';

export const getReplies = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const replies = await getRepliesByPostId(postId, limit, offset);
        res.json(replies);
    } catch(err) {
        next(err);
    }
};

export const addReply = async (req, res, next) => {
    try {
        const { content } = req.body;
        const author_id = req.user.userId;
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

export const deleteReply = async (req, res, next) => {
    try {
        const { replyId } = req.params;
        const userId = req.user.userId;

        const reply = await getReplyById(replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        if (reply.author_id !== userId) {
            return res.status(403).json({ message: 'You are not allowed to delete this reply' });
        }

        const deletedReply = await deleteReplyById(replyId);
        res.json({ message: 'Reply deleted successfully', reply: deletedReply });

    } catch(err) {
        next(err);
    }
};